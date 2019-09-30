/**
 * Created by Allen Liu on 2019/9/30.
 */
console.log('test1')
// console.log(process.env.NODE_ENV);
var express = require('express')
var app = express()

app.get('/',function(req,res){
    res.send('test1')
})

app.listen('9910')