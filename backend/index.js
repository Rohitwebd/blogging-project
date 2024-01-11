const expess = require('express')
const mongoose = require('mongoose')
const app = expess()
let mongodb = require('./Config/db')
mongoose.Promise =global.Promise;
mongoose.connect(mongodb.db).then(()=>{
    console.log("database connected")
},err =>{
    console.log(`database error ${err}`)
})



const port = process.env.port || 8000
app.listen(port,()=>{
    console.log(`listing on port ${port}`)
})