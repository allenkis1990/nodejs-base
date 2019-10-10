/**
 * Created by Allen Liu on 2019/10/10.
 */


//实现一个iterator接口
var arr = {
    name:'allen',
    age:18,
    work:'web',
    //想要用let of循环一定要实现Symbol.iterator
    [Symbol.iterator](){
        var _this = this
        var index = 0
        var arr = Object.keys(_this)//['name','age',....]
        return {
            //一定要实现next
            next(){
                if(index<arr.length){
                    return {
                        value:_this[arr[index++]],
                        done:false
                    }
                }else{
                    return {
                        value:undefined,
                        done:true
                    }
                }
            }
        }
    }
}
// arr.ok =1
//break continue都可以用
for(let v of arr){
    // if(v===18){
    //     continue
    // }
    console.log(v);
}