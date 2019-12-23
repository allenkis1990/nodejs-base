/**
 * Created by Allen Liu on 2019/12/23.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')


app.use(express.static(path.resolve('./')))


app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'./index.html'))
})


app.get('/getData',function(req,res){
    res.send({
        name:'allen'
    })
})


app.listen('9898')