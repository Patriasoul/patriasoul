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

async function callBazaarLink(apiKey: string, model: string, messages: Array<{ role: string; content: string }>) {
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
      max_tokens: 8192,
      enable_thinking: false
    })
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const apiKey = Deno.env.get("BAZAARLINK_API_KEY");
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: "PatriaSoul AI provider nije konfiguriran.",
      provider: "bazaarlink",
      secretDetected: false
    }), {
      status: 503,
      headers: corsHeaders
    });
  }

  try {
    const body = await req.json();
    const question = String(body?.question || "").trim();
    const prompt = String(body?.prompt || "").trim();
    const model = String(body?.model || "auto:free");

    if (!question || !prompt) {
      return new Response(JSON.stringify({ error: "Nedostaje pitanje ili kontekst." }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ];

    let bazaarResponse = await callBazaarLink(apiKey, model, messages);
    let data = await bazaarResponse.json();

    if (!bazaarResponse.ok) {
      console.error("PatriaSoul BazaarLink error", bazaarResponse.status, data);
      return new Response(JSON.stringify({
        error: "AI provider nije uspio obraditi zahtjev.",
        provider: "bazaarlink",
        providerStatus: bazaarResponse.status
      }), {
        status: 502,
        headers: corsHeaders
      });
    }

    let text = data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      data?.output_text ||
      "";
    let finishReason = data?.choices?.[0]?.finish_reason || null;

    // Ako provider ipak prekine odgovor zbog duljine, tražimo kratku završnu verziju
    // umjesto da korisniku prikažemo odrezanu rečenicu.
    if (text && finishReason === "length") {
      const compactMessages = [
        { role: "system", content: systemPrompt + " Ovo je sažetak za korisnika. Odgovori potpuno i završi sve rečenice; najviše 180 riječi." },
        { role: "user", content: prompt }
      ];

      try {
        const retryResponse = await callBazaarLink(apiKey, model, compactMessages);
        const retryData = await retryResponse.json();
        if (retryResponse.ok) {
          const retryText = retryData?.choices?.[0]?.message?.content ||
            retryData?.choices?.[0]?.text ||
            retryData?.output_text ||
            "";
          if (retryText) {
            text = retryText;
            finishReason = retryData?.choices?.[0]?.finish_reason || null;
            data = retryData;
          }
        }
      } catch (retryError) {
        console.error("PatriaSoul AI compact retry error", retryError);
      }
    }

    if (!text) {
      console.error("BazaarLink nije vratio tekst.", data);
      return new Response(JSON.stringify({
        error: "AI provider je vratio prazan odgovor.",
        provider: "bazaarlink",
        providerStatus: 200,
        finishReason
      }), {
        status: 502,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({
      text: String(text).trim(),
      model: data?.model || model,
      provider: "bazaarlink",
      secretDetected: true,
      finishReason
    }), { headers: corsHeaders });
  } catch (error) {
    console.error("PatriaSoul AI exception", error);
    return new Response(JSON.stringify({
      error: "Greška u PatriaSoul AI servisu.",
      provider: "bazaarlink"
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
});
