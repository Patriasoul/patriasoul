// Global loader for PatriaSoul AI widget.
(function () {
  'use strict';

  const AI_VERSION = '48';
  const requiredScripts = [
    '/ai/ollama-config.js',
    '/ai/ollama-client.js',
    '/ai-engine/quiz-guard.js',
    '/ai-engine/knowledge/retriever.js',
    '/ai-engine/agent/tool-registry.js',
    '/ai-engine/agent/router.js',
    '/ai-engine/agent/agent.js',
    '/ai-engine/agent/content-generator.js',
    '/ai-engine/patria-ai-provider.js'
  ];

  function load(src) {
    const url = src + (src.includes('?') ? '&' : '?') + 'psai=' + AI_VERSION;
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = false;
      script.defer = false;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error('Ne mogu učitati: ' + src));
      document.head.appendChild(script);
    });
  }

  function verifyDependencies() {
    const checks = [
      ['PatriaSoulAIConfig', window.PatriaSoulAIConfig],
      ['PatriaSoulKnowledgeRetriever', window.PatriaSoulKnowledgeRetriever],
      ['PatriaSoulAgentRouter', window.PatriaSoulAgentRouter],
      ['PatriaSoulAgentTools', window.PatriaSoulAgentTools],
      ['PatriaSoulAgent', window.PatriaSoulAgent],
      ['PatriaSoulAI', window.PatriaSoulAI]
    ];
    const missing = checks.filter(([name, value]) => !value).map(([name]) => name);
    if (missing.length) throw new Error('Nisu učitane AI komponente: ' + missing.join(', '));
  }

  async function bootstrap() {
    window.PatriaSoulAIStatus = { provider: 'patriasoul-api', ready: false, stage: 'dependencies', version: AI_VERSION };
    for (const src of requiredScripts) await load(src);
    verifyDependencies();
    window.PatriaSoulAIStatus = { provider: 'patriasoul-api', ready: false, stage: 'widget', version: AI_VERSION };
    await load('/ai-engine/pitaj-patriasoul-widget-v2.js');
    window.PatriaSoulAIStatus = Object.freeze({ provider: 'patriasoul-api', ready: true, stage: 'ready', version: AI_VERSION, error: null });
  }

  window.PatriaSoulAIReady = bootstrap().catch(error => {
    const message = error?.message || String(error);
    window.PatriaSoulAIStatus = Object.freeze({ provider: 'patriasoul-api', ready: false, stage: 'error', version: AI_VERSION, error: message });
    console.warn('[PatriaSoul AI] Loader:', message);
    throw error;
  });
})();
