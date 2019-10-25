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
//session存在服务端 缺点占用内存，负载均衡的时候无法找到

var sessionObj = {}
app.get('/a1',function(req,res){
    var cookies = querystring.parse(req.headers.cookie,' ;')
    if(cookies.sessionId&&sessionObj[cookies.sessionId]){
        res.send(`Hello${sessionObj[cookies.sessionId]}`)
    }else{
        var sessionId = 'sid'+new Date().getTime()
        res.setHeader('Set-Cookie',`sessionId=${sessionId}`)
        sessionObj[sessionId] = 'lwh'
        res.send('Hello NewUser')
    }
})

app.listen('3858','127.0.0.1')