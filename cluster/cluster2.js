/**
 * Created by Allen Liu on 2019/9/26.
 * 所有进程平均分配处理字符串数组
 */
var cluster = require('cluster')
var cpusNum = require('os').cpus().length
if(cluster.isMaster){
    console.log('当前cpu共'+cpusNum+'核');
    var count = 0
    var strArr = ['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11']
    var sliceEnd = Math.ceil(strArr.length/cpusNum)
    // console.log(sliceEnd);
    for(let i=0;i<cpusNum;i++){
        //创建子进程
        var childProcess = cluster.fork()
        //给相应的子进程发送消息
        childProcess.send({
            idx:i,
            strArr:strArr.slice(i*sliceEnd,(i+1)*sliceEnd)
        })
        childProcess.on('message',function(msg){
            count ++
            if(count===cpusNum){
                console.log('处理完毕!!')
            }
        })
    }
}else{
    // console.log('lwhIndex'+process.lwhIndex+'进程已经运行');
    // console.log(cluster.worker.id)// 1 2 3 4
    process.on('exit',function(){
        console.log(process.pid+'进程已经退出');
    })

    //各个子进程分别接收到主进程发来的消息
    process.on('message',function(msg){
        msg.strArr.forEach(function(item){
            console.log(`我是进程${msg.idx},我正在处理字符串${item}`)
        })
        process.send(`进程${msg.idx}处理完毕`)
    })
}
