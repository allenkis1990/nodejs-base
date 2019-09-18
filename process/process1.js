/**
 * Created by Allen Liu on 2019/9/17.
 */

//set abc=hahah
console.log(process.env.abc)//hahah


//node a.js --a
console.log(process.argv)//[xxx,xxx,'--a']

console.log(process.arch);//当前cpu多少位

console.log(process.cwd());//返回当前进程的工作目录 D:\github-project\nodejs-base\process


// process.stdout.write('这是一行数据\n这是第二行数据');//console.log
// process.stderr.write('输出一行标准错误流，效果跟stdout没差');//console.error

// process.stdin.resume()//卡住
// process.exit();//退出
process.on('exit',function(){
    console.log('退出了进程');
})

//在控制台里面输入
process.stdin.on('data',function(d){
    //返回输入的值
    // console.log(121212);
    // console.log(d);
    var res = d.toString().replace(/^\s/ig,'').replace(/\s$/ig,'')
    console.log(res);
    if(res==='lwh is good'){
        console.log(1);
        process.exit(0)
    }
})
//捕获到一个异常
//放最前面否则捕捉不到
// process.on('uncaughtException', function(e) {
//     console.log('捕获到一个异常'+e);
//     process.stdin.resume()
//     // process.exit(0)
// });

// process.on('SIGINT', function() {
//     console.log('收到 SIGINT 信号。');
// });



