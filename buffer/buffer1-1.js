/**
 * Created by Allen Liu on 2019/9/17.
 */

var str = '我'
// console.log(Buffer.from(str, 'utf8').length);

console.log(Buffer.byteLength(str, 'utf8'));//3


//通过Buffer.from声明出来的buffer不存在互相引用
var bf = Buffer.from('haha')
var bf2 = Buffer.from(bf)
bf[0]=11
console.log(bf);
console.log(bf2===bf);

var a = '123'
var b = Buffer.from('123')
console.log(Buffer.isBuffer(a));//false
console.log(Buffer.isBuffer(b));//true



//对比
// 如果 target 与 buf 相同，则返回 0。
// 如果 target 排在 buf 前面，则返回 1。
// 如果 target 排在 buf 后面，则返回 -1。
//equal方法的话只要长度相等就可以
var compare1 = Buffer.from('ooo')
var compare2 = compare1
var compare3 = Buffer.from('ooo')
console.log('compare1和compare2对比结果：'+compare1.compare(compare2));
console.log('compare1和compare3对比结果：'+compare1.compare(compare3));




