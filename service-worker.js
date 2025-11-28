const CACHE_VERSION = 'v1';
const CACHE_NAME = `shivakalabs-${CACHE_VERSION}`;
const RUNTIME_CACHE = 'runtime-cache';
const API_CACHE = 'api-cache';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.log('Cache install error:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && !cacheName.includes(RUNTIME_CACHE) && !cacheName.includes(API_CACHE)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API requests - network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(API_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || new Response(
              JSON.stringify({ offline: true, message: 'Request cached' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Static assets - cache first
  if (request.method === 'GET' && 
      (request.destination === 'style' || 
       request.destination === 'script' || 
       request.destination === 'image' ||
       request.url.match(/\.(png|jpg|jpeg|gif|svg|woff|woff2)$/))) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((response) => {
          if (response.ok) {
            const cache = caches.open(RUNTIME_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        });
      })
    );
    return;
  }

  // HTML pages - network first
  if (request.method === 'GET' && request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(RUNTIME_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // Default - network first, cache second
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request);
      })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-payments') {
    event.waitUntil(syncPendingPayments());
  }
});

async function syncPendingPayments() {
  try {
    const db = await openDB();
    const pending = await getPendingPayments(db);
    for (const payment of pending) {
      await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
      });
    }
  } catch (error) {
    console.error('Sync error:', error);
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ShivakalachsDB', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('payments');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getPendingPayments(db) {
  return new Promise((resolve, reject) => {
    const store = db.transaction('payments').objectStore('payments');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
