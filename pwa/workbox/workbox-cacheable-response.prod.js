/**
 * Created by Allen Liu on 2019/12/24.
 */
this.workbox=this.workbox||{},this.workbox.cacheableResponse=function(t){"use strict";try{self.workbox.v["workbox:cacheable-response:3.3.0"]=1}catch(t){}class s{constructor(t={}){this.t=t.statuses,this.s=t.headers}isResponseCacheable(t){let s=!0;return this.t&&(s=this.t.includes(t.status)),this.s&&s&&(s=Object.keys(this.s).some(s=>t.headers.get(s)===this.s[s])),s}}return t.CacheableResponse=s,t.Plugin=class{constructor(t){this.e=new s(t)}cacheWillUpdate({response:t}){return this.e.isResponseCacheable(t)?t:null}},t}({});

//# sourceMappingURL=workbox-cacheable-response.prod.js.map