const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET;

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err) => {
            if (err) {
                return res.status(401).json({
                    massege: "not Authoriszed"
                })
            } else {
                next();
            }
        })
    } else {
        return res.status(401).json({
            massege: "not token found"
        })
    }
}