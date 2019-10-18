/**
 * Created by Allen Liu on 2019/10/16.
 */
var vm = require('vm')
console.log(vm);


var a = 1
//下面拿不到上面的a作用域被隔离
vm.runInThisContext('var a = 2;console.log(a)')