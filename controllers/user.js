const path = require("path")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

const Users = require("../models/users")
const Token = require("../models/verifications")

dotenv.config()


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'boanergeskwaku253@gmail.com',
           pass: 'Boanerges1996.'
       }
});



registerUser = async (req,res)=>{
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        res.send({message:"Please provide a body"})
    }
    else{
        const email = req.body.email
        try{
            const checkIfExist = await Users.findOne({
                email:email
            })
            if(checkIfExist){
                res.status(400).send({exists:true})
            }
            else{
                let salt = await bcrypt.genSalt(10)
                let hashedPassword = await bcrypt.hash(req.body.password,salt)
                let newUser = new Users({
                    ...req.body,
                    password: hashedPassword
                })
                await newUser.save()

                // fetching userdata
                let getUser = await Users.findOne({email:email},{email:1,firstname:1,lastname:1,date:1,avatar:1,verified:1})
                let tok = crypto.randomBytes(16).toString("hex")
                let auth_token = jwt.sign({email:email},process.env.SECRET_KEY,{algorithm:"HS256"})
                let token = new Token({user_id:getUser._id,token:tok})
                await token.save();
                const url = `http://localhost:5000/user/verification/${tok}`
                const mailOptions = {
                    from: 'boanergeskwaku253@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Blog Verify Email', // Subject line
                    html: `Hello<br /> Please click on the link to verifiy <a href=${url}>Click here</a>`
                };
                await transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                      console.log(info);
                });
                
                res.set({auth_token}).send({...getUser._doc,logged:true})
            }
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    } 
}


// Verify token 
verifyEmail = async(req,res)=>{
    const token = req.params.token
    console.log(token)
    try{
        const verify = await Token.findOne({token:token})
        if(verify){
            const user_id = verify.user_id
            await Users.updateOne({_id:user_id},{
                $set:{
                    verified:true
                }
            })
            res.status(200).sendFile(path.join(__dirname+'/verified.html'))
        }
        else{
            res.status(400).sendFile(path.join(__dirname+'/invalid.html'))
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}

// User login
login = async(req,res)=>{
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        res.send({message:"Please provide a body"})
    }
    else{
        const email = req.body.email
        try{
            const verifyEmail = await Users.findOne({email:email})
            if(verifyEmail){
                const verifyPassword = await bcrypt.compare(req.body.password,verifyEmail.password)
                if(verifyPassword){
                    const getUser = await Users.findOne({email:email},{email:1,firstname:1,lastname:1,date:1,avatar:1,verified:1})
                    let auth_token = await jwt.sign({email:email},process.env.SECRET_KEY,{algorithm:"HS256"})
                    res.status(200).set({auth_token}).send({...getUser._doc,logged:true,auth_token})
                }
                else{
                    res.status(400).send({logged:false,message:"Invalid email or password"})
                }
            }
            else{
                res.status(400).send({
                    exist:false
                })
            }
        }
        catch(err){
            res.status(400).send(err)
        }
    } 
}

// Update user info
updateUser = async(req,res)=>{
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        res.send({message:"Please provide a body"})
    }
    else{
        const id = req.params.id
        try{
            await Users.updateOne({_id:id},{$set:req.body})
            const updatedUser = await Users.findOne({_id:id})
            res.send(updatedUser)            
        }
        catch(err){
            res.send(err)
        }
    }
}


// Getting users info
getUserInfo = async (req,res)=>{
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        res.send({message:"Please provide a body"})
    }
    else{
        const id = req.params.id
        try{
            let userInfo = await Users.findOne({_id:id},{avatar:1,email:1,firstname:1,lastname:1})
            res.send(userInfo)
        }
        catch(err){
            res.send({...err,messages:"User doesnt exist"})
        }
    } 
}


// Forgotten password
forgottenPassword = async(req,res)=>{
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        res.send({message:"Please provide a body"})
    }
    else{
        try{
            const checkIfExist = await Users.findOne({
                email:email
            })
            if(checkIfExist){
                let tok = crypto.randomBytes(16).toString("hex")
                let token = new Token({user_id:checkIfExist._id,token:tok})
                const url = `http://localhost:5000/user/password/reset/${token}`
                const mailOptions = {
                    from: 'boanergeskwaku253@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Blog Verify Email', // Subject line
                    html: `Hello<br /> Please click on the link to reset Password <a href=${url}>Click here</a>`
                };
                await transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                      console.log(info);
                });
                res.status(200).send({exists:true})
            }
            else{
                res.status(400).send({exists:false,message:"Account doesnt exist you can't reset"})
            }
        }
        catch(err){
            res.status(400).send(err)
        }    
    }
}


module.exports = {
    registerUser,
    login,
    verifyEmail,
    updateUser,
    getUserInfo
}

