/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
<<<<<<< HEAD
  "http://192.168.200.200:8080/HomeTesting/precache-manifest.d37a3620739fa3d407be67739ae90af2.js"
=======
  "http://192.168.200.200:8080/HomeTesting/precache-manifest.0c28c6d9e1ce0f7a541eb3c1fabc6a99.js"
>>>>>>> 6265300c330bfbe8c8b91e9d82c56cdee99753be
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("http://192.168.200.200:8080/HomeTesting/index.html"), {
  
  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
});
