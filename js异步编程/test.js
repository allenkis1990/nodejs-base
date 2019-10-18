/**
 * Created by Allen Liu on 2019/10/10.
 */
var obj = {
    name:'allen'
}

// var data = ''
// Object.defineProperty(obj,'name',{
//     set(nv){
//         // console.log(nv);
//         data = nv
//     },
//     get(){
//         return data
//     }
// })
//
// obj.name='jack'
// // obj.name='jack2'
// console.log(obj.name)
function a(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('a');
            resolve()
        },2000)
    })
}
function b(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('b');
            resolve()
        },2000)
    })
}
function c(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('c');
            resolve()
        },2000)
    })
}
var arr = [{value:a},{value:b},{value:c}]
function run(idx){
    var gen = arr[idx]
    if(!gen){
        return false
    }
    var task = gen.value
    task().then((v)=>{
        idx++
        run(idx)
    })
}
run(0)
