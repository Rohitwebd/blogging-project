const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Blog = new Schema({
    blogTitle: {
        type: String
    },
    blogDescription: {
        type: String
    },
    autherId: {
        type: String
    },
    createdDate: {
        type: String
    },
})
module.exports = mongoose.model('blog', Blog)