const blogModel = require("../Models/Blog")

// ====================new blog create===============

exports.createBlog = async(req,res)=>{
    const blogs = await blogModel.create(req.body)
    res.status(201).json({
        success : true,
        massage :"blog create successfully"
    })
}

//==================== blog get ===============

exports.getAllblog = async(req,res)=>{
    const blogs = await blogModel.find( )
    res.status(200).json({
        success : true,
        massage :"all blog data get ",
        blogs
    })
}

// ================== delete blog =============

exports.deleteBlog = async(req,res)=>{
    const blogs = await blogModel.findById(req.params.id)
    if (!blogs){
    res.status(200).json({
        success : true,
        massage :"blog not found",
    })
}
blogs = await blogModel.deleteOne();
res.status(200).json({
    success : true,
    massage :"blog deleted successfully",
})
}