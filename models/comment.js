const mongoose = require("mongoose")

const Comment = new mongoose.Schema({
    user_id:{
        type:String
    },
    username:{
        type:String
    },
    blog_id:{
        type:String
    },
    comment:{
        type:String
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("comment",Comment)