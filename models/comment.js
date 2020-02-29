const mongoose = require("mongoose")

const Comment = new mongoose.Schema({
    user_id:{
        type:String
    },
    blog_id:{
        type:String
    },
    comment:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("comment",Comment)