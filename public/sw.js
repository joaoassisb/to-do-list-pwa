self.addEventListener("install", function() {
  console.log("SW instalado");
  caches.open("pwa-v1.1").then(cache => {
    cache.addAll([
      "/",
      "/index.html",
      "/tarefas.html",
      "/estilos/estilos.css",
      "/favicon.ico"
    ]);
  });
});

self.addEventListener("activate", function() {
  console.log("SW ativado");
});
