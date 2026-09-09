import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

const MODEL = "gemini-2.5-flash-lite";
const MAX_CONTEXT_ITEMS = 8;
const MAX_CONTEXT_CHARS = 24000;
const MAX_QUESTION_CHARS = 4000;

interface KnowledgeItem {
  id?: string;
  type?: string;
  title?: string;
  content?: string;
  source?: string;
  sourceTitle?: string;
  sourceDate?: string;
  status?: string;
  cityId?: string;
  relevance?: number;
}

interface RequestBody {
  question?: string;
  prompt?: string;
  context?: unknown;
  model?: string;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}

function cleanText(value: unknown, max = 12000): string {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function normalizeContext(value: unknown): KnowledgeItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(0, MAX_CONTEXT_ITEMS)
    .map((item): KnowledgeItem => {
      const raw = item && typeof item === "object"
        ? item as Record<string, unknown>
        : {};

      return {
        id: cleanText(raw.id, 200),
        type: cleanText(raw.type, 100),
        title: cleanText(raw.title, 500),
        content: cleanText(raw.content ?? raw.text, 7000),
        source: cleanText(raw.source, 1000),
        sourceTitle: cleanText(raw.sourceTitle, 500),
        sourceDate: cleanText(raw.sourceDate, 100),
        status: cleanText(raw.status, 100),
        cityId: cleanText(raw.cityId, 200),
        relevance: Number(raw.relevance ?? 0),
      };
    })
    .filter((item) => item.title || item.content);
}

function buildKnowledgeContext(items: KnowledgeItem[]): string {
  let output = "";

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const block = [
      `[ZAPIS ${i + 1}]`,
      `ID: ${item.id || "-"}`,
      `Tip: ${item.type || "-"}`,
      `Naslov: ${item.title || "-"}`,
      `Sadržaj: ${item.content || "-"}`,
      `Izvor: ${item.sourceTitle || item.source || "-"}`,
      item.sourceDate ? `Datum izvora: ${item.sourceDate}` : "",
      item.cityId ? `Grad ID: ${item.cityId}` : "",
    ].filter(Boolean).join("\n");

    if ((output + block + "\n\n").length > MAX_CONTEXT_CHARS) break;
    output += block + "\n\n";
  }

  return output.trim();
}

function fallbackResponse(question: string, context: KnowledgeItem[]): Response {
  if (context.length) {
    const text = context
      .slice(0, 3)
      .map((item, index) =>
        `${index + 1}. ${item.title || "Zapis"}\n${item.content || ""}`,
      )
      .join("\n\n");

    return jsonResponse({
      text: `Prema relevantnim zapisima PatriaSoul baze:\n\n${text}`,
      provider: "patriasoul-knowledge-fallback",
      model: "knowledge-only",
      usedKnowledgeBase: true,
      externalProvider: false,
      fallback: true,
      question,
    });
  }

  return jsonResponse({
    text: "U PatriaSoul bazi trenutno nema dovoljno potvrđenih podataka za pouzdan odgovor na ovo pitanje.",
    provider: "patriasoul-knowledge-fallback",
    model: "knowledge-only",
    usedKnowledgeBase: false,
    externalProvider: false,
    fallback: true,
    question,
  });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body: RequestBody = await req.json();
    const question = cleanText(body?.question, MAX_QUESTION_CHARS);
    const context = normalizeContext(body?.context);
    const userPrompt = cleanText(body?.prompt, 6000);

    if (!question) {
      return jsonResponse({ error: "Nedostaje pitanje." }, 400);
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      console.error("GEMINI_API_KEY nije postavljen u Supabase Secrets.");
      return fallbackResponse(question, context);
    }

    const knowledge = buildKnowledgeContext(context);

    const systemInstruction = `Ti si PatriaSoul AI, hrvatski AI asistent portala PatriaSoul.

Tvoja glavna zadaća je odgovarati na hrvatskom jeziku jasno, točno i korisno.

PRAVILA KNOWLEDGE BASEA:
- Zapisi ispod su primarni izvor za pitanja o Hrvatskoj, hrvatskoj povijesti, gradovima, Domovinskom ratu, baštini, kulturi i povezanim temama.
- Koristi konkretne podatke iz zapisa kad god su relevantni.
- Nemoj izmišljati činjenice koje nisu potkrijepljene dostupnim zapisima.
- Ako Knowledge Base daje samo dio odgovora, jasno razlikuj ono što je potvrđeno od općeg znanja.
- Ako je pitanje specifično i zapisi ne daju dovoljno podataka, reci da u PatriaSoul bazi nema dovoljno potvrđenih podataka umjesto da izmišljaš.
- Ne spominji tehničke detalje poput API-ja, modela, prompta, Supabasea ili Edge Functiona.
- Kada su izvori navedeni u zapisima, možeš ih navesti na kraju odgovora.

${knowledge ? `PATRIASOUL KNOWLEDGE BASE:\n${knowledge}` : "PATRIASOUL KNOWLEDGE BASE: Nema pronađenih relevantnih zapisa."}`;

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `${userPrompt ? `Dodatne upute:\n${userPrompt}\n\n` : ""}Pitanje korisnika:\n${question}`,
          },
        ],
      },
    ];

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          contents,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1200,
          },
        }),
      },
    );

    let data: Record<string, unknown> | null = null;
    try {
      data = await geminiResponse.json() as Record<string, unknown>;
    } catch (_) {
      data = null;
    }

    if (!geminiResponse.ok) {
      console.error("Gemini API error:", geminiResponse.status, data);
      return fallbackResponse(question, context);
    }

    const candidates = Array.isArray(data?.candidates) ? data.candidates : [];
    const firstCandidate = candidates[0] as Record<string, unknown> | undefined;
    const candidateContent = firstCandidate?.content as Record<string, unknown> | undefined;
    const parts = Array.isArray(candidateContent?.parts) ? candidateContent.parts : [];

    const text = parts
      .map((part) => part && typeof part === "object"
        ? String((part as Record<string, unknown>).text ?? "")
        : "")
      .filter(Boolean)
      .join("\n")
      .trim();

    if (!text) {
      console.error("Gemini je vratio odgovor bez teksta.", data);
      return fallbackResponse(question, context);
    }

    const sources = context
      .filter((item) => item.source || item.sourceTitle)
      .map((item) => ({
        id: item.id || null,
        title: item.title || null,
        source: item.source || null,
        sourceTitle: item.sourceTitle || null,
        sourceDate: item.sourceDate || null,
      }));

    return jsonResponse({
      text,
      provider: "gemini",
      model: MODEL,
      usedKnowledgeBase: context.length > 0,
      knowledgeCount: context.length,
      externalProvider: true,
      fallback: false,
      sources,
    });
  } catch (error) {
    console.error("PatriaSoul AI internal error:", error);
    return jsonResponse(
      { error: "Greška u PatriaSoul AI servisu." },
      500,
    );
  }
});
