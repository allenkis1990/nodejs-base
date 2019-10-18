/**
 * Created by Allen Liu on 2019/10/14.
 */
//setTimeout是插入事件队列
setTimeout(()=>{
    console.log('timeout1');
    Promise.resolve().then(()=>{
        console.log('then2');
    })
},0)

Promise.resolve().then(()=>{
    console.log('then1');
    setTimeout(()=>{
        console.log('timeout2');
    },0)
})
//then1 timeout1 then2 timeout2

//插入事件队列的尾部
setImmediate(function(){
    console.log(1);
})

//同步代码执行完后调用不给其他异步机会
process.nextTick(()=>{
    console.log(1111);
})