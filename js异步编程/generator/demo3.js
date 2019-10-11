/**
 * Created by Allen Liu on 2019/10/11.
 */

function getData1(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('data1')
        },2000)
    })
}
function getData2(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('data2')
        },2000)
    })
}

function* read(){
    let data1 = yield getData1()
    // console.log(data1,1);
    let data2 = yield getData2()
    // console.log(data2,2);
    let data3 = yield 6666
    return data1+data2+data3
    // console.log(res,3);
    // console.log(res);

}

function run(){
    var it = read()
    return new Promise((resolve,reject)=>{
        function next(v){
            var g = it.next(v)
            var p = g.value
            // console.log(g);
            //没结束的话就递归next
            if(!g.done){
                //是promise
                if(p&&p.then){
                    p.then((re)=>{
                        // console.log(re,1212);
                        next(re)
                        // console.log(re,'notDone');
                    },reject)
                }else{
                    //yield常量
                    next(p)
                }
            }else{
                //结束的话就resolve让promise结果返回
                // console.log(v,'res');
                resolve(p)
            }
        }

        next()
    })
}
run().then((data)=>{
    console.log(data,88);
})