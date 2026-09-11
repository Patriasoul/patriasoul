/* PatriaSoul AI Agent — Knowledge-only Agent v7
 * Read-only router + unified Croatian Knowledge Base + local Answer Engine.
 */
(function (global) {
  'use strict';

  const MAX_CONTEXT_ITEMS = 6;
  const KNOWLEDGE_FILES = [
    '/ai-engine/knowledge/index.json',
    '/ai-engine/knowledge/core-knowledge.json',
    '/ai-engine/knowledge/croatia-core-expansion.json'
  ];

  function isQuizQuestion(question) {
    return /\b(kviz|pitanje|točan odgovor|tocan odgovor|odgovori|odgovor je|koji je odgovor)\b/.test(String(question || '').toLocaleLowerCase('hr-HR'));
  }

  function isCityQuestion(question) {
    return /\b(grad|grada|gradu|gradom|gradovi|vukovar|zagreb|split|rijeka|dubrovnik|zadar|osijek|knin|sinj|pula|šibenik|sibenik|trogir|varaždin|varazdin|karlovac|gospić|gospic|čakovec|cakovec|prelog|samobor)\b/.test(String(question || '').toLocaleLowerCase('hr-HR'));
  }

  async function loadKnowledgeFile(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error('Ne mogu učitati PatriaSoul Knowledge Base: ' + path);
    const data = await response.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    throw new Error('PatriaSoul Knowledge Base ima neispravan format: ' + path);
  }

  async function loadKnowledge() {
    const loaded = await Promise.all(KNOWLEDGE_FILES.map(loadKnowledgeFile));
    const seen = new Set();
    const merged = [];
    loaded.flat().forEach(item => {
      if (!item || !item.id || seen.has(item.id)) return;
      seen.add(item.id);
      merged.push(item);
    });
    return merged;
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
      const guard = global.PatriaSoulQuizGuard.guard(q, { quizActive: !!opts.quizActive, pathname: global.location && global.location.pathname });
      if (guard.blocked) return { text: guard.text, blocked: true, route: null, results: [], context: [], provider: 'patriasoul-quiz-guard', model: '', fallback: false };
    }

    const route = global.PatriaSoulAgentRouter.route(q);
    const items = await loadKnowledge();
    const quizQuestion = isQuizQuestion(q);
    const cityQuestion = isCityQuestion(q);
    let results = global.PatriaSoulKnowledgeRetriever.retrieve(items, q, {
      trustedOnly: opts.trustedOnly !== false,
      limit: opts.limit || MAX_CONTEXT_ITEMS,
      filters: opts.filters || {}
    }).filter(result => quizQuestion || !result.item || result.item.type !== 'kviz');

    if (cityQuestion) {
      results.sort((a, b) => {
        const aCity = a.item && (a.item.type === 'grad' || a.item.cityId) ? 1 : 0;
        const bCity = b.item && (b.item.type === 'grad' || b.item.cityId) ? 1 : 0;
        return bCity - aCity || Number(b.score || 0) - Number(a.score || 0);
      });
    }

    const context = global.PatriaSoulKnowledgeRetriever.buildContext(results.slice(0, MAX_CONTEXT_ITEMS));
    const result = await global.PatriaSoulAI.ask(q, { knowledge: context });
    return {
      text: result?.text || 'Trenutno nema odgovora.', route, results, context,
      provider: result?.provider || 'patriasoul-answer-engine',
      model: result?.model || 'knowledge-only',
      fallback: !!result?.fallback
    };
  }

  global.PatriaSoulAgent = Object.freeze({ ask, knowledgeVersion: '7.0.0' });
})(window);
