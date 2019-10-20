/**
 * Created by Allen Liu on 2019/10/20.
 */

var fs = require('fs')


var rs = fs.createReadStream('./data/data1.txt',{
    flags:'r',
    highWaterMark:2,//一次最多读多少字节
    encoding:null,
    autoClose:true,
    // start:1,
    // end:5
})

var bufArr = []
rs.on('data',function(data){
    // console.log(data);
    bufArr.push(data)
})

rs.on('end',function(){
    var buf = Buffer.concat(bufArr)
    var str = buf.toString()
    console.log(str);
})