/**
 * Created by Allen Liu on 2019/12/23.
 */

importScripts('http://localhost:9898/workbox.js');
if (workbox) {
    console.log(`Yay! workbox is loaded11 `);

    workbox.core.setCacheNameDetails({prefix:'lwh cache'})//设置缓存名字
    self.__precacheManifest = [].concat(self.__precacheManifest || [])
    workbox.precaching.suppressWarnings()
    workbox.precaching.precacheAndRoute(self.__precacheManifest,{})



    workbox.precaching.precache([
        '/',
        '/getData',
        '/index.js',
        '/manifest.json'
    ])
    console.log(workbox);
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
        }, workbox.strategies.networkFirst(),
        function(obj){
            return obj.url.pathname==='/getData'
        }, workbox.strategies.networkFirst(),
        function(obj){
            return obj.url.pathname==='/index.js'
        }, workbox.strategies.networkFirst(),
        function(obj){
            return obj.url.pathname==='/manifest.json'
        }, workbox.strategies.networkFirst()
    );



}
else {
    console.log(`Boo! workbox didn't load `);
}