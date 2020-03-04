const mongoose = require("mongoose")

const Blog = new mongoose.Schema({
    user_id:{
        type:String
    },
    username:{
        type:String
    },
    title:{
        type:String
    },
    image:{
        type:String
    },
    content:{
        type:String
    },
    category:{
        type:String,
        enum:["science","fashion","engineering","art","politics","religion"]
    },
    avatar:{
        type: String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("blog",Blog)
