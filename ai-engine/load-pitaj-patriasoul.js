// Global loader for PatriaSoul AI widget.
(function(){
  'use strict';
  const scripts = ['https://js.puter.com/v2/','/ai-engine/quiz-guard.js','/ai-engine/puter-ai.js','/ai-engine/pitaj-patriasoul-widget.js'];
  function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
  (async function(){try{for(const src of scripts) await load(src);}catch(e){console.warn('PatriaSoul AI nije učitan:',e);}})();
})();
