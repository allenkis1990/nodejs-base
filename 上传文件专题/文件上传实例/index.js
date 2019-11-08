/**
 * Created by Allen Liu on 2019/11/8.
 */

const express = require('express')
const app = express()
const path = require('path')
const formdata = require('formidable');
const fs = require('fs')
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
    res.sendFile(path.resolve(__dirname,'index.html'))
})


app.post('/upload',function(req,res){
    onData(req,function(obj){
        let file = obj.files.file
        // console.log(obj.files);
        let rs = fs.createReadStream(file.path)
        let ws = fs.createWriteStream(path.resolve(__dirname,'..',`fileData/${file.name}`))
        rs.pipe(ws)
        res.send({
            msg:'文件上传成功'
        })
    })
})

app.listen('8888','192.168.28.253')