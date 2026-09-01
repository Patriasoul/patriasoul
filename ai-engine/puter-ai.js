// PatriaSoul AI + Puter.js
// Frontend adapter: Knowledge Retriever -> contextual prompt -> Puter AI.
(function () {
  'use strict';

  function ensurePuter() {
    if (!window.puter || !window.puter.ai || typeof window.puter.ai.chat !== 'function') {
      throw new Error('Puter.js nije učitan. Dodaj https://js.puter.com/v2/ prije ovog modula.');
    }
  }

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

  async function ask(question, options = {}) {
    ensurePuter();
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
    const request = { stream: options.stream === true };
    if (options.model) request.model = options.model;

    const response = await window.puter.ai.chat(prompt, request);

    return {
      text: getText(response),
      model: options.model || 'Puter default model',
      context,
      usedKnowledgeBase: context.length > 0
    };
  }

  window.PatriaSoulAI = { ask, buildPrompt };
})();
