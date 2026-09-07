/* PatriaSoul AI — knowledge-only content generator
 * Generates drafts from the canonical PatriaSoul Knowledge Base.
 * It never publishes, writes repository content or calls external AI APIs.
 */
(function (global) {
  'use strict';

  const MAX_CONTEXT_ITEMS = 12;

  async function loadKnowledge() {
    const response = await fetch('/ai-engine/knowledge/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('PatriaSoul Knowledge Base nije dostupna.');
    const data = await response.json();
    return Array.isArray(data) ? data : (data.items || []);
  }

  function getContext(items, query) {
    if (!global.PatriaSoulKnowledgeRetriever) throw new Error('PatriaSoul Knowledge Retriever nije učitan.');
    const results = global.PatriaSoulKnowledgeRetriever.retrieve(items, query, {
      trustedOnly: true,
      limit: MAX_CONTEXT_ITEMS,
      filters: {}
    });
    return global.PatriaSoulKnowledgeRetriever.buildContext(results);
  }

  async function generate(type, topic) {
    const cleanTopic = String(topic || '').trim();
    if (!cleanTopic) throw new Error('Tema je prazna.');
    if (!global.PatriaSoulAI || typeof global.PatriaSoulAI.ask !== 'function') throw new Error('PatriaSoul AI provider nije učitan.');

    const items = await loadKnowledge();
    const context = getContext(items, cleanTopic);
    const response = await global.PatriaSoulAI.ask(cleanTopic, { knowledge: context });

    return { type, topic: cleanTopic, text: response?.text || '', context, fallback: !!response?.fallback };
  }

  global.PatriaSoulContent = Object.freeze({ generate });
})(window);
