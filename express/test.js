/**
 * Created by Allen Liu on 2019/10/22.
 */

var obj = {
    name:'allen',
    a1(){
        console.log(this.name)
    },
    a2(){
        setTimeout(this.a1.bind(this))
    }
}

obj.a2()