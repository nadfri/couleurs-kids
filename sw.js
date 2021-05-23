const cacheName = "files-cache-v1"; //change le nom pour mettre à jour le cache

const contentToCache = ["/", "index.html"];

// Installing Service Worker
self.addEventListener("install", (e) => {
	console.log("Service Worker Installation");
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log("Service Worker-Mise en cache globale");
			return cache.addAll(contentToCache);
		})
	);
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
	e.respondWith(
		caches.match(e.request).then((r) => {
			// console.log("Service Worker-Récupération de la ressource: " + e.request.url);
			return (
				r ||
				fetch(e.request).then((response) => {
					return caches.open(cacheName).then((cache) => {
						// console.log( "Service Worker-Mise en cache de la nouvelle ressource: " +	e.request.url );
						cache.put(e.request, response.clone());
						return response;
					});
				})
			);
		})
	);
});

//Efface l'ancien cache non utilisé
self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (cacheName.indexOf(key) === -1) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});