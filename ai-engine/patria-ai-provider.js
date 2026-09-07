// PatriaSoul AI provider — knowledge-only
// Nema vanjskog AI providera, endpointa, API ključa ni mrežnog AI poziva.
(function (global) {
  'use strict';

  function textOf(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    return response.text || '';
  }

  async function ask(question, options) {
    const opts = options || {};
    const context = Array.isArray(opts.knowledge) ? opts.knowledge : [];
    const engine = global.PatriaSoulAnswerEngine;

    if (engine && typeof engine.compose === 'function') {
      const answer = engine.compose(String(question || ''), context);
      return {
        text: textOf(answer),
        model: answer.model || 'knowledge-only',
        provider: answer.provider || 'patriasoul-answer-engine',
        context,
        usedKnowledgeBase: !!answer.usedKnowledgeBase,
        confidence: answer.confidence ?? 0,
        sources: answer.sources || [],
        fallback: false
      };
    }

    if (context.length) {
      return {
        text: 'Prema relevantnim zapisima PatriaSoul baze:\n\n' + context.slice(0, 3).map((item, i) => `${i + 1}. ${item.title}\n${cleanText(item.content)}`).join('\n\n'),
        model: 'knowledge-base-fallback',
        provider: 'patriasoul-knowledge',
        context,
        usedKnowledgeBase: true,
        fallback: true
      };
    }

    throw new Error('PatriaSoul Answer Engine nije učitan.');
  }

  function cleanText(value) {
    return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  async function healthCheck() {
    return {
      provider: 'patriasoul-answer-engine',
      endpoint: null,
      externalProvider: false,
      agent: !!global.PatriaSoulAgent,
      retriever: !!global.PatriaSoulKnowledgeRetriever,
      answerEngine: !!global.PatriaSoulAnswerEngine,
      ready: !!global.PatriaSoulAnswerEngine
    };
  }

  global.PatriaSoulAI = Object.freeze({ ask, healthCheck });
})(window);
