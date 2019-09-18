/**
 * Created by Allen Liu on 2019/9/18.
 */

var fork = require('child_process').fork
var childModule = fork('./child.js')
var cpus = require('os').cpus().length
console.log('当前计算机cpu核数为:'+cpus);

//发送消息给子进程告诉子进程 告诉他可以开始了
childModule.send('开始启动子进程')
childModule.on('message',function(msg){
    console.log('接收到子进程信息：'+msg)
    //接到消息后就杀死进程
    childModule.kill()
})

childModule.on('error',function(code,signal){
    console.log(code)
    //接到消息后就杀死进程
    childModule.kill()
})

childModule.on('close',function(){
    console.log('子进程退出')
})