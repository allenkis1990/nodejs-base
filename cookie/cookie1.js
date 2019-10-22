/**
 * Created by Allen Liu on 2019/10/22.
 */
var express = require('express')
var app = express()
var path = require('path')

var fs = require('fs')

var indexPath = path.resolve(__dirname,'./cookie1.html')
app.get('/',function(req,res){
    res.sendFile(indexPath)
})

app.get('/a1',function(req,res){
    // res.setHeader('Set-Cookie','hahah')
    res.send('1234')
})
app.get('/a2',function(req,res){
    // res.setHeader('Set-Cookie','hahah')
    res.send('5678')
})

app.listen('7777','127.0.0.1')