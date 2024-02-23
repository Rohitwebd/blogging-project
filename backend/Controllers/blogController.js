const blogModel = require("../Models/Blog")

// ==================== new blog create ===============

exports.createBlog = async (req, res) => {
    try {
        const blogs = await blogModel.create(req.body)
        res.status(201).json({
            success: true,
            massage: "blog create successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

//==================== All blog data get ===============

exports.getAllblog = async (req, res) => {
    try {
        const blogs = await blogModel.find(req.query)
        console.log(req.query)
        if (blogs.length > 0) {
            res.status(200).json({
                count: blogs.length,
                success: true,
                massage: "All blogs data get ",
                blogs
            })
        } else {
            res.status(400).json({
                count: blogs.length,
                success: false,
                massage: "No blogs found "
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

// ================== delete blog =============

exports.deleteBlog = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

// =====================blog get by id ==================

exports.getBlogbyId = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

// ========================= blog update by id ====================

exports.updateBlog = async (req, res) => {
    try {
        let blog = await blogModel.findById(req.params.id)
        if (!blog) {
            return res.status(404).json({
                success: true,
                massage: "blog not found",
            })
        }
        blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
            upsert: true
        })
        res.status(200).json({
            success: true,
            massage: "Blog update successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

// ===================== getBlogsBySerch ===================

exports.getBlogsBySerch = async (req, res) => {
    // console.log(req.query)
    try {
        const blogs = await blogModel.find(
            {
                // "blogTitle": { $regex: req.query.q }

                "$and": [
                    { "blogTitle": { $regex: req.query.q } },
                    { "blogDescription": { $regex: req.query.q } }
                ]


                // "$or": [
                //     { "blogTitle": { $regex :req.query.q }}
                // ]

            }
        );
        if (blogs.length > 0) {
            res.status(200).json({
                success: true,
                count: blogs.length,
                blogs
            })
        } else {
            res.status(400).json({
                success: false,
                message: "No blogs found"
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.error
        })
    }
};
