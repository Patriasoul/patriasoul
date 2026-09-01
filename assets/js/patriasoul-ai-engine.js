/*
 * PatriaSoul AI Engine
 * Provider-agnostic client layer.
 * IMPORTANT: API keys never belong in this file or in frontend code.
 * The browser talks only to a server-side /api/ai endpoint.
 */
(function (window) {
  'use strict';

  const DEFAULTS = {
    endpoint: '/api/ai',
    timeoutMs: 30000,
    maxInputChars: 12000,
    maxOutputTokens: 1200
  };

  const engine = {
    config: Object.assign({}, DEFAULTS),

    configure(options) {
      this.config = Object.assign({}, DEFAULTS, options || {});
      return this;
    },

    async request(task, input, options) {
      const cfg = Object.assign({}, this.config, options || {});
      if (!task) throw new Error('AI task is required.');
      if (typeof input !== 'string' || !input.trim()) throw new Error('AI input is required.');
      if (input.length > cfg.maxInputChars) throw new Error('AI input exceeds the configured limit.');

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
      try {
        const response = await fetch(cfg.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({
            task,
            input: input.trim(),
            maxOutputTokens: cfg.maxOutputTokens
          }),
          signal: controller.signal
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'AI service unavailable.');
        return data;
      } finally {
        clearTimeout(timer);
      }
    },

    // Editorial helpers used by future news automation.
    summarizeArticle(article, options) {
      return this.request('news_summary', article, options);
    },
    rewriteNews(article, options) {
      return this.request('news_rewrite', article, options);
    },
    factCheckDraft(article, options) {
      return this.request('news_fact_check', article, options);
    },
    createQuiz(topic, options) {
      return this.request('quiz_questions', topic, options);
    },
    explainHistory(topic, options) {
      return this.request('history_explain', topic, options);
    },
    assistant(question, options) {
      return this.request('assistant', question, options);
    }
  };

  window.PatriaSoulAI = engine;
})(window);
