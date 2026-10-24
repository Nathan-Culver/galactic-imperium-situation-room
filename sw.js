const CACHE='galactic-imperium-v0.1.1';
const FILES=['./','./index.html','./styles.css?v=0.1.1','./app.js?v=0.1.1','./engine.js?v=0.1.1','./ai-worker.js?v=0.1.1','./manifest.webmanifest','./assets/emblem.svg','./docs/IMPLEMENTATION.md'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('galactic-imperium-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request)));});
