/**
 * Created by Allen Liu on 2019/9/18.
 */

process.on('message',function(msg){
    console.log(msg);
    var sum = 0
    console.info('开始计算时间')
    console.time('花费毫秒')
    for(let i=0;i<6000000000;i++){
        sum++
    }
    console.timeEnd('花费毫秒')
    //把计算结果返回给主进程
    process.send(sum)
})

// process.exit()