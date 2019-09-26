/**
 * Created by Allen Liu on 2019/9/19.
 */

var express = require('express')
var app = express()
var os = require('os')
var networkInterfaces =  os.networkInterfaces()
var ip = getIp(networkInterfaces)
console.log(process.pid,'子进程ID');
process.on('message',function(msg){
    console.log(msg,8888);
    process.send(ip+':10086')
    app.get('/',function(req,res){
        res.send('子进程开启完毕')
    })
})




process.on('exit',function(){
    console.log('退出子进程');
})

function getIp(obj){
    var res = ''
    for(let i in obj){
        var val = obj[i]
        val.forEach(function(item){
            if(item.family==='IPv4'&&item.address!=='127.0.0.1'){
                res = item.address
            }
        })
        if(res){
            return res
        }
    }
}
app.listen('10086',ip,function(){
    console.log('启动子进程服务成功')
})