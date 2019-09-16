/**
 * Created by Allen Liu on 2019/9/15.
 */
var express = require('express')
var app = express()
var path = require('path')
var formdata = require('formidable');
var fs = require('fs')
function onData(req,cb) {
    var form = new formdata.IncomingForm();
    var obj = {
        files:{},
        data:{}
    }
    form.on('field', function (name, value) {
        obj.data[name] = value;//这里提取的是键值对数据
    }).on('file', function (name, file) {
        obj.files[name] = file;//这里提取上传的文件
    }).on('end', function () {
        cb(obj)
    });
    form.parse(req);
}

app.get('/',function(req,res){
    res.sendFile(path.resolve('./buffer3.html'))
})

app.post('/chunkSaveBase64',function(req,res){
    onData(req,function(obj){
        var base64 = obj.data.base64
        console.log(base64);
        var b = Buffer.from(base64,'base64')
        fs.writeFile('./base64.jpg',base64,'base64',function(){
            console.log('写入成功');
            res.send('写入成功')
        })
    })
})

app.listen('8080')
