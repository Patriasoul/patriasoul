// PatriaSoul — PWA cache sloj s network-first pristupom za svježi sadržaj.
const CACHE='patriasoul-shell-v2';
const SHELL=['/','/index.html','/style.css','/variables.css','/patriasoul-modern.css','/responsive.css','/manifest.json','/site-navigation.js','/patriasoul-profile.js','/levels.js','/badges.js','/profil.html','/rang-lista.html','/brani-svoj-grad.html','/gradovi.html','/quiz.html','/video.html','/galerija.html','/media-data.js','/media.js','/assets/gallery/patriasoul.svg','/assets/gallery/hrvatska.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(fetch(e.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return res}).catch(()=>caches.match(e.request).then(cached=>cached||caches.match('/404.html'))))});
