/**
 * Created by Allen Liu on 2019/10/18.
 * 自己实现一个node的require功能
 * 1.把require传进来的路径变为绝对路径path.resolve
 * 2.根据ext来来处理
 * 3.如果有ext并且.js那么读取文件在文件字符串外把内容包一层使用vm.runInThisContext执行函数自动返回module.exports
 * 4.如果有ext并且.json读到文件内容直接返回module.exports = content
 * 5.如果没有ext递归去尝试.js.json..一直到找到内容否则就抛错
 * 6.如果第二次require相同的模块，就会去找缓存里的就不用再去读文件了
 */

var path = require('path')
var fs = require('fs')
var vm = require('vm')

function Mod(modulePath){
    this.exports = {}
    this.id = modulePath
}

var cacheModule = {}
var exts = ['.js','.json']
var extsIdx = 0
var extUtils = {
    //.js在外面包一层 然后用vm转成js代码
    '.js'(module,fullModPath){
        var content = fs.readFileSync(fullModPath,'utf8')
        var fnStr = [
            '(function(module,exports,__dirname,__filename){',
            content,
            '})'
        ].join('')
        // console.log(fnStr);
        var fn = vm.runInThisContext(fnStr)
        var res = fn.call(module.exports,module,module.exports,__dirname,__filename)
    },
    '.json'(module,fullModPath){
        // console.log('读');
        //.json直接把content赋值给module.exports
        var content = fs.readFileSync(fullModPath,'utf8')
        module.exports = JSON.parse(content)
    }
}
function parseModule(module){
    //如果缓存里有module就直接返回不用再去读取文件了
    var cacheKeys = Object.keys(cacheModule)
    if(cacheKeys.indexOf(module.id)>-1){
        module.exports = cacheModule[module.id].exports
        return
    }


    var ext = path.extname(module.id)
    var fullModPath = path.resolve(__dirname,module.id)
    // console.log(fullModPath);
    if(ext){
        // console.log(ext);
        try{
            extUtils[ext](module,fullModPath)
        }catch(e){
            throw new Error(`无法解析ext为${ext}的文件`)
        }
    }else{
        console.log('没有识别到ext');
        var fileStrArr = fullModPath.split(path.sep) || []
        var dirname = path.dirname(fullModPath)
        var filename = path.basename(fullModPath)
        // console.log(dirname,1133);
        if(fileStrArr.length){
            function tryFindPath(ext){
                try{
                    var absPathname = path.resolve(dirname,filename) + (ext?ext:'')
                    // console.log(absPathname,8);
                    var content = fs.readFileSync(absPathname,'utf8')
                    extUtils[ext](module,absPathname)
                    // console.log(content);
                }catch(e){
                    // filename = fileStrArr[fileStrArr.length-1]
                    // console.log(filename);
                    if(extsIdx>exts.length-1){
                        throw new Error(`无法解析文件路径${fullModPath}`)
                    }
                    // console.log(extsIdx,88);
                    // console.log(path.basename(fullModPath),3322);
                    var tryExtName = exts[extsIdx++]
                    // console.log(tryExtName);
                    tryFindPath(tryExtName)
                    // console.log(e);
                }
            }
            tryFindPath()



        }
    }
    //把处理过的module缓存起来
    cacheModule[module.id] = module
}

function req(modulePath){
    // console.log(fullModPath);
    var mod = new Mod(modulePath)
    parseModule(mod)
    return mod.exports
}

// var a = req('./data/data1.js')
// var a = req('./data/data1.json')
var a = req('./data/data2')
var b = req('./data/data2')
console.log(a);
console.log(b);