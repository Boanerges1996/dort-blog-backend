const Users = require("../models/users")
const Blog = require("../models/blog")

writeBlog = async(req,res)=>{
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        res.send({message:"Please provide a body"})
    }
    else{
        let id = req.params.id
        try{
            let verifyId = await Users.findOne({_id:id})
            if(verifyId){
                let newBlog = new Blog({
                    user_id:id,
                    ...req.body,
                    username: verifyId.firstname+" "+verifyId.lastname,
                    avatar:verifyId.image
                })
                let savedBlog = await newBlog.save()
                res.status(200).send(savedBlog)
            }
            else{
                res.status(400).send({message:"Invalid id"})
            }
        }
        catch(err){
            res.status(400).send(err)
        }
        
    }
}

// Getting all users blog
getAllSpecifyUserBlog = async(req,res)=>{
    let id = req.params.id
    try{
        let verifyId = await Users.findOne({_id:id})
        if(verifyId){
            let allUsersBlogs = await Blog.find({user_id:id})
                                    .sort({date:1})
            res.status(200).send(allUsersBlogs)
        }
        else{
            res.status(400).send({message:"Invalid id"})
        }
    }
    catch(err){
        res.status(400).send(err)
    }
}

// Get User blogs by category
getMyBlogByCategory = async(req,res)=>{
    let id = req.params.id
    try{
        let verifyId = await Users.findOne({_id:id})
        if(verifyId){
            let allUsersBlogs = await Blog.find({user_id:id,category:req.query.category})
            res.status(200).send(allUsersBlogs)
        }
        else{
            res.status(400).send({message:"Invalid id"})
        }
    }
    catch(err){
        res.status(400).send(err)
    }
}

// Get All blogs in DB 
getAllBlogsInDb = async(req,res)=>{
    try{
        let blogs = await Blog.find({},{user_id:0})
        res.send(blogs)
    }
    catch(err){
        res.status(400).send(err)
    }
}

// Search blog by keyword
searchBlog = async(req,res)=>{
    let keyword = req.query.keyword
    let key = new RegExp(keyword,"i")
    try{
        let Search = await Blog.find({title:key})
        res.status(200).send(Search)
    }
    catch(err){
        res.status(400).send(err)
    }
}

getOneBlogById = async(req,res)=>{
    try{
        const id = req.params.id
        let blog = await Blog.findOne({_id:id})
        res.status(200).send(blog)
    }
    catch(err){
        res.status(400).send(err)
    }
}

module.exports = {
    writeBlog,
    getAllSpecifyUserBlog,
    getMyBlogByCategory,
    getAllBlogsInDb,
    searchBlog,
    getOneBlogById
}