/**
 * Created by Allen Liu on 2019/10/10.
 */

class Fn{
    constructor(name,age){
        //构造函数上的属性和方法
        this.name = name
        this.age = age
    }
    //原型上的方法
    sayHello(){
        console.log('hello');
    }
    //静态方法
    static s1(){
        console.log('s1')
    }
}
var obj = new Fn('allen',18)

console.log(obj.name, obj.age);
obj.sayHello()
Fn.s1()