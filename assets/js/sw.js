// ============================================
// SERVICE WORKER - Stale-While-Revalidate Strategy
// ============================================

const CACHE_NAME = 'cathyrine-portfolio-v2';
const ASSETS = [
    '/',
    '/index.html',
    '/projects.html',
    '/style.css',
    '/script.js',
    '/1000014492.jpg',
    '/Signature.png',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/site.webmanifest',
    '/manifest.json'
];

// ============================================
// INSTALL - Cache assets immediately
// ============================================
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching assets...');
                return cache.addAll(ASSETS);
            })
            .then(() => {
                console.log('[SW] Assets cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Install failed:', error);
            })
    );
});

// ============================================
// ACTIVATE - Clean old caches & take control
// ============================================
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Activated and claiming clients');
            return self.clients.claim();
        })
    );
});

// ============================================
// FETCH - Stale-While-Revalidate
// ============================================
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Skip non-GET requests, browser extensions, and external resources
    if (request.method !== 'GET') return;
    if (url.origin !== self.location.origin) return;

    // Special handling for HTML navigation (SPA)
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache the fresh HTML
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, clone);
                    });
                    return response;
                })
                .catch(() => {
                    // Offline: serve cached index.html
                    return caches.match('/index.html')
                        .then((cached) => {
                            if (cached) return cached;
                            // Ultimate fallback
                            return new Response(
                                `<html>
                                    <head><title>Offline</title></head>
                                    <body style="background:#070a08;color:#e8f5ed;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center;padding:20px;">
                                        <div>
                                            <h1 style="color:#00ffab;">🔌 Offline</h1>
                                            <p style="color:#9ab8aa;">You're offline. Please check your connection.</p>
                                            <p style="color:#9ab8aa;font-size:0.8rem;">Visit the <a href="/" style="color:#00ffab;">homepage</a> to see cached content.</p>
                                        </div>
                                    </body>
                                </html>`,
                                { headers: { 'Content-Type': 'text/html' } }
                            );
                        });
                })
        );
        return;
    }

    // ============================================
    // STALE-WHILE-REVALIDATE for assets (CSS, JS, images)
    // ============================================
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Fetch fresh version in background (if online)
                const fetchPromise = fetch(request)
                    .then((networkResponse) => {
                        // Update cache with fresh response
                        if (networkResponse && networkResponse.status === 200) {
                            const clone = networkResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, clone);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed, just return cached (if available)
                        // If cached is null, we return a generic error
                        return null;
                    });

                // Return cached response immediately (stale)
                if (cachedResponse) {
                    // Revalidate in background
                    fetchPromise.catch(() => {});
                    return cachedResponse;
                }

                // If not in cache, wait for network
                return fetchPromise
                    .then((response) => {
                        if (response) return response;
                        // Fallback for uncached assets when offline
                        if (request.url.match(/\.(jpg|png|gif|svg|webp)$/)) {
                            return new Response(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                                    <rect width="400" height="300" fill="#0c110e"/>
                                    <text x="200" y="150" font-family="sans-serif" font-size="24" fill="#9ab8aa" text-anchor="middle">
                                        🖼️ Image Unavailable
                                    </text>
                                    <text x="200" y="180" font-family="sans-serif" font-size="14" fill="#5a7a6a" text-anchor="middle">
                                        Check your connection
                                    </text>
                                </svg>`,
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                        // Generic fallback
                        return new Response('Offline – content unavailable', { status: 503 });
                    });
            })
    );
});

// ============================================
// MESSAGE HANDLER - For skipWaiting from client
// ============================================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
