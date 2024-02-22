const NewsModle = require("../Models/NewsLetter")

// ==================== new NewsLetter create ===============

exports.createNews = async (req, res) => {
    const news = await NewsModle.create(req.body)
    res.status(201).json({
        success: true,
        massage: "NewsLetter create successfully"
    })
}