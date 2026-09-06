/* PatriaSoul — lightweight offline shell */
// v2: network-first and AI cache refresh after the PatriaSoul provider migration.
const CACHE='patriasoul-shell-v2';
const SHELL=['/','/index.html','/variables.css','/patriasoul-global.css','/patriasoul-modern.css','/site-navigation.js','/navigation-ux.js','/ai/ollama-config.js','/ai/ollama-client.js','/ai-engine/load-pitaj-patriasoul.js','/ai-engine/quiz-guard.js','/ai-engine/knowledge/retriever.js','/ai-engine/agent/tool-registry.js','/ai-engine/agent/router.js','/ai-engine/agent/agent.js','/ai-engine/agent/content-generator.js','/ai-engine/patria-ai-provider.js','/ai-engine/pitaj-patriasoul-widget.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL).catch(()=>{})).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const u=new URL(event.request.url);
  if(u.origin!==location.origin) return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{});}
    return response;
  }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('/index.html'))));
});