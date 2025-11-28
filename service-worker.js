const CACHE_VERSION = 'v2';
const CACHE_NAME = `shivakalabs-${CACHE_VERSION}`;
const RUNTIME_CACHE = 'runtime-cache-v2';
const API_CACHE = 'api-cache-v2';

// All assets to cache on install for offline-first
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/security.js',
  'https://cdn.tailwindcss.com',
  'https://js.paystack.co/v1/inline.js'
];

// Install event - cache all critical assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching core assets');
      return Promise.all(
        ASSETS_TO_CACHE.map(url => {
          return fetch(url, { cache: 'no-cache' })
            .then(response => {
              if (response.ok) return cache.put(url, response);
            })
            .catch(err => console.log('Failed to cache:', url, err));
        })
      );
    }).catch(err => console.error('Install error:', err))
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && !cacheName.includes(RUNTIME_CACHE) && !cacheName.includes(API_CACHE)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - smart caching strategy for offline-first
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and cross-origin
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }

  // API requests - network-first with offline fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request, { timeout: 5000 })
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
              JSON.stringify({ offline: true, message: 'Cached response' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Static assets (JS, CSS, images) - cache-first for instant loading
  if (request.method === 'GET' && 
      (request.destination === 'style' || 
       request.destination === 'script' || 
       request.destination === 'image' ||
       request.url.match(/\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/))) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        
        return fetch(request, { timeout: 5000 }).then((response) => {
          if (response.ok) {
            const cache = caches.open(RUNTIME_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        }).catch(() => {
          // Return placeholder for missing images
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#ddd" width="100" height="100"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
          return new Response('Offline - Asset unavailable', { status: 503 });
        });
      })
    );
    return;
  }

  // HTML pages - network-first with cache fallback
  if (request.method === 'GET' && request.destination === 'document') {
    event.respondWith(
      fetch(request, { timeout: 5000 })
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

  // All other requests - network first, fall back to cache
  event.respondWith(
    fetch(request, { timeout: 5000 })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Background sync for payments
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

// Message handler for manual cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
