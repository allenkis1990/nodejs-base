/**
 * Created by Allen Liu on 2019/10/20.
 */
//创建一个每次只读3个字节的可读流
//创建一个每次只写1个字节的可写流
var fs = require('fs')
var rs = fs.createReadStream('./data/demo1.txt',{
    flags:'r',
    highWaterMark:3
})
var ws = fs.createWriteStream('./data/writeData2.txt',{
    flags:'w',
    highWaterMark:1
})

// rs.pipe(ws)//以下操作的快捷方法

rs.on('data',function(data){
    var flag = ws.write(data)
    //flag是false说明还没写好要先暂停一下读
    if(!flag){
        rs.pause()
    }
})

ws.on('drain',function(){
    console.log('继续读吧');
    //写好了回复读取
    rs.resume()
})

rs.on('end',function(){
    console.log('文件读取完毕');
    ws.end('结束')
})


