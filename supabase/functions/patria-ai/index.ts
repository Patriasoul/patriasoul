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

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "PatriaSoul AI provider nije konfiguriran." }), {
      status: 503,
      headers: corsHeaders
    });
  }

  try {
    const body = await req.json();
    const question = String(body?.question || "").trim();
    const prompt = String(body?.prompt || "").trim();
    const model = String(body?.model || "gpt-5.6-luna");

    if (!question || !prompt) {
      return new Response(JSON.stringify({ error: "Nedostaje pitanje ili kontekst." }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: prompt,
        max_output_tokens: 1200
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("PatriaSoul AI provider error", response.status, data);
      return new Response(JSON.stringify({ error: "AI provider nije uspio obraditi zahtjev." }), {
        status: 502,
        headers: corsHeaders
      });
    }

    const text = data?.output_text ||
      data?.output?.flatMap((item: any) => item?.content || [])
        ?.map((item: any) => item?.text || "")
        ?.join("") || "";

    if (!text) {
      return new Response(JSON.stringify({ error: "AI provider je vratio prazan odgovor." }), {
        status: 502,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({
      text,
      model,
      provider: "patriasoul-ai"
    }), { headers: corsHeaders });
  } catch (error) {
    console.error("PatriaSoul AI exception", error);
    return new Response(JSON.stringify({ error: "Greška u PatriaSoul AI servisu." }), {
      status: 500,
      headers: corsHeaders
    });
  }
});
