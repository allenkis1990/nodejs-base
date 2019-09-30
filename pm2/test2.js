/**
 * Created by Allen Liu on 2019/9/30.
 */
console.log('test2')

var express = require('express')
var app = express()

app.get('/',function(req,res){
    res.send('test2')
})

app.listen('9911')