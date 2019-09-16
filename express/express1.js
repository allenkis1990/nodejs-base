/**
 * Created by Allen Liu on 2019/9/16.
 */
/**
 * Created by Allen Liu on 2019/9/15.
 */
var express = require('express')
var app = express()
var path = require('path')



//中间件拦截错误
app.use('/err',function(req,res,next){
    // res.setHeader('aa','11')
    // res.statusCode = '401'
    res.status(500).send("这是err,表示错误");
    // next('err123')
})


app.get('/',function(req,res){
    res.sendFile(path.resolve('./express1.html'))
})
app.get('/hehe',function(req,res){
    res.setHeader('Access-control-Allow-Methods','*')
    res.setHeader('Access-control-Allow-Origin','*')
    res.setHeader('Access-control-Allow-Headers','Content-Type')
    res.send({
        code:'200'
    })
})

app.get('/err',function(req,res){
    res.send('hahahah')
})



app.listen('8081')
