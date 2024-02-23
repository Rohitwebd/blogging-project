const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Newsletter = new Schema({
    email: {
        type: String
    },
    status:{
        type:Number,
        default:1
    },
    createdDate:{
        type:Date,
        default:Date.now
    }

})
module.exports = mongoose.model('newsletter', Newsletter)