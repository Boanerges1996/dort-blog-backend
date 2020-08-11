const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    user_id:{
        type:String
    },
    token:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("token",tokenSchema)