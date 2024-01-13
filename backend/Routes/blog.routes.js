const express = require('express')
const blogRoute = express.Router();

// const Blog = require('../Models/Blog')

// blogRoute.route('/').get((req, res) => {
//     Blog.find({}).then((data) => {
//         res.json(data)
//     }).catch((err) => {
//         res.json(err)
//     })
// })

const {createBlog,getAllblog,deleteBlog} = require("../Controllers/blogController")

blogRoute.route("/create").post(createBlog)
blogRoute.route("/getblog").get(getAllblog)
blogRoute.route("/delete/").delete(deleteBlog)


module.exports = blogRoute