/* Service worker do Pocket Coach: guarda o app para funcionar offline.
   Ao publicar uma nova versão, troque o número em CACHE. */
const CACHE = 'pocket-coach-v3';
const ASSETS = [
  './', './index.html', './mapa.html', './coach.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png',
  './fonts/fonts.css',
  './fonts/figtree-latin-400-normal.woff2', './fonts/figtree-latin-500-normal.woff2',
  './fonts/figtree-latin-600-normal.woff2', './fonts/figtree-latin-700-normal.woff2',
  './fonts/bricolage-grotesque-latin-500-normal.woff2', './fonts/bricolage-grotesque-latin-700-normal.woff2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))
  );
});
