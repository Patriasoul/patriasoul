import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

interface RequestBody {
  question?: string;
  context?: unknown;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
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
    const question = String(body?.question ?? "").trim();
    const context = Array.isArray(body?.context) ? body.context : [];

    if (!question) {
      return jsonResponse({ error: "Nedostaje pitanje." }, 400);
    }

    // Od ovog trenutka Edge Function više ne poziva vanjski AI provider.
    // Glavni odgovor generira browser-side PatriaSoul Answer Engine.
    // Ova funkcija ostaje kao siguran compatibility endpoint.
    return jsonResponse({
      text:
        context.length > 0
          ? "PatriaSoul koristi lokalni Answer Engine i potvrđene zapise Knowledge Basea za odgovaranje."
          : "U PatriaSoul bazi trenutno nema dovoljno potvrđenih podataka za pouzdan odgovor na ovo pitanje.",
      provider: "patriasoul-answer-engine",
      model: "knowledge-only",
      usedKnowledgeBase: context.length > 0,
      secretDetected: false,
      externalProvider: false,
    });
  } catch (error) {
    console.error("PatriaSoul AI internal error:", error);
    return jsonResponse(
      { error: "Greška u PatriaSoul AI servisu." },
      500,
    );
  }
});
