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
    '/ai-engine/puter-ai.js',
    '/ai-engine/pitaj-patriasoul-widget.js'
  ];

  const optionalScripts = ['https://js.puter.com/v2/'];

  function load(src){
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src;
      s.async=false;
      s.onload=resolve;
      s.onerror=()=>reject(new Error(src));
      document.head.appendChild(s);
    });
  }

  (async function(){
    try {
      for(const src of requiredScripts) await load(src);
      for(const src of optionalScripts) {
        try { await load(src); } catch(e) { console.info('Puter.js nije dostupan; lokalni AI provider ostaje dostupan ako je konfiguriran.'); }
      }
    } catch(e) {
      console.warn('PatriaSoul AI nije učitan:',e);
    }
  })();
})();
