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
    type:{
        type:String,
        enum:["science","fashion","engineering","art","politics","religion"]
    },
})

module.exports = mongoose.model("blog",Blog)
