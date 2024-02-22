const ContactModle = require("../Models/Contact")

// ==================== new NewsLetter create ===============

exports.createContact = async (req, res) => {
    try{
    const news = await ContactModle.create(req.body)
    res.status(201).json({
        success: true,
        massage: "contact create successfully"
    })
}catch (error) {
    res.status(400).json({
        message: "An error occurred",
        error: error.message,
    });
}
}