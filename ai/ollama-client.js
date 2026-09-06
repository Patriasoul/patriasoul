/* PatriaSoul AI — Ollama client
 * Local-only helper. It does not expose Ollama to the public internet.
 */
(function (global) {
  'use strict';

  const DEFAULT_BASE_URL = 'http://127.0.0.1:11434';

  async function chat(message, options) {
    const opts = options || {};
    const baseUrl = (opts.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
    const model = opts.model;

    if (!model) {
      throw new Error('PatriaSoul AI: nije odabran Ollama model.');
    }

    if (!message || !String(message).trim()) {
      throw new Error('PatriaSoul AI: poruka je prazna.');
    }

    const response = await fetch(baseUrl + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: String(message) }],
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error('Ollama nije dostupna (' + response.status + ').');
    }

    const data = await response.json();
    return data && data.message ? data.message.content : '';
  }

  global.PatriaSoulOllama = { chat: chat };
})(window);
