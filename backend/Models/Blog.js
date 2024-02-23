const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Blog = new Schema({
    blogTitle: {
        type: String
    },
    blogDescription: {
        type: String
    },
    category: {
        type: String
    },
    autherId: {
        type: String
    },
    createdDate: {
        type: Date,
        default:Date.now
    },
})
module.exports = mongoose.model('blog', Blog)