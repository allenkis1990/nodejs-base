/**
 * Created by Allen Liu on 2019/10/20.
 */

var express = require('express')
var app = express()


app.use('/a', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    //如果要携带cookie Origin不能设置为*
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8081");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "lwh,Range");
    next();
});

app.get('/',function(req,res){
    res.send('12345678')
})
app.get('/a',function(req,res){
    // res.statusCode='206'
    res.setHeader('Set-Cookie','hahahkkkk')
    res.send('fuck you mouse')
})

app.listen('8899','127.0.0.1')