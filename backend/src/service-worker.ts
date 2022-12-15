const CACHE = "file-cache"


addEventListener('install', (event: any) => {
    const preCache = async () => {
      const cache = await caches.open('static-v1');
      return cache.addAll([
        '../files/'
      ]);
    };
    event.waitUntil(preCache());
});

// Intercept fetch requests.
self.addEventListener('fetch', (event: any) => {
    // First, satisfy the request with cached content.
    event.respondWith(fetchFromCache(event.request));

    // Then, update the cache.
    event.waitUntil(updateCache(event.request));
});


// Fetches the requested content from the cache.
function fetchFromCache(req: Request) {
    return caches.match(req).then((matching) => {
        if (matching) {
            return matching;
        }

        return fetch(req);
    });
}

// Updates the cache from the server.
function updateCache(req: Request) {
    return caches.open(CACHE).then((cache) => {
        return fetch(req).then((res) => {
            return cache.put(req, res.clone()).then(() => {
                return res;
            });
        });
    });
}