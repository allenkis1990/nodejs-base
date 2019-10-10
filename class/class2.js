/**
 * Created by Allen Liu on 2019/10/10.
 * 继承
 */

class Parent {
    constructor(name, age) {
        //构造函数上的属性和方法
        this.name = name
        this.age = age
        this.fn = function(){
            console.log('fn');
        }
    }

    //原型上的方法
    sayHello() {
        console.log('hello i am parent');
    }

    //静态方法
    static s1() {
        console.log('parent的s1')
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name,age)
        this.hobby = 'basketball'
    }
    sayHello() {
        console.log('hello i am child');
    }
    parentSayHello(){
        super.sayHello()
    }
    static s1(){
        console.log('child的s1');
    }
    static s2(){
        //调用父亲的s1
        super.s1()
    }
}


var c = new Child('jack', 8)
console.log(c.name,c.age);
c.parentSayHello()//父亲的sayhello
c.sayHello()//自己的sayhello



Child.s1()//自己的s1
Child.s2()//调用父亲的s1

