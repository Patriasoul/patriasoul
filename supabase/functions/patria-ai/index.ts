import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8"
};

const systemPrompt = `Ti si PatriaSoul AI, digitalni vodič kroz Hrvatsku i sadržaj portala PatriaSoul.
Odgovaraj jasno, točno, prirodno i na hrvatskom jeziku.
Prioritet imaju potvrđeni podaci iz PatriaSoul Knowledge Base.
Ne izmišljaj činjenice i ne predstavljaj nepotvrđene podatke kao činjenice.
Ne prikazuj interno razmišljanje, analizu ili reasoning; korisniku prikaži samo konačan odgovor.
Odgovor mora biti potpun i završen cijelim rečenicama.
Budi sažet: ciljaj na najvažnije činjenice, najviše oko 250–350 riječi, osim ako pitanje izričito traži detaljan odgovor.
Ako koristiš popis, neka bude kratak i završi ga prije kraja odgovora.
Nemoj prekidati odgovor usred rečenice, stavke ili misli.`;

async function callBazaarLink(apiKey: string, model: string, messages: Array<{ role: string; content: string }>, maxTokens = 8192) {
  return fetch("https://api.bazaarlink.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      max_tokens: maxTokens,
      reasoning: { effort: "low" }
    })
  });
}

function extractText(data: any): string {
  return String(data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || data?.output_text || "").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  const apiKey = Deno.env.get("BAZAARLINK_API_KEY");
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "PatriaSoul AI provider nije konfiguriran.", provider: "bazaarlink", secretDetected: false }), { status: 503, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const question = String(body?.question || "").trim();
    const prompt = String(body?.prompt || "").trim();
    const model = String(body?.model || "auto:free");

    if (!question || !prompt) {
      return new Response(JSON.stringify({ error: "Nedostaje pitanje ili kontekst." }), { status: 400, headers: corsHeaders });
    }

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ];

    let bazaarResponse = await callBazaarLink(apiKey, model, messages, 8192);
    let data = await bazaarResponse.json();
    let text = bazaarResponse.ok ? extractText(data) : "";
    let finishReason = data?.choices?.[0]?.finish_reason || null;

    if (!bazaarResponse.ok) {
      console.error("PatriaSoul BazaarLink error", bazaarResponse.status, data);
      return new Response(JSON.stringify({ error: "AI provider nije uspio obraditi zahtjev.", provider: "bazaarlink", providerStatus: bazaarResponse.status }), { status: 502, headers: corsHeaders });
    }

    // Ako provider vrati prazan content ili prekine zbog duljine, pokušavamo još jednom.
    if (!text || finishReason === "length") {
      const compactMessages = [
        { role: "system", content: `${systemPrompt}\nOvo je drugi pokušaj. Ne prikazuj reasoning. Vrati ISKLJUČIVO konačan odgovor korisniku.\nOdgovor mora imati barem jednu potpunu rečenicu i mora završiti bez prekidanja.\nNajviše 180 riječi.` },
        { role: "user", content: prompt }
      ];

      try {
        const retryResponse = await callBazaarLink(apiKey, model, compactMessages, 4096);
        const retryData = await retryResponse.json();
        const retryText = retryResponse.ok ? extractText(retryData) : "";
        const retryFinishReason = retryData?.choices?.[0]?.finish_reason || null;

        console.info("PatriaSoul AI compact retry", {
          status: retryResponse.status,
          ok: retryResponse.ok,
          model: retryData?.model || model,
          finishReason: retryFinishReason,
          hasText: !!retryText
        });

        if (retryResponse.ok && retryText) {
          text = retryText;
          finishReason = retryFinishReason;
          data = retryData;
        }
      } catch (retryError) {
        console.error("PatriaSoul AI compact retry error", retryError);
      }
    }

    if (!text) {
      console.error("BazaarLink nije vratio tekst.", {
        model: data?.model || model,
        finishReason,
        choice: data?.choices?.[0] || null,
        usage: data?.usage || null,
        warning: data?.warning || null
      });

      return new Response(JSON.stringify({
        error: "AI provider je nakon ponovnog pokušaja vratio prazan odgovor.",
        provider: "bazaarlink",
        providerStatus: 200,
        model: data?.model || model,
        finishReason,
        retryAttempted: true
      }), { status: 502, headers: corsHeaders });
    }

    return new Response(JSON.stringify({
      text,
      model: data?.model || model,
      provider: "bazaarlink",
      secretDetected: true,
      finishReason
    }), { headers: corsHeaders });
  } catch (error) {
    console.error("PatriaSoul AI exception", error);
    return new Response(JSON.stringify({ error: "Greška u PatriaSoul AI servisu.", provider: "bazaarlink" }), { status: 500, headers: corsHeaders });
  }
});
