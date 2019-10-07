
self.addEventListener("install", function () {
  console.log("SW instalado");
  caches.open("pwa-v1.1").then(cache => {
    cache.addAll([
      "/",
      "/index.html",
      "/tarefas.html",
      "/app.js",
      "/estilos/estilos.css",
      "/favicon.ico"
    ]);
  });
});

self.addEventListener("activate", function () {
  console.log("SW ativado");
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function () {
    const cache = await caches.open('pwa-v1.1');
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) return cachedResponse;
    const networkResponse = await fetch(event.request);
    event.waitUntil(
      cache.put(event.request, networkResponse.clone())
    );

    return networkResponse;
  }());
});
