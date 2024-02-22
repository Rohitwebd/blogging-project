const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Contact = new Schema({
    Fullname:{
        type:String
    },
    Email: {
        type: String
    },
    Website:{
        type:String
    },
    Massage:{
        type:String
    },
    CreatedDate:{
        type:Date,
        default:Date.now
    }

})
module.exports = mongoose.model('contact', Contact)