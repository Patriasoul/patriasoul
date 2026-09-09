// PatriaSoul AI provider — Supabase Edge Function + Knowledge Base fallback.
// Tajna BazaarLink ključa ostaje isključivo u Supabase Edge Functionu.
(function (global) {
  'use strict';

  const ENDPOINT = 'https://azerctpwfzdivydsxyex.supabase.co/functions/v1/patria-ai';
  const CONTEXT_LIMIT = 8;
  const CONTEXT_CHARS = 24000;

  function textOf(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    return response.text || '';
  }

  function cleanText(value) {
    return String(value || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function compactContext(context) {
    return (Array.isArray(context) ? context : [])
      .slice(0, CONTEXT_LIMIT)
      .map(item => ({
        id: item && item.id || null,
        type: item && item.type || null,
        title: cleanText(item && item.title),
        content: cleanText(item && item.content),
        source: item && item.source || null,
        sourceTitle: item && item.sourceTitle || null,
        sourceDate: item && item.sourceDate || null,
        status: item && item.status || null,
        cityId: item && item.cityId || null,
        relevance: Number(item && item.relevance || 0)
      }))
      .filter(item => item.title || item.content);
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

    if (context.length) {
      return {
        text: 'Prema relevantnim zapisima PatriaSoul baze:\n\n' +
          context.slice(0, 3)
            .map((item, i) => `${i + 1}. ${item.title}\n${cleanText(item.content)}`)
            .join('\n\n'),
        model: 'knowledge-base-fallback',
        provider: 'patriasoul-knowledge',
        context,
        usedKnowledgeBase: true,
        fallback: true
      };
    }

    throw new Error('PatriaSoul AI nije dostupan.');
  }

  async function ask(question, options) {
    const opts = options || {};
    const context = compactContext(opts.knowledge);
    const questionText = String(question || '').trim();

    if (!questionText) {
      throw new Error('Nedostaje pitanje.');
    }

    const payload = {
      question: questionText,
      context,
      model: String(opts.model || 'auto:free')
    };

    if (opts.prompt) payload.prompt = String(opts.prompt);

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let data = null;
      try {
        data = await response.json();
      } catch (_) {
        data = null;
      }

      if (!response.ok) {
        const message = data && data.error
          ? String(data.error)
          : `PatriaSoul AI endpoint vratio HTTP ${response.status}.`;
        throw new Error(message);
      }

      const text = textOf(data).trim();
      if (!text) {
        throw new Error('PatriaSoul AI endpoint je vratio prazan odgovor.');
      }

      return {
        text,
        model: data.model || payload.model,
        provider: data.provider || 'patria-ai',
        context,
        usedKnowledgeBase: context.length > 0,
        confidence: context.length ? 1 : 0,
        sources: context
          .filter(item => item.source || item.sourceTitle)
          .map(item => ({
            id: item.id,
            title: item.title,
            source: item.source,
            sourceTitle: item.sourceTitle,
            sourceDate: item.sourceDate
          })),
        fallback: false
      };
    } catch (error) {
      // Ne rušimo cijeli PatriaSoul ako Edge Function privremeno nije dostupna.
      console.warn('PatriaSoul AI Edge Function nije dostupna; koristi se lokalni KB fallback.', error);
      return localAnswer(questionText, context);
    }
  }

  async function healthCheck() {
    return {
      provider: 'patria-ai',
      endpoint: ENDPOINT,
      externalProvider: true,
      agent: !!global.PatriaSoulAgent,
      retriever: !!global.PatriaSoulKnowledgeRetriever,
      answerEngine: !!global.PatriaSoulAnswerEngine,
      ready: typeof fetch === 'function'
    };
  }

  global.PatriaSoulAI = Object.freeze({ ask, healthCheck });
})(window);
