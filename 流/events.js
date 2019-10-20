/**
 * Created by Allen Liu on 2019/10/20.
 */
let emitter = require('events').EventEmitter
let events = new emitter()
function eat1(){
    console.log('吃面');
}
function eat2(){
    console.log('吃饭');
}
events.on('吃饭',eat1)
events.on('吃饭',eat2)


events.removeListener('吃饭',eat2)
events.emit('吃饭')