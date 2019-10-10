/**
 * Created by Allen Liu on 2019/10/9.
 */

//下班
function afterWork(next){
    setTimeout(function(){
        console.log('下班')
        next()
    },2000)
}
//吃饭
function eat(next){
    setTimeout(function(){
        console.log('吃饭')
        next()
    },2000)
}
//遛狗
function walkingWithDog(next){
    setTimeout(function(){
        console.log('遛狗')
        next()
    },1500)
}
//打游戏
function game(next){
    setTimeout(function(){
        console.log('打游戏')
        next()
    },1000)
}
//睡觉
function sleep(next){
    setTimeout(function(){
        console.log('睡觉')
        next()
    },1000)
}

function* myLife(){
    yield afterWork
    yield eat
    yield walkingWithDog
    yield game
    yield sleep
}

function task(g){
    var gen = g()
    function next(){
        var result = gen.next()
        //done完成了就不执行了
        if(result.done){
           return false
        }
        var itemTask = result.value
        itemTask(next)
    }
    next()
}
task(myLife)

