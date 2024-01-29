const mongoose = require("mongoose")
const resetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    token: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Reset', resetSchema)