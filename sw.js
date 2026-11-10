/* Service worker do Pocket Coach: guarda o app para funcionar offline.
   Ao publicar uma nova versão, troque o número em CACHE. */
const CACHE = 'pocket-coach-v6';
const ASSETS = [
  './', './index.html', './mapa.html', './coach.html', './rumo-bar.js', './manifest.webmanifest',
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
  /* Páginas: rede primeiro, para uma nova versão chegar logo; sem internet, usa a cópia guardada. */
  if (req.mode === 'navigate' || req.destination === 'document' || req.destination === 'iframe') {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }
  /* Ícones, fontes e demais arquivos: cópia guardada primeiro. */
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => Response.error()))
  );
});
