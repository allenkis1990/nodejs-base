/**
 * Created by Allen Liu on 2019/10/9.
 */


//儿子
function* son(){
    console.log('儿子下班回家')
    yield 'father'//叫爸爸煮饭
    console.log('儿子吃爸爸煮的饭')
    yield 'father'//叫爸洗碗
}

function* father(){
    console.log('爸爸煮饭给儿子吃')
    yield 'son'//叫儿子吃饭
    console.log('爸爸洗碗')
}
//要next一次后才会console.log第一句 光调用没效果
var s = son()
var f = father()

function run(task){
    var next = task.next()
    if(next.value==='son'){
        run(s)
    }else if(next.value==='father'){
        run(f)
    }
}
run(s)


