// Global loader for PatriaSoul AI widget.
(function () {
  'use strict';

  const requiredScripts = [
    '/ai/ollama-config.js',
    '/ai/ollama-client.js',
    '/ai-engine/quiz-guard.js',
    '/ai-engine/knowledge/retriever.js',
    '/ai-engine/agent/tool-registry.js',
    '/ai-engine/agent/router.js',
    '/ai-engine/agent/agent.js',
    '/ai-engine/agent/content-generator.js',
    '/ai-engine/puter-ai.js'
  ];

  function load(src) {
    const existing = Array.from(document.scripts).find(s => s.src === new URL(src, document.baseURI).href);
    if (existing) return Promise.resolve(existing);
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error('Ne mogu učitati: ' + src));
      document.head.appendChild(script);
    });
  }

  async function bootstrap() {
    window.PatriaSoulAIStatus = { provider: 'patriasoul-api', ready: false, stage: 'dependencies' };
    for (const src of requiredScripts) await load(src);
    window.PatriaSoulAIStatus = { provider: 'patriasoul-api', ready: false, stage: 'widget' };
    await load('/ai-engine/pitaj-patriasoul-widget.js');
    window.PatriaSoulAIStatus = Object.freeze({
      provider: 'patriasoul-api',
      ready: true,
      stage: 'ready',
      error: null
    });
  }

  bootstrap().catch(error => {
    window.PatriaSoulAIStatus = Object.freeze({
      provider: 'patriasoul-api',
      ready: false,
      stage: 'error',
      error: error?.message || String(error)
    });
    console.warn('PatriaSoul AI nije učitan:', error);
  });
})();
