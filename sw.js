/* Vash: funziona anche senza internet. Cambia CACHE quando cambi le icone o il manifest. */
const CACHE='vash-1.0.0';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!=='vash-runtime').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET')return;
  const u=new URL(req.url);
  if(req.mode==='navigate'){
    /* la pagina: prima la versione più recente dalla rete, se non c'è internet quella salvata */
    e.respondWith((async()=>{
      try{
        const ctl=new AbortController(), t=setTimeout(()=>ctl.abort(),5000);
        const r=await fetch(u.origin+u.pathname,{cache:'no-cache',credentials:'same-origin',signal:ctl.signal}); clearTimeout(t);
        if(r.ok){const c=await caches.open(CACHE);await c.put('./index.html',r.clone())}
        return r;
      }catch(err){return (await caches.match('./index.html'))||(await caches.match('./'))||Response.error()}
    })());
    return;
  }
  if(u.origin===location.origin){
    if(u.pathname.endsWith('version.json'))return;
    e.respondWith(caches.match(req).then(r=>r||fetch(req)));
    return;
  }
  if(/(^|\.)fonts\.(googleapis|gstatic)\.com$|^cdnjs\.cloudflare\.com$/.test(u.hostname)){
    /* caratteri e lettore pdf: dalla copia salvata, aggiornata in background */
    e.respondWith(caches.open('vash-runtime').then(async c=>{
      const hit=await c.match(req);
      const net=fetch(req).then(r=>{if(r.ok||r.type==='opaque')c.put(req,r.clone());return r}).catch(()=>hit);
      return hit||net;
    }));
  }
});
