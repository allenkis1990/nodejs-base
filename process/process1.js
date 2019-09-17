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

process.stdin.resume()//卡住
process.exit();//退出