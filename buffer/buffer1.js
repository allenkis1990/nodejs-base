/**
 * Created by Allen Liu on 2019/9/15.
 */
var buffer1 = Buffer.alloc(8)
buffer1.write('lwhhahaha')
//console.log(buffer1);

console.log(buffer1.slice(0, 3).toString());//包前不包后 //lwh

var buffer2 = Buffer.from('刘伟恒','utf8')
console.log(buffer2);

var buffer3 = Buffer.alloc(buffer2.length)
buffer2.copy(buffer3,0,0,6)
console.log(buffer3.toString());//刘伟

var buffer4=Buffer.concat([buffer1,buffer2,buffer3])
console.log(buffer4.toString());//lwhhahah刘伟恒刘伟


//自己实现一个copy
var c1 = Buffer.from('复制一个哈哈')
function copyBuf(source){
    var copyB = Buffer.alloc(source.length)
    source.forEach(function(item,index){
        copyB[index] = source[index]
    })
    return copyB
}
var c2 = copyBuf(c1)
console.log(c2.toString());//复制一个哈哈


//自己实现一个concat
var concat1 = Buffer.from('lwh ')
var concat2 = Buffer.from('is ')
var concat3 = Buffer.from('good')
function concatBuf(...arg){
    //console.log(Object.prototype.toString.call(arg));
    var start = 0
    var len = 0
    arg.forEach(function(item){
        len+=item.length
    })
    var concatB = Buffer.alloc(len)
    arg.forEach(function(item){
        item.forEach(function(subItem,subIndex){
            concatB[subIndex+start] = item[subIndex]
        })
        start+=item.length
    })
    return concatB
}
var concat4 = concatBuf(concat1,concat2,concat3)
console.log(concat4.toString());//lwh is good