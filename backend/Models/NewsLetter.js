const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Newsletter = new Schema({
    Email: {
        type: String
    },
    Status:{
        type:Number,
        default:1
    },
    CreatedDate:{
        type:Date,
        default:Date.now
    }

})
module.exports = mongoose.model('newsletter', Newsletter)