// PatriaSoul AI provider adapter
// Knowledge Retriever -> contextual prompt -> Ollama (local) or Puter.js.
(function () {
  'use strict';

  const PUTER_SRC = 'https://js.puter.com/v2/';
  const PUTER_TIMEOUT = 15000;
  let puterLoadPromise = null;

  function getText(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    if (typeof response?.message?.content === 'string') return response.message.content;
    if (Array.isArray(response?.message?.content)) {
      return response.message.content.map(x => x?.text || '').join('');
    }
    return response?.text || '';
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

  function waitForPuter(timeoutMs) {
    const started = Date.now();
    const timeout = timeoutMs || PUTER_TIMEOUT;
    return new Promise((resolve, reject) => {
      (function check() {
        if (hasPuter()) return resolve(window.puter);
        if (Date.now() - started >= timeout) {
          reject(new Error('Puter.js se učitao, ali puter.ai.chat nije dostupan.'));
          return;
        }
        setTimeout(check, 100);
      })();
    });
  }

  function loadPuter() {
    if (hasPuter()) return Promise.resolve(window.puter);
    if (puterLoadPromise) return puterLoadPromise;

    puterLoadPromise = new Promise((resolve, reject) => {
      let script = document.querySelector('script[data-patriasoul-puter]');
      if (!script) {
        script = document.createElement('script');
        script.src = PUTER_SRC;
        script.async = false;
        script.dataset.patriasoulPuter = 'true';
        document.head.appendChild(script);
      }

      const failTimer = setTimeout(() => {
        reject(new Error('Puter.js nije moguće učitati. Provjeri mrežu, CSP ili blokiranje CDN skripti.'));
      }, PUTER_TIMEOUT + 2000);

      waitForPuter(PUTER_TIMEOUT).then(puter => {
        clearTimeout(failTimer);
        resolve(puter);
      }).catch(error => {
        clearTimeout(failTimer);
        puterLoadPromise = null;
        reject(error);
      });
    });

    return puterLoadPromise;
  }

  async function ensurePuter() {
    await loadPuter();
    if (!hasPuter()) throw new Error('Puter.js nije učitan.');
    return window.puter;
  }

  async function ensurePuterAuth() {
    const puter = await ensurePuter();
    if (puter.auth && typeof puter.auth.isSignedIn === 'function' && !puter.auth.isSignedIn()) {
      if (typeof puter.auth.signIn !== 'function') {
        throw new Error('Puter prijava nije dostupna.');
      }
      await puter.auth.signIn({ attempt_temp_user_creation: true });
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
    const request = {
      stream: options.stream === true,
      model: options.model || (window.PatriaSoulAIConfig && window.PatriaSoulAIConfig.model) || 'gpt-5.6-luna'
    };
    const response = await window.puter.ai.chat(prompt, request);

    return {
      text: getText(response),
      model: request.model,
      provider: 'puter',
      context,
      usedKnowledgeBase: context.length > 0
    };
  }

  async function healthCheck() {
    const status = {
      puter: false,
      chat: false,
      auth: false,
      agent: !!(window.PatriaSoulAgent && typeof window.PatriaSoulAgent.ask === 'function'),
      retriever: !!(window.PatriaSoulKnowledgeRetriever && typeof window.PatriaSoulKnowledgeRetriever.retrieve === 'function'),
      error: null
    };
    try {
      const puter = await ensurePuter();
      status.puter = true;
      status.chat = !!(puter.ai && typeof puter.ai.chat === 'function');
      status.auth = !puter.auth || typeof puter.auth.isSignedIn !== 'function' || puter.auth.isSignedIn();
    } catch (error) {
      status.error = error?.message || String(error);
    }
    return status;
  }

  window.PatriaSoulAI = { ask, buildPrompt, ensurePuter, healthCheck };
})();
