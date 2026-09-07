/* PatriaSoul AI Agent — Knowledge-only Agent v5
 * Read-only router + Knowledge Base + local Answer Engine.
 * The agent never writes to the site and never calls external AI APIs.
 */
(function (global) {
  'use strict';

  const MAX_CONTEXT_ITEMS = 6;

  function isQuizQuestion(question) {
    const q = String(question || '').toLocaleLowerCase('hr-HR');
    return /\b(kviz|pitanje|točan odgovor|tocan odgovor|odgovori|odgovor je|koji je odgovor)\b/.test(q);
  }

  function isCityQuestion(question) {
    const q = String(question || '').toLocaleLowerCase('hr-HR');
    return /\b(grad|grada|gradu|gradom|gradovi|vukovar|zagreb|split|rijeka|dubrovnik)\b/.test(q);
  }

  async function loadKnowledge() {
    const response = await fetch('/ai-engine/knowledge/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('PatriaSoul Knowledge Base nije dostupna.');
    const data = await response.json();
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
    const quizQuestion = isQuizQuestion(q);
    const cityQuestion = isCityQuestion(q);

    const results = global.PatriaSoulKnowledgeRetriever.retrieve(items, q, {
      trustedOnly: opts.trustedOnly !== false,
      limit: opts.limit || MAX_CONTEXT_ITEMS,
      filters: opts.filters || {}
    }).filter(function (result) {
      if (!quizQuestion && result.item && result.item.type === 'kviz') return false;
      return true;
    });

    if (cityQuestion) {
      results.sort(function (a, b) {
        const aCity = a.item && (a.item.type === 'grad' || a.item.cityId) ? 1 : 0;
        const bCity = b.item && (b.item.type === 'grad' || b.item.cityId) ? 1 : 0;
        if (bCity !== aCity) return bCity - aCity;
        return Number(b.score || 0) - Number(a.score || 0);
      });
    }

    const context = global.PatriaSoulKnowledgeRetriever.buildContext(results.slice(0, MAX_CONTEXT_ITEMS));
    const result = await global.PatriaSoulAI.ask(q, { knowledge: context });

    return {
      text: result && result.text ? result.text : 'Trenutno nema odgovora.',
      route,
      results,
      context,
      provider: result && result.provider ? result.provider : 'patriasoul-answer-engine',
      model: result && result.model ? result.model : 'knowledge-only',
      fallback: !!(result && result.fallback)
    };
  }

  global.PatriaSoulAgent = Object.freeze({ ask });
})(window);
