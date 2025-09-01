self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('summary-store').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/assets/manifest.json',
        '/assets/icons/icon-192x192.png',
        '/assets/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request).then(function(response) {
        return response || caches.match('/offline.html');
      });
    })
  );
});
