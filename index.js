const express = require('express')
const logger = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv')
const socketIO = require("socket.io")
const http = require("http")


//Routes import
const User = require("./routers/user")
const Blog = require("./routers/blog")
const Comment = require("./routers/comment")



const app = express()

const server = http.createServer(app)
const io = socketIO(server,{origins:"*:*"})
io.on("connection",(socket)=>{
    socket.emit("connected",{data:"wow,"})
})

dotenv.config()
// DB configuration
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

if(process.env.ENVIRON==="production"){
    // Production Database
    mongoose.connect(process.env.REMOTE_MONGODB,{useNewUrlParser: true,useUnifiedTopology:true},
        ()=>console.log("Connected to db")).catch(err=>{
        console.log(err)
    })
}
else{
    // Local Database
    mongoose.connect('mongodb://localhost/blog',
    {useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{
        console.log("Development local DB connected")
    })
}


// Middlewares
app.use(cors())
app.use(express.json())
app.use(logger("dev"))
app.use(express.static(__dirname+'/static'))


// Routers
app.use("/user",User)
app.use("/user",Blog)
app.use("/user",Comment)


// Socket connection
// let server = http.createServer(app)
// const io= socketIO.listen(server,{origins:"*:*"})





const port = process.env.PORT || 3000
server.listen(port,()=>{
    console.log(`Listening on Port ${port}`)
})