/**
 * Created by Allen Liu on 2019/10/10.
 */

function getData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('lwh')
        },3000)
    })
}

async function run (){
    let data = await getData()
    console.log(data);
    console.log('done')
    return 'async函数里面也可以返回然后调then'
}
run().then((data)=>{
    console.log(data);
})