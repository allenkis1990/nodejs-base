/**
 * Created by Allen Liu on 2019/10/10.
 */

//下班
function afterWork(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log('下班')
            resolve()
        },2000)
    })
}
//吃饭
function eat(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log('吃饭')
            resolve()
        },2000)
    })
}
//遛狗
function walkingWithDog(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log('遛狗')
            resolve()
        },2000)
    })
}
//打游戏
function game(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log('打游戏')
            resolve()
        },2000)
    })
}
//睡觉
function sleep(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log('睡觉')
            resolve()
        },2000)
    })
}

async function run(){
    await afterWork()
    await eat()
    await walkingWithDog()
    await game()
    await sleep()
}
run().then(()=>{
    console.log('结束我的一天');
})