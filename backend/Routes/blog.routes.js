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


const { createBlog, getAllblog, deleteBlog, getBlogbyId, updateBlog } = require("../Controllers/blogController")
const{userAuth} = require ("../Middleware/auth")

blogRoute.route("/create").post(userAuth,createBlog)
blogRoute.route("/getblog").get(getAllblog)
blogRoute.route("/blog/:id").delete(userAuth,deleteBlog).get(getBlogbyId).patch(userAuth,updateBlog)



module.exports = blogRoute