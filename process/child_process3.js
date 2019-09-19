/**
 * Created by Allen Liu on 2019/9/19.
 */

var os = require('os')
var networkInterfaces =  os.networkInterfaces()
// console.log(networkInterfaces);
var express = require('express')
var app = express()
var path = require('path')
var fork = require('child_process').fork

var childModule

app.get('/',function(req,res){
    res.sendFile(path.resolve('./child_process3.html'))
})

app.get('/startNewService',function(req,res){
    //杀死进程后再开启
    if(childModule){
        childModule.kill()
    }

    childModule = fork('./child3')
    childModule.on('message',function(msg){
        console.log(msg);
        res.send(msg)
    })
    childModule.send('开启子进程')
})

app.get('/closeChildService',function(req,res){
    if(childModule){
        childModule.kill()
    }
    res.send('close success!')
})




var ip = getIp(networkInterfaces)
app.listen('8989',ip)

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