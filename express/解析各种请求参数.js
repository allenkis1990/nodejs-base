/**
 * Created by Allen Liu on 2019/10/29.
 */
let express = require('express')
let app = express()
var formdata = require('formidable');
let path = require('path')
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
    res.sendFile(path.resolve(__dirname,'express1.html'))
})


app.post('/fuck',function(req,res){
    // var arr = []
    // req.on('data',function(data){
    //     console.log(data,123);
    //     arr.push(data)
    // })
    //
    // req.on('end',function(){
    //     console.log(456);
    //     var nb = Buffer.concat(arr)
    //     console.log(nb.toString());
    // })

    onData(req,function(obj){
        console.log(obj);
    })

    res.send('fuck')
})

app.listen('9090')