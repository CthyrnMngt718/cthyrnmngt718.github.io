const VERSION = 'cathyrine-portfolio-v5-2-personal-url-fix';
const CACHE_PREFIX = 'cathyrine-portfolio-';
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;

const SHELL_ASSETS = [
  '/', '/index.html', '/offline.html', '/resume.html', '/site.webmanifest',
  '/favicon.ico', '/favicon-96x96.png', '/apple-touch-icon.png',
  '/assets/css/tokens.css', '/assets/css/base.css', '/assets/css/components.css', '/assets/css/sections.css', '/assets/css/responsive.css',
  '/assets/js/app.js', '/assets/js/navigation.js', '/assets/js/motion.js', '/assets/js/roleLens.js', '/assets/js/capabilities.js', '/assets/js/projects.js', '/assets/js/lab.js', '/assets/js/recruiter.js', '/assets/js/contact.js', '/assets/js/pwa.js',
  '/assets/data/profile.js', '/assets/data/projects.js',
  '/assets/images/cm-mark-192.webp', '/assets/images/cm-mark.webp', '/assets/images/profile-portrait.webp', '/assets/images/signature.png'
];

const isPersonalPortfolioPath = (pathname) => {
  if (pathname === '/' || pathname === '/index.html' || pathname === '/offline.html' || pathname === '/resume.html' || pathname === '/site.webmanifest') return true;
  if (pathname.startsWith('/assets/')) return true;
  if (pathname.startsWith('/work/')) return true;
  if (/^\/(?:favicon(?:-96x96)?\.(?:ico|png)|apple-touch-icon\.png|web-app-manifest-(?:192x192|512x512)\.png)$/.test(pathname)) return true;
  return false;
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL)
      .then(cache => Promise.allSettled(SHELL_ASSETS.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== SHELL && key !== RUNTIME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // IMPORTANT: this root-level personal portfolio service worker must not
  // intercept TechGroup Solutions or any other GitHub Pages project site.
  if (!isPersonalPortfolioPath(url.pathname)) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(RUNTIME).then(cache => cache.put(req, clone));
          return res;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match('/offline.html')))
    );
    return;
  }

  if (/\.(?:png|jpg|jpeg|webp|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(cached => {
        const fresh = fetch(req)
          .then(res => {
            if (res.ok) caches.open(RUNTIME).then(cache => cache.put(req, res.clone()));
            return res;
          })
          .catch(() => cached);
        return cached || fresh;
      })
    );
    return;
  }

  if (/\.pdf$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res.ok) caches.open(RUNTIME).then(cache => cache.put(req, res.clone()));
        return res;
      }))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      if (res.ok) caches.open(RUNTIME).then(cache => cache.put(req, res.clone()));
      return res;
    }))
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
