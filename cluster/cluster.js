/**
 * Created by Allen Liu on 2019/9/26.
 */
var cluster = require('cluster')
var cpusNum = require('os').cpus().length
// console.log(cpusNum);
if(cluster.isMaster){
    var num = 0
    var count = 0
    console.time('countTime')
    new Promise(function(resolve,reject){
        for(let i=0;i<cpusNum;i++){
            var childProcess = cluster.fork()
            childProcess.on('message',function(msg){
                num+=msg
                // console.log(num);
                count++
                if(count===cpusNum){
                    resolve(num)
                }
            })
        }
    }).then(function(data){
        console.log(data);
        console.timeEnd('countTime')
    })
}else{
    console.log(process.pid+'进程已经运行');
    process.on('exit',function(){
        console.log(process.pid+'进程已经退出');
    })
    // setTimeout(function(){
    //     process.disconnect()
    // },2000)
    var num =  require('./child1.js')(cpusNum)
    process.send(num)

}
