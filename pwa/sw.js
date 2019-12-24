/**
 * Created by Allen Liu on 2019/12/23.
 */

importScripts('http://localhost:9898/workbox/workbox.js');
if (workbox) {

    console.log(`Yay! workbox is loaded `);
    //设置引用插件的基路径，指向本地的workbox文件夹
    workbox.setConfig({
        modulePathPrefix: '/workbox/'
    });
    //每次修改资源都要更新缓存的名字
    let CACHE_NAME = 'lwh cache1'
    workbox.core.setCacheNameDetails({
        prefix: CACHE_NAME
        //suffix: 'v2',
        //precache: 'install-time',
        //runtime: 'run-time',
        //googleAnalytics: 'ga'
    })//设置缓存名字

    self.__precacheManifest = [].concat(self.__precacheManifest || [])
    workbox.precaching.suppressWarnings()
    //一定要加否则离线不可用
    workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
    //跳过激活等待
    workbox.skipWaiting();

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
     * 1.cacheFirst 缓存优先
     * 2.cacheOnly 仅缓存
     * 3.networkFirst 网络优先
     * 4.networkOnly 仅网络
     * 5.staleWhileRevalidate 从缓存取，用网络数据更新缓存
     */


    //缓存路由策略
    workbox.routing.registerRoute(
        function (obj) {
            return obj.url.pathname === '/'
        }, workbox.strategies.networkFirst(),
        function (obj) {
            return obj.url.pathname === '/getData'
        }, workbox.strategies.networkFirst(),
        function (obj) {
            return obj.url.pathname === '/index.js'
        }, workbox.strategies.networkFirst(),
        function (obj) {
            return obj.url.pathname === '/manifest.json'
        }, workbox.strategies.networkFirst(),
        /\.(png|gif|jpg|jepg)/, workbox.strategies.networkFirst(),
        /\.(js|css)/, workbox.strategies.networkFirst()
    );

    self.addEventListener("activate", () => {
        //删除低版本的缓存
        caches.keys().then((keys)=>{
            keys.forEach((key)=>{
                //如果不是当前版本的缓存就删除
                if(key!==CACHE_NAME){
                    caches.delete(key)
                }
            })
        })
        //生产缓存列表
        workbox.clientsClaim();
    })

}
else {
    console.log(`Boo! workbox didn't load !!!!~~~`);
}