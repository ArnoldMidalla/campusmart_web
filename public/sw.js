const CACHE_NAME = "campusmart-v2";
const OFFLINE_URL = "/offline";

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  OFFLINE_URL,
];

// Install - Cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch - Strategy: Stale-While-Revalidate with Offline Fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const request = event.request;
  const url = new URL(request.url);

  // 1. STATIC ASSETS & IMAGES — Cache First / Stale-While-Revalidate
  if (
    request.destination === "image" ||
    request.destination === "font" ||
    request.destination === "style" ||
    request.destination === "script" ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|woff2)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networked = fetch(request)
          .then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
          .catch(() => cached);

        return cached || networked;
      })
    );
    return;
  }

  // 2. PAGES — Network First with Offline Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        // If it's a page request and not in cache, show offline page
        if (request.mode === "navigate") {
          return caches.match(OFFLINE_URL);
        }

        return null;
      })
  );
});

