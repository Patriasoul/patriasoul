import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8"
};

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
    return new Response(JSON.stringify({ error: "PatriaSoul AI provider nije konfiguriran.", provider: "bazaarlink", secretDetected: false }), {
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

    const bazaarResponse = await fetch("https://api.bazaarlink.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "Ti si PatriaSoul AI, digitalni vodič kroz Hrvatsku i sadržaj portala PatriaSoul. Odgovaraj jasno, točno i na hrvatskom jeziku. Prioritet imaju potvrđeni podaci iz PatriaSoul Knowledge Base. Ne izmišljaj činjenice i ne predstavljaj nepotvrđene podatke kao činjenice."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1200
      })
    });

    const data = await bazaarResponse.json();

    if (!bazaarResponse.ok) {
      console.error("PatriaSoul BazaarLink error", bazaarResponse.status, data);
      return new Response(JSON.stringify({ error: "AI provider nije uspio obraditi zahtjev.", provider: "bazaarlink", providerStatus: bazaarResponse.status }), {
        status: 502,
        headers: corsHeaders
      });
    }

    const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || data?.output_text || "";

    if (!text) {
      return new Response(JSON.stringify({ error: "AI provider je vratio prazan odgovor.", provider: "bazaarlink" }), {
        status: 502,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({
      text,
      model: data?.model || model,
      provider: "bazaarlink",
      secretDetected: true
    }), { headers: corsHeaders });
  } catch (error) {
    console.error("PatriaSoul AI exception", error);
    return new Response(JSON.stringify({ error: "Greška u PatriaSoul AI servisu.", provider: "bazaarlink" }), {
      status: 500,
      headers: corsHeaders
    });
  }
});
