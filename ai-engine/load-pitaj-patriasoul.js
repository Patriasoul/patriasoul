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

  function load(src, attrs){
    const existing = Array.from(document.scripts).find(s => s.src === new URL(src, document.baseURI).href);
    if(existing) return Promise.resolve(existing);
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src;
      s.async=false;
      if(attrs) Object.keys(attrs).forEach(k => s.setAttribute(k, attrs[k]));
      s.onload=()=>resolve(s);
      s.onerror=()=>reject(new Error('Ne mogu učitati: ' + src));
      document.head.appendChild(s);
    });
  }

  function loadPuter(){
    if(window.puter && window.puter.ai && typeof window.puter.ai.chat === 'function') return Promise.resolve(window.puter);
    const existing=document.querySelector('script[data-patriasoul-puter]');
    const scriptPromise=existing ? Promise.resolve(existing) : load(PUTER_SRC, {'data-patriasoul-puter':'true'});
    return scriptPromise.then(()=>new Promise((resolve,reject)=>{
      const started=Date.now();
      (function check(){
        if(window.puter && window.puter.ai && typeof window.puter.ai.chat === 'function') return resolve(window.puter);
        if(Date.now()-started>=15000) return reject(new Error('Puter.js se učitao, ali puter.ai.chat nije postao dostupan.'));
        setTimeout(check,100);
      })();
    }));
  }

  async function bootstrap(){
    window.PatriaSoulAIStatus={provider:'puter',ready:false,stage:'puter'};
    await loadPuter();
    window.PatriaSoulAIStatus={provider:'puter',ready:false,stage:'dependencies'};
    for(const src of requiredScripts) await load(src);
    window.PatriaSoulAIStatus={provider:'puter',ready:false,stage:'widget'};
    await load('/ai-engine/pitaj-patriasoul-widget.js');
    window.PatriaSoulAIStatus=Object.freeze({provider:'puter',ready:true,stage:'ready',error:null});
  }

  bootstrap().catch(e=>{
    window.PatriaSoulAIStatus=Object.freeze({provider:'puter',ready:false,stage:'error',error:e?.message||String(e)});
    console.warn('PatriaSoul AI nije učitan:',e);
  });
})();
