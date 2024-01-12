const express = require('express')
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
let mongodb = require('./Config/db')


mongoose.promise = global.promise;
mongoose.connect(mongodb.db).then(() => {
    console.log("database connected")
}, err => {
    console.log(`database error ${err}`)
})


const blogRoute = require('./Routes/blog.routes')
app.use('/api/blog',blogRoute)


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listing on port ${port}`)
})
