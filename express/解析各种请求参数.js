/**
 * Created by Allen Liu on 2019/10/29.
 */

//bodyParser
//express-session
//cookie-parser
let express = require('express')
let app = express()
//解析表单带文件的可以用这个
var formdata = require('formidable');
let path = require('path')

var cookieParser = require('cookie-parser')
var expressSession = require('express-session')

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


app.use(cookieParser('lwh'))
app.use(expressSession({
    // name: 'lwh', // 这里是cookie的name，默认是connect.sid
    secret: 'lwh520', // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000, httpOnly: true }
}));

app.get('/',function(req,res){
    console.log(req.session.isFirst,'session');
    req.session.isFirst = 'yes'
    console.log(req.signedCookies,'cookie');//假如设置了cookie name:lwh如果前端手动修改了cookie会返回name:false
    res.cookie('name','lwh',{
        expires:new Date(new Date().getTime()+10000).toGMTString(),
        maxAge:1000*10,
        // httpOnly:true,
        signed:true
    })
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

app.listen('6767')