// PatriaSoul AI provider
// Public-safe adapter. The local Answer Engine is the primary path.
(function (global) {
  'use strict';

  function config() { return global.PatriaSoulAIConfig || {}; }

  function textOf(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    return response.text || response.output_text || response.message?.content || '';
  }

  function buildPrompt(question, context) {
    const sources = (context || []).map((item, i) =>
      `[${i + 1}] ${item.title}\n${item.content}\nIzvor: ${item.sourceTitle || item.source || 'PatriaSoul baza'}\nStatus: ${item.status}`
    ).join('\n\n');

    return [
      'Ti si PatriaSoul AI, digitalni vodič kroz Hrvatsku i sadržaj portala PatriaSoul.',
      'Odgovaraj na hrvatskom.',
      'Prioritet imaju potvrđeni podaci iz PatriaSoul Knowledge Base.',
      'Ne izmišljaj činjenice. Ako baza nije dovoljna, reci to jasno.',
      '',
      'KONTEKST:',
      sources || 'Nema relevantnog zapisa.',
      '',
      'PITANJE:',
      question
    ].join('\n');
  }

  async function ask(question, options) {
    const opts = options || {};
    const cfg = config();
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

    if (cfg.knowledgeOnlyFallback && context.length) {
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
    const cfg = config();
    return {
      provider: 'patriasoul-answer-engine',
      endpoint: null,
      agent: !!global.PatriaSoulAgent,
      retriever: !!global.PatriaSoulKnowledgeRetriever,
      answerEngine: !!global.PatriaSoulAnswerEngine,
      ready: !!global.PatriaSoulAnswerEngine
    };
  }

  global.PatriaSoulAI = Object.freeze({ ask, buildPrompt, healthCheck });
})(window);
