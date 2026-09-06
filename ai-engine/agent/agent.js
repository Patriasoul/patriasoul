/* PatriaSoul AI Agent — Agent v1
 *
 * Connects the read-only router to the existing Knowledge Base and Puter.js.
 * The agent is intentionally bounded: it can retrieve context, select a
 * read-only ability, and stream a final answer. It cannot write to the site.
 */
(function (global) {
  'use strict';

  const MAX_CONTEXT_ITEMS = 8;

  async function loadKnowledge() {
    const response = await fetch('/ai-engine/knowledge/index.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('PatriaSoul Knowledge Base nije dostupna.');
    }
    return response.json();
  }

  function ensureDependencies() {
    if (!global.PatriaSoulAgentRouter) {
      throw new Error('PatriaSoul Agent Router nije učitan.');
    }
    if (!global.PatriaSoulAgentTools) {
      throw new Error('PatriaSoul Agent Tool Registry nije učitan.');
    }
    if (!global.PatriaSoulKnowledgeRetriever) {
      throw new Error('PatriaSoul Knowledge Retriever nije učitan.');
    }
    if (!global.puter || !global.puter.ai || typeof global.puter.ai.chat !== 'function') {
      throw new Error('Puter.js nije učitan.');
    }
  }

  function buildSystemPrompt(route, context) {
    const sources = context.map(function (item, index) {
      return `[${index + 1}] ${item.title}\n${item.content}\nIzvor: ${item.sourceTitle || item.source || 'PatriaSoul baza'}\nStatus: ${item.status}`;
    }).join('\n\n');

    return [
      'Ti si PatriaSoul AI, digitalni vodič kroz Hrvatsku i sadržaj portala PatriaSoul.',
      '',
      'PRAVILA:',
      '- Odgovaraj na hrvatskom jeziku.',
      '- Prioritet imaju provjereni podaci iz PatriaSoul Knowledge Base.',
      '- Ne izmišljaj činjenice koje nisu potkrijepljene dostupnim podacima.',
      '- Zapise u statusu draft/review ne predstavljaj kao potvrđene činjenice.',
      '- Ako nema dovoljno podataka, jasno reci da podatak nije potvrđen u PatriaSoul bazi.',
      '- Ne izvodi nikakve izmjene sadržaja ili sustava.',
      '',
      `ODABRANA ABILITY: ${route.tool || 'none'}`,
      `OPIS: ${(global.PatriaSoulAgentTools.get(route.tool) || {}).description || 'Nema odabrane Ability.'}`,
      '',
      'KONTEKST PATRIA SOUL BAZE:',
      sources || 'Nema relevantnog zapisa.'
    ].join('\n');
  }

  async function stream(question, options) {
    const opts = options || {};
    const q = String(question || '').trim();
    if (!q) throw new Error('Upiši pitanje.');

    ensureDependencies();

    const route = global.PatriaSoulAgentRouter.route(q);
    const items = await loadKnowledge();
    const results = global.PatriaSoulKnowledgeRetriever.retrieve(items, q, {
      trustedOnly: opts.trustedOnly !== false,
      limit: opts.limit || MAX_CONTEXT_ITEMS,
      filters: opts.filters || {}
    });
    const context = global.PatriaSoulKnowledgeRetriever.buildContext(results);

    const messages = [
      { role: 'system', content: buildSystemPrompt(route, context) },
      { role: 'user', content: q }
    ];

    const request = {
      stream: true,
      compaction: opts.compaction === false ? false : true
    };
    if (opts.model) request.model = opts.model;
    if (opts.temperature !== undefined) request.temperature = opts.temperature;

    const response = await global.puter.ai.chat(messages, request);

    return {
      response: response,
      route: route,
      results: results,
      context: context,
      provider: 'puter',
      model: opts.model || 'Puter default model'
    };
  }

  async function ask(question, options) {
    const run = await stream(question, options);
    let text = '';
    let compaction = null;

    for await (const part of run.response) {
      if (part && part.type === 'text' && part.text) {
        text += part.text;
      } else if (part && part.text) {
        text += part.text;
      } else if (part && part.type === 'compaction') {
        compaction = part;
      } else if (part && part.type === 'error') {
        throw new Error(part.message || 'Puter AI streaming greška.');
      }
    }

    return Object.assign(run, {
      text: text,
      compaction: compaction
    });
  }

  global.PatriaSoulAgent = Object.freeze({
    stream: stream,
    ask: ask
  });
})(window);
