/**
 * Created by Allen Liu on 2019/9/18.
 */

var express = require('express')
var app = express()


process.on('message',function(){
    process.send('子进程的服务启动完毕')
    app.listen('10086')
})
app.get('/',function(req,res){
    res.send('hello world')
})
