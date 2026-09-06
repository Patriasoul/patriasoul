// PatriaSoul — compatibility bridge for the legacy "Pitaj PatriaSoul" API.
// The old prototype used the retired Puter provider. Keep this filename
// compatible, but delegate to the current PatriaSoul Agent instead.
(function () {
  'use strict';

  async function ask(question, options = {}) {
    const cleanQuestion = String(question || '').trim();
    if (!cleanQuestion) throw new Error('Upiši pitanje.');

    const agent = window.PatriaSoulAgent;
    if (!agent || typeof agent.ask !== 'function') {
      throw new Error('PatriaSoul AI Agent nije učitan.');
    }

    const result = await agent.ask(cleanQuestion, options);
    return {
      response: result?.text || '',
      text: result?.text || '',
      context: result?.context || [],
      results: result?.results || [],
      model: result?.model || null,
      provider: result?.provider || 'patriasoul-api'
    };
  }

  function responseText(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    if (typeof response.text === 'string') return response.text;
    if (typeof response.response === 'string') return response.response;
    if (typeof response.message?.content === 'string') return response.message.content;
    return JSON.stringify(response);
  }

  window.PatriaSoulAsk = { ask, responseText };
})();
