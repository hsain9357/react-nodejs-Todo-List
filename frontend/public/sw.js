const STATIC_CATCHED = [
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "apple-touch-icon.png",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon.ico",
  "maskable_icon_x192.png",
  "index.html",
  "https://fonts.googleapis.com/css2?family=Livvic:wght@400;500;600;700;900&display=swap",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("todo-list").then((cache) => cache.addAll(STATIC_CATCHED))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
