/**
 * Created by Allen Liu on 2019/10/20.
 */

var fs = require('fs')
var ws = fs.createWriteStream('./data/writeData1.txt',{
    // highWaterMark:1,
    flags:'w'
})

ws.on('drain',function(){
    console.log('xxxxx');
})

ws.write('hahah')
ws.end('结束')