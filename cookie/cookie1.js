/**
 * Created by Allen Liu on 2019/10/22.
 */
var express = require('express')
var app = express()
var path = require('path')
var querystring = require('querystring')

// console.log(querystring);
var fs = require('fs')

var indexPath = path.resolve(__dirname,'./cookie1.html')
app.get('/',function(req,res){
    res.sendFile(indexPath)
})

//cookie存在客户端，但是暴露在外面相对不安全
app.get('/a1',function(req,res){
    //设置了httpOnly=true后在浏览器里就无法找到这个cookie但是会发送给服务端
    res.setHeader('Set-Cookie','haha=fuck;httpOnly=true')
    //expires为cookie有效期要用GMT
    res.setHeader('Set-Cookie','hehe=shit;expires='+new Date(new Date().getTime()+10000).toGMTString())
    var cookies = querystring.parse(req.headers.cookie,' ;')
    console.log(cookies.haha);
    res.send('1234')
})
app.get('/a2',function(req,res){
    // res.setHeader('Set-Cookie','hahah')
    res.send('5678')
})

app.listen('3857','127.0.0.1')