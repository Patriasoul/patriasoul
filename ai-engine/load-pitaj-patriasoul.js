// Global loader for PatriaSoul AI widget.
(function(){
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

  const PUTER_SRC = 'https://js.puter.com/v2/';

  function load(src){
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src;
      s.async=false;
      s.onload=resolve;
      s.onerror=()=>reject(new Error('Ne mogu učitati: ' + src));
      document.head.appendChild(s);
    });
  }

  function waitForPuter(timeoutMs){
    const timeout = Number(timeoutMs) || 10000;
    const started = Date.now();
    return new Promise((resolve,reject)=>{
      (function check(){
        if(window.puter && window.puter.ai && typeof window.puter.ai.chat === 'function'){
          resolve(window.puter);
          return;
        }
        if(Date.now() - started >= timeout){
          reject(new Error('Puter.js je učitan, ali puter.ai.chat nije postao dostupan.'));
          return;
        }
        setTimeout(check, 100);
      })();
    });
  }

  (async function(){
    try {
      // Load Puter explicitly and wait for its public API to become available.
      // This avoids a race where the CDN script has finished loading but the
      // global `puter.ai` object is initialized a moment later.
      await load(PUTER_SRC);
      await waitForPuter(10000);

      for(const src of requiredScripts) await load(src);

      // Load the widget last so its first interaction always sees the provider state.
      await load('/ai-engine/pitaj-patriasoul-widget.js');

      window.PatriaSoulAIStatus = Object.freeze({
        provider: 'puter',
        ready: true
      });
    } catch(e) {
      window.PatriaSoulAIStatus = Object.freeze({
        provider: 'puter',
        ready: false,
        error: e && e.message ? e.message : String(e)
      });
      console.warn('PatriaSoul AI nije učitan:', e);
    }
  })();
})();
