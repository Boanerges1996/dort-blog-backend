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
    }
})

module.exports = mongoose.model("comment",Comment)