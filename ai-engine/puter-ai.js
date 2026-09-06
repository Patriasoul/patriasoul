// PatriaSoul AI provider adapter
// Knowledge Retriever -> contextual prompt -> Ollama (local) or Puter.js fallback.
(function () {
  'use strict';

  const PUTER_SRC = 'https://js.puter.com/v2/';
  let puterLoadPromise = null;

  function getText(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    return response?.message?.content || response?.text || '';
  }

  function buildPrompt(question, context) {
    const sources = context.map((item, index) =>
      `[${index + 1}] ${item.title}\n${item.content}\nIzvor: ${item.sourceTitle || item.source || 'PatriaSoul baza'}\nStatus: ${item.status}`
    ).join('\n\n');

    return `Ti si PatriaSoul AI, digitalni vodič kroz Hrvatsku i sadržaj portala PatriaSoul.\n\n` +
      `PRAVILA:\n` +
      `- Odgovaraj na hrvatskom jeziku.\n` +
      `- Prioritet imaju podaci iz priloženog PatriaSoul konteksta.\n` +
      `- Ne izmišljaj činjenice koje nisu potkrijepljene kontekstom.\n` +
      `- Ako baza nema dovoljno podataka, jasno reci da podatak nije potvrđen u PatriaSoul bazi.\n` +
      `- Ne predstavljaj nacrte ili zapise u statusu draft/review kao potvrđene činjenice.\n` +
      `- Ako koristiš kontekst, na kraju navedi kratko "Izvori PatriaSoul: [brojevi]".\n\n` +
      `KONTEKST PATRIA SOUL BAZE:\n${sources || 'Nema relevantnog zapisa.'}\n\n` +
      `PITANJE KORISNIKA:\n${question}`;
  }

  function ollamaEnabled(options) {
    const cfg = window.PatriaSoulAIConfig || {};
    const provider = options.provider || cfg.provider;
    return provider === 'ollama' &&
      window.PatriaSoulOllama &&
      typeof window.PatriaSoulOllama.chat === 'function';
  }

  async function askWithOllama(prompt, options) {
    const cfg = window.PatriaSoulAIConfig || {};
    const model = options.model || cfg.model;
    if (!model || model === 'CHANGE_ME') {
      throw new Error('PatriaSoul AI: u Ollama konfiguraciji nije odabran model.');
    }
    return window.PatriaSoulOllama.chat(prompt, {
      baseUrl: options.baseUrl || cfg.baseUrl,
      model
    });
  }

  function hasPuter() {
    return !!(window.puter && window.puter.ai && typeof window.puter.ai.chat === 'function');
  }

  function loadPuter() {
    if (hasPuter()) return Promise.resolve(window.puter);
    if (puterLoadPromise) return puterLoadPromise;

    puterLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-patriasoul-puter]');
      if (existing) {
        const started = Date.now();
        const check = () => {
          if (hasPuter()) return resolve(window.puter);
          if (Date.now() - started >= 15000) return reject(new Error('Puter.js se učitao, ali njegov AI API nije dostupan.'));
          setTimeout(check, 100);
        };
        check();
        return;
      }

      const script = document.createElement('script');
      script.src = PUTER_SRC;
      script.async = false;
      script.dataset.patriasoulPuter = 'true';
      script.onload = () => {
        const started = Date.now();
        const check = () => {
          if (hasPuter()) return resolve(window.puter);
          if (Date.now() - started >= 15000) return reject(new Error('Puter.js se učitao, ali njegov AI API nije dostupan.'));
          setTimeout(check, 100);
        };
        check();
      };
      script.onerror = () => reject(new Error('Ne mogu učitati Puter.js s ' + PUTER_SRC));
      document.head.appendChild(script);
    });

    return puterLoadPromise;
  }

  async function ensurePuter() {
    await loadPuter();
    if (!hasPuter()) throw new Error('Puter.js nije učitan.');
  }

  async function ensurePuterAuth() {
    await ensurePuter();
    if (window.puter.auth && typeof window.puter.auth.isSignedIn === 'function' && !window.puter.auth.isSignedIn()) {
      if (typeof window.puter.auth.signIn !== 'function') {
        throw new Error('Puter prijava nije dostupna.');
      }
      await window.puter.auth.signIn({ attempt_temp_user_creation: true });
    }
  }

  async function ask(question, options = {}) {
    const q = String(question || '').trim();
    if (!q) throw new Error('Upit je prazan.');

    const items = Array.isArray(options.knowledge) ? options.knowledge : [];
    let context = [];

    if (window.PatriaSoulKnowledgeRetriever && items.length) {
      const results = window.PatriaSoulKnowledgeRetriever.retrieve(items, q, {
        limit: options.limit || 8,
        trustedOnly: options.trustedOnly !== false,
        filters: options.filters || {}
      });
      context = window.PatriaSoulKnowledgeRetriever.buildContext(results);
    }

    const prompt = buildPrompt(q, context);

    if (ollamaEnabled(options)) {
      const text = await askWithOllama(prompt, options);
      return {
        text: getText(text),
        model: options.model || window.PatriaSoulAIConfig.model,
        provider: 'ollama',
        context,
        usedKnowledgeBase: context.length > 0
      };
    }

    await ensurePuterAuth();
    const request = { stream: options.stream === true };
    if (options.model) request.model = options.model;
    const response = await window.puter.ai.chat(prompt, request);

    return {
      text: getText(response),
      model: options.model || 'Puter default model',
      provider: 'puter',
      context,
      usedKnowledgeBase: context.length > 0
    };
  }

  window.PatriaSoulAI = { ask, buildPrompt };
})();
