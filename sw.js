const CACHE="capullo-v12";
const ASSETS=["/app/","/app/index.html","/app/manifest.json"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>n!==CACHE?caches.delete(n):null))));
  self.clients.claim();
});
self.addEventListener("fetch",e=>{
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
