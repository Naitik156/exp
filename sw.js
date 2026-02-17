const CACHE_NAME = "Syllabus-tracker-v3";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./login.html",
  "./styles.css",
  "./app.js",
  "./favicon.png",
  "./manifest.json"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses for static assets
        if (response && response.status === 200 && response.type === 'basic') {
          const url = new URL(event.request.url);
          const isStaticAsset = FILES_TO_CACHE.some(f => url.pathname.endsWith(f.replace('./', '')));
          if (isStaticAsset) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
        }
        return response;
      })
      .catch(() => {
        // Offline fallback: serve from cache
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          // For navigation requests, return index.html as offline fallback
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Offline - Resource not available', { status: 503 });
        });
      })
  );
});
