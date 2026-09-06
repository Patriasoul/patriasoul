/* PatriaSoul AI Agent — Agent v3
 * Read-only router + Knowledge Base + provider.
 * The agent never writes to the site.
 */
(function (global) {
  'use strict';

  const MAX_CONTEXT_ITEMS = 8;

  async function loadKnowledge() {
    const response = await fetch('/ai-engine/knowledge/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('PatriaSoul Knowledge Base nije dostupna.');
    const data = await response.json();
    // Knowledge index is a manifest object: { version, counts, items: [...] }.
    // The retriever expects the actual item array.
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    throw new Error('PatriaSoul Knowledge Base ima neispravan format.');
  }

  function ensureDependencies() {
    if (!global.PatriaSoulAgentRouter) throw new Error('PatriaSoul Agent Router nije učitan.');
    if (!global.PatriaSoulAgentTools) throw new Error('PatriaSoul Agent Tool Registry nije učitan.');
    if (!global.PatriaSoulKnowledgeRetriever) throw new Error('PatriaSoul Knowledge Retriever nije učitan.');
    if (!global.PatriaSoulAI || typeof global.PatriaSoulAI.ask !== 'function') throw new Error('PatriaSoul AI provider nije učitan.');
  }

  function buildPrompt(route, context, question) {
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
      '- Ne izvršavaj nikakve izmjene sadržaja ili sustava.',
      '',
      `ODABRANA ABILITY: ${route.tool || 'none'}`,
      `OPIS: ${(global.PatriaSoulAgentTools.get(route.tool) || {}).description || 'Nema odabrane Ability.'}`,
      '',
      'KONTEKST PATRIA SOUL BAZE:',
      sources || 'Nema relevantnog zapisa.',
      '',
      'PITANJE KORISNIKA:',
      question
    ].join('\n');
  }

  async function ask(question, options) {
    const opts = options || {};
    const q = String(question || '').trim();
    if (!q) throw new Error('Upiši pitanje.');
    ensureDependencies();

    if (global.PatriaSoulQuizGuard) {
      const guard = global.PatriaSoulQuizGuard.guard(q, {
        quizActive: !!opts.quizActive,
        pathname: global.location && global.location.pathname
      });
      if (guard.blocked) return { text: guard.text, blocked: true, route: null, results: [], context: [], provider: 'patriasoul-quiz-guard', model: '', fallback: false };
    }

    const route = global.PatriaSoulAgentRouter.route(q);
    const items = await loadKnowledge();
    const results = global.PatriaSoulKnowledgeRetriever.retrieve(items, q, {
      trustedOnly: opts.trustedOnly !== false,
      limit: opts.limit || MAX_CONTEXT_ITEMS,
      filters: opts.filters || {}
    });
    const context = global.PatriaSoulKnowledgeRetriever.buildContext(results);
    const prompt = buildPrompt(route, context, q);

    const result = await global.PatriaSoulAI.ask(q, {
      provider: opts.provider,
      model: opts.model,
      baseUrl: opts.baseUrl,
      apiEndpoint: opts.apiEndpoint,
      stream: false,
      trustedOnly: opts.trustedOnly !== false,
      knowledge: context,
      prompt
    });

    return {
      text: result && result.text ? result.text : 'Trenutno nema odgovora.',
      route,
      results,
      context,
      provider: result && result.provider ? result.provider : 'unknown',
      model: result && result.model ? result.model : '',
      fallback: !!(result && result.fallback)
    };
  }

  global.PatriaSoulAgent = Object.freeze({ ask });
})(window);
