const express = require('express')
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
let mongodb = require('./Config/db')
const cookieParser = require("cookie-parser")


app.use(express.json())
app.use(cookieParser())

// ============== database connection ===============

mongoose.promise = global.promise;
mongoose.connect(mongodb.db).then(() => {
    console.log("database connected")
}, err => {
    console.log(`database error ${err}`)
})


const blogRoute = require('./Routes/blog.routes')
const authRoute = require('./Routes/auth.routes')
app.use('/api/blog', blogRoute)
app.use('/api/auth',authRoute)

// ================= server create ==================

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listing on port ${port}`)
})
