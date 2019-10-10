/**
 * Created by Allen Liu on 2019/10/9.
 */
function* R(){
    let name
    yield name = 'lwh'
    // console.log(name)
    let age
    yield age = '18'
    // console.log(age)
    return name+age
}

var res = R()

//一直到有return done才为true
// res.next();//{value:'',done:false}
// res.next()
// console.log(res.next());


//被上面解析过下面就没东西了
//遇到return的那个就是undefined
// let [a,b,c] = res
// console.log(a, b, c);


//被上面解析过下面就没东西了
// for(let i of res){
//     console.log(i);
// }



//直接返回
// console.log(res.return(99));


// function* y1(){
//     yield 'c'
//     yield 'd'
// }
// function* y2(){
//     yield 'a'
//     yield 'b'
//     yield* y1()
//     yield 'e'
// }
//
// let yyy = y2()
// var a = yyy.next()
// var b = yyy.next()
// var c = yyy.next()
// var d = yyy.next()
// var e = yyy.next()
// console.log(a, b, c, d, e);


// function* RR(){
//     let name = yield 'lwh'
//     let age = yield '18'
//     return name+age
// }
// var res2 = RR()
//
// //要把上一个的value传进去否则没值
// var a = res2.next()
// var b = res2.next(a.value)
// var c = res2.next(b.value)
//
// console.log(c);



function fn1(){
    setTimeout(()=>{
        console.log(1)
    },1000)
}
function fn2(){
        console.log(2)
}
function* task(){
    yield fn1()
    yield fn2()
}
var t = task()
t.next()
t.next()


