/**
 * Created by Allen Liu on 2019/9/16.
 */

var express = require('express')
var app = express()
var path = require('path')




app.get('/',function(req,res){
    res.sendFile(path.resolve('./express2.html'))
})
app.get('/a',function(req,res){
    res.sendFile(path.resolve('./express2.html'))
})



app.listen('8081')
