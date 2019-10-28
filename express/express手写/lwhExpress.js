/**
 * Created by Allen Liu on 2019/10/28.
 */

let http = require('http')
let url = require('url')

var routerFns = []
module.exports = function(){
    var app = {
        get(path,handler){
            routerFns.push({
                path:path,
                method:'get',
                handler:handler
            })
        },
        listenHandler(req,res){
            var routerIndex = 0
            if(routerIndex>routerFns.length-1){
                return
            }
            function next(){
                let router = routerFns[routerIndex++]
                let requestMethod = req.method.toLowerCase()
                let urlObj = url.parse(req.url)
                if(urlObj.pathname===router.path&&requestMethod===router.method){
                    return router.handler(req,res)
                }else if(requestMethod===router.method&&router.path.includes(':')){
                    // /user/:name/:age
                    var paramsReg = /:([^\/]*)/g
                    var args = []
                    var routerRegStr = router.path.replace(paramsReg,function(){
                        // console.log(arguments);
                        args.push(arguments[1])//name age
                        //return要换的字符串
                        return '([^\/]*)'
                    })
                    var routerReg  = new RegExp(routerRegStr)//不能加g加了就匹配不出了只能匹配出匹配到的字符串

                    var match = urlObj.pathname.match(routerReg)
                    if(match){
                        var [,...list] = urlObj.pathname.match(routerReg)//lwh 18
                        // console.log(args,list);
                        //['name','age'] ['lwh',18] ===>  {name:'lwh',age:18}
                        var reqParams = args.reduce(function(result,cur,idx){
                            result[cur] = list[idx]
                            return result
                        },{})
                        req.reqParams = reqParams
                        return router.handler(req,res)
                    }
                }

                next()
            }
            next()
        },
        listen(){
            http.createServer(this.listenHandler).listen(...arguments)
        }
    }

    return app
}