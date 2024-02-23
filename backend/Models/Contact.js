const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Contact = new Schema({
    fullname:{
        type:String
    },
    email: {
        type: String
    },
    website:{
        type:String
    },
    massage:{
        type:String
    },
    CreatedDate:{
        type:Date,
        default:Date.now
    }

})
module.exports = mongoose.model('contact', Contact)