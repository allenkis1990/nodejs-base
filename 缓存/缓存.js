/**
 * Created by Allen Liu on 2019/10/22.
 */
var express = require('express')
var app = express()
var path = require('path')
var http = require('http')
var querystring = require('querystring')
var url = require('url')
// console.log(querystring);
var fs = require('fs')
//浏览器千万别开disable cache否则缓存什么的全部都不生效
var server = http.createServer(function(req,res){

    var u = url.parse(req.url,true)
    // console.log(u.pathname);
    if(u.pathname==='/'){
        // console.log(123);
        res.setHeader('Content-Type','text/html;charset=utf-8')
        var rs = fs.createReadStream(path.resolve(__dirname,'缓存.html'))
        // console.log(rs);
        rs.pipe(res)
    }

    if(u.pathname==='/a1.js'){
        var rs = fs.createReadStream(path.resolve(__dirname,'a1.js'))
        var fileStat = fs.statSync(path.resolve(__dirname,'a1.js'))
        // console.log(fileStat.ctime);
        res.setHeader('Content-Type','application/javascript;charset=utf-8')
        //强制缓存
        // res.setHeader('Cache-Control',`max-age=10`)
        // res.setHeader('Expires',new Date(new Date().getTime()+10000).toGMTString())



        //last-modified
        // if(req.headers['if-modified-since']&&req.headers['if-modified-since']===fileStat.ctime.toGMTString()){
        //     res.statusCode='304'
        // }else{
        //     res.setHeader('Last-Modified',fileStat.ctime.toGMTString())
        //     res.statusCode='200'
        // }
        // md5



        //etag
        fs.readFile(path.resolve(__dirname,'a1.js'),'utf-8',function(e,data){
            const crypto = require('crypto');
            const hash = crypto.createHash('md5');

            // 可任意多次调用update():
            hash.update(data);

            var tag = hash.digest('hex')
            if(req.headers['if-none-match']&&req.headers['if-none-match']===tag){
                res.statusCode='304'
            }else{
                res.setHeader('Etag',tag)
            }
            res.end(data)
        })


        // rs.pipe(res)
    }
})
server.listen('3859','127.0.0.1')