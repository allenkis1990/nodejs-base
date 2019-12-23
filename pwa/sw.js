/**
 * Created by Allen Liu on 2019/12/23.
 */

importScripts('http://localhost:9898/workbox.js');
if (workbox) {
    console.log(`Yay! workbox is loaded `);

    workbox.core.setCacheNameDetails({prefix:'lwh cache'})//设置缓存名字

    self.__precacheManifest = [].concat(self.__precacheManifest || [])
    workbox.precaching.suppressWarnings()
    //一定要加否则离线不可用
    workbox.precaching.precacheAndRoute(self.__precacheManifest,{})



    workbox.precaching.precache([
        '/',
        '/getData',
        '/index.js',
        '/manifest.json',
        '/pika.png',
        '/index.css'
    ])
    //console.log(workbox);
    /**
     * 1.cachefirst 缓存优先
     * 2.cacheonly 仅缓存
     * 3.networkfirst 网络优先
     * 4.networkonly 仅网络
     * 5.StateWhileRevalidate 从缓存取，用网络数据更新缓存
     */

    // console.log(workbox.routing,33);
    // workbox.routing.registerRoute(
    //     /\/$/, workbox.strategies.networkFirst()
    // )
    workbox.routing.registerRoute(
        function(obj){
            return obj.url.pathname==='/'
        }, workbox.strategies.staleWhileRevalidate(),
        function(obj){
            return obj.url.pathname==='/getData'
        }, workbox.strategies.staleWhileRevalidate(),
        function(obj){
            return obj.url.pathname==='/index.js'
        }, workbox.strategies.staleWhileRevalidate(),
        function(obj){
            return obj.url.pathname==='/manifest.json'
        }, workbox.strategies.staleWhileRevalidate(),
        /\.(png|gif|jpg|jepg)/, workbox.strategies.networkFirst(),
        /\.(js|css)/, workbox.strategies.staleWhileRevalidate()

    );


    workbox.skipWaiting();
    workbox.clientsClaim();
}
else {
    console.log(`Boo! workbox didn't load !!!!~~~`);
}