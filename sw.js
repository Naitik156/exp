const CACHE_NAME = "Syllabus-tracker-v4";

const STATIC_FILES = [
  "./",
  "./index.html",
  "./login.html",
  "./styles.css",
  "./app.js",
  "./favicon.png",
  "./manifest.json"
];

// Install - pre-cache all static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    }).then(() => self.skipWaiting())
  );
});

// Activate - clean up old caches
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
    ).then(() => self.clients.claim())
  );
});

// Helper: check if URL is a static asset we cache
const isStaticAsset = (url) => {
  try {
    const parsed = new URL(url);
    return STATIC_FILES.some(f => {
      const path = f.replace('./', '/');
      return parsed.pathname === path || parsed.pathname.endsWith(path.replace('/', ''));
    }) || parsed.pathname === '/' || parsed.pathname === '';
  } catch(e) { return false; }
};

// Helper: check if URL is a Firebase/external API call
const isFirebaseOrExternal = (url) => {
  return url.includes('firebase') || 
         url.includes('firestore') || 
         url.includes('googleapis') || 
         url.includes('gstatic') ||
         url.includes('unpkg.com') ||
         url.includes('cdn.jsdelivr') ||
         url.includes('fonts.google') ||
         url.includes('cloudinary');
};

// Fetch handler with intelligent strategy
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // ---- STRATEGY 1: CACHE-FIRST (Stale-While-Revalidate) for static local assets ----
  // Serve from cache instantly, update in background → FAST for slow internet!
  if (isStaticAsset(url) && !url.startsWith('chrome-extension://')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        
        // Fetch in background to update cache silently
        const networkFetch = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => null);

        // Return cached immediately if available (no waiting!)
        if (cached) {
          return cached;
        }

        // No cache yet → wait for network
        const networkResponse = await networkFetch;
        if (networkResponse) return networkResponse;

        // Both failed → offline fallback page
        if (event.request.mode === 'navigate') {
          const offlineFallback = await cache.match('./index.html');
          if (offlineFallback) return offlineFallback;
        }
        return new Response('Offline - Resource not available', { status: 503 });
      })
    );
    return;
  }

  // ---- STRATEGY 2: NETWORK-FIRST for Firebase & external CDN ----
  if (isFirebaseOrExternal(url)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache CDN assets (fonts, libraries) for offline use
          if (response && response.status === 200 && 
              (url.includes('gstatic') || url.includes('fonts.google') || 
               url.includes('unpkg.com') || url.includes('cdn.jsdelivr'))) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return new Response(JSON.stringify({ error: 'Network unavailable', offline: true }), { 
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // ---- STRATEGY 3: NETWORK-FIRST with cache fallback for everything else ----
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          const fallback = await caches.match('./index.html');
          if (fallback) return fallback;
        }
        return new Response('Offline - Resource not available', { status: 503 });
      })
  );
});

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
