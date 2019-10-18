async function a(){
    console.log(1);
    var bbb = await b()
    console.log(bbb);
}
function b(){
    return new Promise((resolve,reject)=>{
        resolve(2)
    })
}
a()
console.log(3);