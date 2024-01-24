const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 1
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', userSchema)