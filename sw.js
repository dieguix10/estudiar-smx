/* Service worker d'Estudiar SMX.
   La web funciona com una app instal·lable i manté el material a mà sense connexió. */
var CACHE_NAME = 'estudiar-smx-v1';

var CORE = [
  './',
  './index.html',
  './index.es.html',
  './asignaturas/ipo/index.html',
  './asignaturas/ipo/index.es.html',
  './asignaturas/ipo/unidad-1.html',
  './asignaturas/ipo/unidad-1.es.html',
  './asignaturas/ceac/index.html',
  './asignaturas/ceac/index.es.html',
  './asignaturas/ceac/unidad-1.html',
  './asignaturas/ceac/unidad-1.es.html',
  './asignaturas/sofc/index.html',
  './asignaturas/sofc/index.es.html',
  './asignaturas/sofc/unidad-1.html',
  './asignaturas/sofc/unidad-1.es.html',
  './assets/css/styles.css',
  './assets/js/lang.js',
  './assets/js/pwa.js',
  './assets/js/i18n.js',
  './assets/js/units.js',
  './assets/js/units-ca.js',
  './assets/js/portal.js',
  './assets/js/app.js',
  './assets/js/data.js',
  './assets/js/data-ca.js',
  './assets/js/data-ceac.js',
  './assets/js/data-ceac-ca.js',
  './assets/js/data-sofc.js',
  './assets/js/data-sofc-ca.js',
  './manifest.json',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png'
];

function updateCache(request, response) {
  if (!response || !response.ok) return Promise.resolve();
  var copy = response.clone();
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.put(request, copy);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(CORE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(function (response) {
        if (!response || !response.ok) throw new Error('Network response was not ok');
        event.waitUntil(updateCache(request, response));
        return response;
      }).catch(function () {
        return caches.match(request).then(function (hit) {
          return hit || caches.match('./index.html');
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (hit) {
      if (hit) {
        event.waitUntil(
          fetch(request)
            .then(function (response) { return updateCache(request, response); })
            .catch(function () { /* Sense xarxa, es manté la versió desada. */ })
        );
        return hit;
      }
      return fetch(request).then(function (response) {
        event.waitUntil(updateCache(request, response));
        return response;
      }).catch(function () {
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
