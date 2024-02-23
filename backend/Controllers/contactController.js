const ContactModle = require("../Models/Contact")

// ==================== new NewsLetter create ===============

exports.createContact = async (req, res) => {
    try{
    const contact = await ContactModle.create(req.body)
    res.status(201).json({
        success: true,
        massage: "Contact create successfully"
    })
}catch (error) {
    res.status(400).json({
        message: "An error occurred",
        error: error.message,
    });
}
}