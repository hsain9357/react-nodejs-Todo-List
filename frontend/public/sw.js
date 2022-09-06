importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|svg|json|js|jsx|html|css|woff|mp3)$/,
  new workbox.strategies.NetworkFirst()
);
