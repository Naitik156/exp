// ✅ Bump this version number whenever you update app.js or styles.css
const CACHE_NAME = "syllabus-tracker-v8";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./login.html",
  "./landing.html",
  "./styles.css",
  "./app.js",
  "./favicon.png",
  "./manifest.json"
];

// ─── INSTALL: Pre-cache all static assets ───────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately — don't wait for old SW to die
  self.skipWaiting();
});

// ─── ACTIVATE: Delete old caches ────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// ─── FETCH: Smart caching strategy ──────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // 1. Firebase / Google APIs → always network-only (never cache auth/db calls)
  if (
    url.hostname.includes("firestore.googleapis.com") ||
    url.hostname.includes("firebase") ||
    url.hostname.includes("identitytoolkit") ||
    url.hostname.includes("securetoken")
  ) {
    return; // let browser handle it normally
  }

  // 2. CDN resources (React, Chart.js, Fonts) → Cache-first with network fallback
  //    These never change for a given URL, so cache them forever
  if (
    url.hostname.includes("unpkg.com") ||
    url.hostname.includes("jsdelivr.net") ||
    url.hostname.includes("fonts.googleapis.com") ||
    url.hostname.includes("fonts.gstatic.com") ||
    url.hostname.includes("cdnjs.cloudflare.com")
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached; // ⚡ instant from cache
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 3. Your own static files (app.js, styles.css, index.html etc.)
  //    → Cache-first, then revalidate in background (Stale-While-Revalidate)
  const isOwnAsset = STATIC_ASSETS.some((f) =>
    url.pathname.endsWith(f.replace("./", ""))
  );

  if (isOwnAsset || url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cached) => {
          // Fetch fresh copy in background regardless
          const networkFetch = fetch(event.request)
            .then((response) => {
              if (response && response.status === 200 && response.type === "basic") {
                cache.put(event.request, response.clone());
              }
              return response;
            })
            .catch(() => null);

          // Return cached instantly if available, else wait for network
          return cached || networkFetch;
        });
      })
    );
    return;
  }

  // 4. Everything else → network with cache fallback
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        if (event.request.mode === "navigate") return caches.match("./index.html");
        return new Response("Offline", { status: 503 });
      })
    )
  );
});
