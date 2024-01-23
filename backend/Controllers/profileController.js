exports.logout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.status(200).json({
        status: true,
        massage: "logout successfully"
    })
}