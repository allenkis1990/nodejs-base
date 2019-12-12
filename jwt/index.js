/**
 * Created by Allen Liu on 2019/12/12.
 */
//登录成功后接口里jwt设置一下token传给前端，前端存到localStorage里
//前端调用isLogin要带token到接口，isLogin接口验证一下如果对jwt要重新设置一下token并且返回给前端，前端接收到token又要重新存到localStorage里
let express = require('express')
let app = express()
let path = require('path')
let jwt = require('jsonwebtoken')


let url = path.resolve(__dirname,'./index.html')

app.get('/',function(req,res){
    res.sendFile(url)
})
let secret = 'lwh'
let time = 10
app.get('/login',function(req,res){
    let {userName,userPsw} = req.query
    if(userName==='admin'&&userPsw==='a000000'){
        var token = jwt.sign({
            userName:userName,
            id:'001'
        }, secret, { expiresIn: time })
        res.send({
            code:200,
            msg:'登录成功',
            token:token
        })
    }else{
        res.send({
            code:500,
            msg:'账号或密码错误'
        })
    }
})


app.get('/isLogin',function(req,res){
    var t = req.headers.token
    // console.log(req.headers,11);
    jwt.verify(t, secret, function(err, decoded) {
        if(err){
            console.log('err');
            res.send({
                code:500,
                msg:'token校验失败'
            })
        }else{
            var token = jwt.sign({
                userName:decoded.userName,
                id:decoded.id
            }, secret, { expiresIn: time })
            res.send({
                code:200,
                msg:'token校验成功',
                token:token
            })
        }
    });
    // console.log(req.headers);
})

app.listen('9898')