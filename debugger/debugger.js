/**
 * Created by Allen Liu on 2019/9/29.
 */
//使用webstrom断点，run文件使用debug模式 f8下一个断点  f6一行一行  alt+shift+f7进入具体方法  shift+f8跳出

var express = require('express')
var app = express()
var path = require('path')
console.log(123);
app.get('/',function(req,res){
    res.sendFile(path.resolve('./debugger1.html'))
})
var test = require('./test.js')
app.get('/haha',function(req,res){
    res.send('ok')
    console.log(123);
    console.log(123);
    console.log(123);
    test.fn()
    console.log(app)
})


app.listen('9900')