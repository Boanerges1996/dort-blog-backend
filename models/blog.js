const mongoose = require("mongoose")

const Blog = new mongoose.Schema({
    user_id:{
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
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("blog",Blog)
