// PatriaSoul - "Pitaj PatriaSoul" prototype
(function () {
  'use strict';

  async function loadKnowledge() {
    const response = await fetch('/ai-engine/knowledge/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('PatriaSoul Knowledge Base nije dostupna.');
    return response.json();
  }

  async function ask(question, options = {}) {
    const cleanQuestion = String(question || '').trim();
    if (!cleanQuestion) throw new Error('Upiši pitanje.');

    const items = await loadKnowledge();
    const retriever = window.PatriaSoulKnowledgeRetriever;
    if (!retriever) throw new Error('PatriaSoul Knowledge Retriever nije učitan.');

    const results = retriever.retrieve(items, cleanQuestion, {
      trustedOnly: options.trustedOnly !== false,
      limit: options.limit || 8,
      filters: options.filters || {}
    });
    const context = retriever.buildContext(results);

    if (!window.PatriaSoulPuterAI) throw new Error('Puter AI provider nije učitan.');
    const response = await window.PatriaSoulPuterAI.ask(cleanQuestion, context, options);

    return { response, context, results };
  }

  function responseText(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    if (typeof response.message?.content === 'string') return response.message.content;
    if (typeof response.text === 'string') return response.text;
    return JSON.stringify(response);
  }

  window.PatriaSoulAsk = { ask, responseText };
})();
