/**
 * Created by Allen Liu on 2019/9/18.
 */
var fork = require('child_process').fork
var child_process = fork('./child2.js')


child_process.send('开启子进程')
child_process.on('message',function(msg){
    console.log(msg);
    setTimeout(function(){
        child_process.kill()
    },5000)
})
child_process.on('exit',function(){
    console.log('退出子进程');
})
child_process.on('error',function(){
    console.log('子进程错误');
})
