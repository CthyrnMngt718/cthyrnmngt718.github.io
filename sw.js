// Compatibility upgrade for previously installed versions of the portfolio.
// Clear old caches and unregister so the refreshed static site is served normally.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(key => caches.delete(key)));
  await self.registration.unregister();
  await self.clients.claim();
})()));
