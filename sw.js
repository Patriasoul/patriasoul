// PatriaSoul — PWA cache layer.
// Network-first: the live site always wins; cache is only a fallback when offline.
const CACHE = 'patriasoul-shell-v3';
const SHELL = ['/', '/index.html', '/404.html', '/manifest.json', '/patriasoul-global.css', '/patriasoul-modern.css', '/style.css', '/responsive.css', '/site-navigation.js', '/logo-navigation.css', '/pwa.js', '/gradovi.html', '/gradovi.js', '/grad.html', '/quiz.html', '/quiz.js', '/quiz.css', '/brani-svoj-grad.html', '/brigade.html', '/brigade.js', '/domovina.html', '/povijest.html', '/bastina.html', '/branitelji.html', '/postrojbe.html', '/operacije.html', '/spomenici.html', '/vjera.html', '/vijesti.html', '/video.html', '/galerija.html', '/rang-lista.html', '/profil.html'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL).catch(() => undefined)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) return;
  event.respondWith(fetch(request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => undefined); }
    return response;
  }).catch(() => caches.match(request).then(cached => cached || caches.match('/404.html'))));
});
