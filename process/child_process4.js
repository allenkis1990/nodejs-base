/**
 * Created by Allen Liu on 2019/9/26.
 */
let cp=require('child_process');

//exec执行的是shell命令
// cp.exec('echo hello world',function(err,stdout){
//     console.log(stdout);
// });

// cp.exec('node shell/test1.js',function(err,stdout){
//     console.log(stdout);
// })

//execFile打开文件
cp.execFile('C:\\Program Files (x86)\\Tencent\\QQ\\Bin\\QQScLauncher.exe',function(err,stdout){
    console.log(err,stdout);
})