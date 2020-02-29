const Blog = require("../models/blog")
const User = require("../models/users")
const Comment = require("../models/comment")

writeAComment = async(req,res)=>{
    const id = req.params.id
    try{
        let verifyId = await User.find({_id:id})
        if(verifyId){
            const com = new Comment({...req.body})
            let saved = await com.save()
            res.status(201).send(saved)
        }
        else{
            res.status(200).send({logged:false,message:"Invalid id. Register first to write a comment"})
        }
    }
    catch(err){
        res.status(400).send(err)
    }
}

// Get All comment about a particulat blog
getBlogBasedComment = async(req,res)=>{
    const id = req.params.id
    try{
        const allBlogComment = await Comment.find({blog_id:id})
        res.status(200).send(allBlogComment)
    }
    catch(err){
        res.status(400).send(err)
    }
}

module.exports = {
    writeAComment,
    getBlogBasedComment
}