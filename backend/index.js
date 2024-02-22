require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require("cors")
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

app.use(cors())

const blogRoute = require('./Routes/blog.routes')
const authRoute = require('./Routes/auth.routes')
const profileRoute = require('./Routes/profile.routes');
const newsRoute = require('./Routes/news.routes');
const contactRoute = require('./Routes/contact.routes');


app.use('/api/blog', blogRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', profileRoute)
app.use('/api/newsletter',newsRoute)
app.use('/api/contact',contactRoute)

// ================= server create ==================

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listing on port ${port}`)
})
