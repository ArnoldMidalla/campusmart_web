const CACHE_NAME = "campus-mart-v1";

const STATIC_ASSETS = [
  "/",
  "/search",
  "/cart",
  "/manifest.json",
  // to be replaced with main icons
  // "/icons/icon-192.png",
  // "/icons/icon-512.png"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate
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

// Fetch
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const request = event.request;
  const url = new URL(request.url);

  // IMAGE REQUESTS — CACHE FIRST
  if (
    request.destination === "image" ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open("campus-mart-images").then((cache) => {
            cache.put(request, clone);
          });
          return response;
        });
      })
    );
    return;
  }

  // 🌐 PAGE / API REQUESTS — NETWORK FIRST
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open("campus-mart-pages").then((cache) => {
          cache.put(request, clone);
        });
        return response;
      })
      .catch(() => caches.match(request))
  );
});

