// PatriaSoul AI provider — 100% lokalni Knowledge Base + Answer Engine.
// Nema vanjskog AI API-ja, API ključeva, računa, kvota ni slanja pitanja trećim stranama.
(function (global) {
  'use strict';

  const CONTEXT_LIMIT = 8;
  const CONTEXT_CHARS = 24000;

  function textOf(response) {
    return response && typeof response === 'object' ? String(response.text || '') : String(response || '');
  }

  function cleanText(value) {
    return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function compactContext(context) {
    let chars = 0;
    const result = [];
    for (const item of (Array.isArray(context) ? context : []).slice(0, CONTEXT_LIMIT)) {
      const record = {
        id: item?.id || null,
        type: item?.type || null,
        title: cleanText(item?.title),
        content: cleanText(item?.content),
        source: item?.source || null,
        sourceTitle: item?.sourceTitle || null,
        sourceDate: item?.sourceDate || null,
        status: item?.status || null,
        cityId: item?.cityId || null,
        relevance: Number(item?.relevance || 0)
      };
      const size = record.title.length + record.content.length;
      if (chars + size > CONTEXT_CHARS && result.length) break;
      result.push(record);
      chars += size;
    }
    return result.filter(item => item.title || item.content);
  }

  function localAnswer(question, context) {
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
        fallback: true
      };
    }
    return {
      text: context.length
        ? 'Prema relevantnim zapisima PatriaSoul baze:\n\n' + context.slice(0,3).map((item,i)=>`${i+1}. ${item.title}\n${cleanText(item.content)}`).join('\n\n')
        : 'U PatriaSoul bazi trenutno nema dovoljno potvrđenih podataka za pouzdan odgovor na ovo pitanje.',
      model: 'knowledge-only',
      provider: 'patriasoul-knowledge',
      context,
      usedKnowledgeBase: context.length > 0,
      confidence: context.length ? 0.5 : 0,
      sources: [],
      fallback: true
    };
  }

  async function ask(question, options) {
    const questionText = String(question || '').trim();
    if (!questionText) throw new Error('Nedostaje pitanje.');
    const context = compactContext(options?.knowledge);
    return localAnswer(questionText, context);
  }

  async function healthCheck() {
    return {
      provider: 'patriasoul-local',
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
