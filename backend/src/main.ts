navigator.serviceWorker.register("service-worker.ts", { scope: "./" });
navigator.serviceWorker.ready.then(() => {
    console.log("Service Worker is running!");
});