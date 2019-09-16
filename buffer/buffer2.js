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
    res.sendFile(path.resolve('./buffer2.html'))
})

var resultArr = []
//fs.write一定是写buffer进去 写入的编码可以是utf8 binary base64
//写图片文件的话最后buffer都要转成binary写进去
//fs读到文件的内容后要先Buffer.from(data,'binary')
//然后写入fs.write('./a.jpg',data,'binary')
app.post('/chunkSaveImg',function(req,res){
    onData(req,function(obj){
        var file = obj.files.img.path
        var totalChunk = obj.data.totalChunk
        //console.log(fs.readFileSync(file,'utf8'));
        var fileChunkContent = fs.readFileSync(file)
        var buf = Buffer.from(fileChunkContent, 'binary');
        //console.log(buf);
        resultArr.push(buf)
        if(totalChunk===obj.data.chunkNum){
            console.log(123);
            //console.log(resultArr);
            var fallyBuf = Buffer.concat(resultArr)
            fs.writeFile('./abc.jpg',fallyBuf,'binary',function(){
                console.log('写入图片成功');
                res.send({
                    message:'图片写入成功'
                })
                //写成功以后要把分片数组清空
                resultArr = []
            })
            //fs.writeFile('./a1.txt',Buffer.from('456','base64'),'base64',function(){
            //
            //})
            //console.log(fallyBuf);
        }else{
            res.send({
                message:'当前正在上传第'+obj.data.chunkNum+'块分片'
            })
        }
    })
})

app.listen('8080')
