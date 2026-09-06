// PatriaSoul AI provider adapter
// The browser talks only to the PatriaSoul provider endpoint.
// No Puter authentication or third-party provider login is exposed to visitors.
(function (global) {
  'use strict';

  function getConfig() {
    return global.PatriaSoulAIConfig || {};
  }

  function getText(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    if (typeof response?.text === 'string') return response.text;
    if (typeof response?.output_text === 'string') return response.output_text;
    if (typeof response?.message?.content === 'string') return response.message.content;
    return '';
  }

  function buildPrompt(question, context) {
    const sources = (context || []).map((item, index) =>
      `[${index + 1}] ${item.title}\n${item.content}\nIzvor: ${item.sourceTitle || item.source || 'PatriaSoul baza'}\nStatus: ${item.status}`
    ).join('\n\n');

    return `Ti si PatriaSoul AI, digitalni vodič kroz Hrvatsku i sadržaj portala PatriaSoul.\n\n` +
      `PRAVILA:\n` +
      `- Odgovaraj na hrvatskom jeziku.\n` +
      `- Prioritet imaju potvrđeni podaci iz PatriaSoul baze.\n` +
      `- Ne izmišljaj činjenice koje nisu potkrijepljene dostupnim podacima.\n` +
      `- Zapise u statusu draft/review ne predstavljaj kao potvrđene činjenice.\n` +
      `- Ako nema dovoljno podataka, jasno reci da podatak nije potvrđen u PatriaSoul bazi.\n` +
      `- Ne izvršavaj promjene na stranici.\n\n` +
      `KONTEKST PATRIA SOUL BAZE:\n${sources || 'Nema relevantnog zapisa.'}\n\n` +
      `PITANJE KORISNIKA:\n${question}`;
  }

  function buildKnowledgeFallback(question, context) {
    if (!context || !context.length) {
      return 'U PatriaSoul bazi trenutno nema dovoljno potvrđenih podataka za ovo pitanje.';
    }

    const top = context.slice(0, 3);
    const intro = 'Prema dostupnim podacima iz PatriaSoul baze, pronašao sam ove relevantne zapise:\n\n';
    const body = top.map((item, index) => {
      const content = String(item.content || '').trim();
      const excerpt = content.length > 700 ? content.slice(0, 700).replace(/\s+\S*$/, '') + '…' : content;
      return `${index + 1}. ${item.title}\n${excerpt}`;
    }).join('\n\n');
    return intro + body + '\n\nIzvor: PatriaSoul Knowledge Base.';
  }

  async function askPatriaSoulApi(prompt, question, context, options) {
    const cfg = getConfig();
    const endpoint = options.apiEndpoint || cfg.apiEndpoint || '/api/ai';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        question,
        prompt,
        context,
        model: options.model || cfg.model || 'gpt-5.6-luna'
      })
    });

    if (!response.ok) {
      const error = new Error('PatriaSoul AI servis nije dostupan (' + response.status + ').');
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    const text = getText(data);
    if (!text) throw new Error('PatriaSoul AI servis je vratio prazan odgovor.');
    return { text, model: data.model || options.model || cfg.model, provider: 'patriasoul-api' };
  }

  async function askWithOllama(prompt, options) {
    if (!global.PatriaSoulOllama || typeof global.PatriaSoulOllama.chat !== 'function') {
      throw new Error('Lokalni Ollama provider nije učitan.');
    }
    const cfg = getConfig();
    const text = await global.PatriaSoulOllama.chat(prompt, {
      baseUrl: options.baseUrl || cfg.baseUrl,
      model: options.model || cfg.model
    });
    return { text: getText(text), model: options.model || cfg.model, provider: 'ollama' };
  }

  async function ask(question, options) {
    const opts = options || {};
    const q = String(question || '').trim();
    if (!q) throw new Error('Upit je prazan.');

    const context = Array.isArray(opts.knowledge) ? opts.knowledge : [];
    const prompt = opts.prompt || buildPrompt(q, context);
    const cfg = getConfig();
    const provider = opts.provider || cfg.provider || 'patriasoul-api';

    try {
      if (provider === 'ollama') {
        const local = await askWithOllama(prompt, opts);
        return { ...local, context, usedKnowledgeBase: context.length > 0 };
      }

      const result = await askPatriaSoulApi(prompt, q, context, opts);
      return { ...result, context, usedKnowledgeBase: context.length > 0 };
    } catch (error) {
      if (cfg.knowledgeOnlyFallback && context.length) {
        return {
          text: buildKnowledgeFallback(q, context),
          model: 'knowledge-base-fallback',
          provider: 'patriasoul-knowledge',
          context,
          usedKnowledgeBase: true,
          fallback: true,
          providerError: error?.message || String(error)
        };
      }
      throw error;
    }
  }

  async function healthCheck() {
    const cfg = getConfig();
    return {
      provider: cfg.provider || 'patriasoul-api',
      endpoint: cfg.apiEndpoint || '/api/ai',
      agent: !!(global.PatriaSoulAgent && typeof global.PatriaSoulAgent.ask === 'function'),
      retriever: !!(global.PatriaSoulKnowledgeRetriever && typeof global.PatriaSoulKnowledgeRetriever.retrieve === 'function'),
      ready: true
    };
  }

  global.PatriaSoulAI = Object.freeze({ ask, buildPrompt, healthCheck });
})(window);
