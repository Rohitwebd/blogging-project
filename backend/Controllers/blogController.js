const blogModel = require("../Models/Blog")

// ====================new blog create===============

exports.createBlog = async (req, res) => {
    const blogs = await blogModel.create(req.body)
    res.status(201).json({
        success: true,
        massage: "blog create successfully"
    })
}

//==================== blog get ===============

exports.getAllblog = async (req, res) => {
    const blogs = await blogModel.find()
    res.status(200).json({
        success: true,
        massage: "all blog data get ",
        blogs
    })
}

// ================== delete blog =============

exports.deleteBlog = async (req, res) => {
    let blog = await blogModel.findById(req.params.id)

    if (!blog) {
        return res.status(404).json({
            success: true,
            massage: "blog not found",
        })
    }
    blog = await blogModel.deleteOne();
    res.status(200).json({
        success: true,
        massage: "blog deleted successfully",
    })
}

// =====================blog get by id ==================

exports.getBlogbyId = async (req, res) => {
    let blog = await blogModel.findById(req.params.id)

    if (!blog) {
        return res.status(404).json({
            success: true,
            massage: "blog not found",
        })
    }
    res.status(200).json({
        success: true,
        blog
    })
}

// ========================= blog update ====================

exports.updateBlog = async (req, res) => {
    let blog = await blogModel.findById(req.params.id)
    if (!blog) {
        return res.status(404).json({
            success: true,
            massage: "blog not found",
        })
    }
    blog = await blogModel.findByIdAndUpdate(req.params.id, req.body , {
        upsert: true
    })
    res.status(200).json({
        success: true,
        massage: "Blog update successfully"
    })
    }