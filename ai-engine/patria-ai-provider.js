// PatriaSoul AI provider
// Public-safe adapter: the browser talks to the PatriaSoul backend only.
// No provider secret or third-party authentication belongs in this file.
(function (global) {
  'use strict';

  function config() { return global.PatriaSoulAIConfig || {}; }

  function textOf(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    return response.text || response.output_text || response.message?.content || '';
  }

  function buildPrompt(question, context) {
    const sources = (context || []).map((item, i) =>
      `[${i + 1}] ${item.title}\n${item.content}\nIzvor: ${item.sourceTitle || item.source || 'PatriaSoul baza'}\nStatus: ${item.status}`
    ).join('\n\n');

    return [
      'Ti si PatriaSoul AI, digitalni vodič kroz Hrvatsku i sadržaj portala PatriaSoul.',
      'Odgovaraj na hrvatskom.',
      'Prioritet imaju potvrđeni podaci iz PatriaSoul Knowledge Base.',
      'Ne izmišljaj činjenice. Ako baza nije dovoljna, reci to jasno.',
      'Zapise draft/review ne predstavljaj kao potvrđene činjenice.',
      '',
      'KONTEKST:',
      sources || 'Nema relevantnog zapisa.',
      '',
      'PITANJE:',
      question
    ].join('\n');
  }

  function knowledgeFallback(context) {
    if (!context?.length) return 'U PatriaSoul bazi nema dovoljno potvrđenih podataka za ovo pitanje.';
    return 'Prema relevantnim zapisima PatriaSoul baze:\n\n' + context.slice(0, 3).map((item, i) => {
      const text = String(item.content || '').trim();
      return `${i + 1}. ${item.title}\n${text.length > 700 ? text.slice(0, 700).replace(/\s+\S*$/, '') + '…' : text}`;
    }).join('\n\n') + '\n\nIzvor: PatriaSoul Knowledge Base.';
  }

  async function ask(question, options) {
    const opts = options || {};
    const cfg = config();
    const context = Array.isArray(opts.knowledge) ? opts.knowledge : [];
    const prompt = opts.prompt || buildPrompt(question, context);
    const endpoint = opts.apiEndpoint || cfg.apiEndpoint || '/api/ai';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The PatriaSoul Edge Function is a public AI endpoint; browser cookies
        // are not required. Omitting credentials also avoids credentialed-CORS
        // failures when the backend intentionally returns wildcard CORS headers.
        credentials: 'omit',
        body: JSON.stringify({
          question: String(question),
          prompt,
          context,
          model: opts.model || cfg.model || 'auto:free'
        })
      });
      if (!response.ok) throw new Error('PatriaSoul AI servis nije dostupan (' + response.status + ').');
      const data = await response.json();
      const text = textOf(data);
      if (!text) throw new Error('PatriaSoul AI servis je vratio prazan odgovor.');
      return {
        text,
        model: data.model || cfg.model,
        provider: data.provider || 'patriasoul-api',
        context,
        usedKnowledgeBase: context.length > 0
      };
    } catch (error) {
      if (cfg.knowledgeOnlyFallback && context.length) {
        return {
          text: knowledgeFallback(context),
          model: 'knowledge-base-fallback',
          provider: 'patriasoul-knowledge',
          context,
          usedKnowledgeBase: true,
          fallback: true,
          providerError: error.message
        };
      }
      throw error;
    }
  }

  async function healthCheck() {
    const cfg = config();
    return {
      provider: cfg.provider || 'patriasoul-api',
      endpoint: cfg.apiEndpoint || '/api/ai',
      agent: !!global.PatriaSoulAgent,
      retriever: !!global.PatriaSoulKnowledgeRetriever,
      ready: true
    };
  }

  global.PatriaSoulAI = Object.freeze({ ask, buildPrompt, healthCheck });
})(window);
