/**
 * Created by Allen Liu on 2019/10/28.
 */

let express = require('./lwhExpress')
let app = express()

app.use('/abc',function(req,res,next){
    req.a =111111
    next()
})

app.get('/abc/a1',function(req,res){
    console.log(req.a);
    res.end('/abc/a1 ........')
})

app.get('/',function(req,res){
    // console.log(req);
    res.end('123')
})


app.get('/a',function(req,res){
    res.end('456')
})
app.get('/favicon.ico',function(req,res){
    res.statusCode = '404'
    res.end('123')
})

app.get('/user/:name/:age',function(req,res){
    console.log(req.a);
    // console.log(req.reqParams);
    res.end(JSON.stringify(req.reqParams))
})

app.listen('5566')