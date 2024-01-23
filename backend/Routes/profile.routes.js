const express = require ("express")
const router = express.Router()
const{logout}= require("../Controllers/profileController")


router.route("/logout").get(logout)


module.exports = router