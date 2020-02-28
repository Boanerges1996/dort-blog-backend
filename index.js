const express = require('express')
const logger = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv')

//Routes import

const app = express()

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
    mongoose.connect('mongodb://localhost/vgs-db',
    {useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{
        console.log("Development local DB connected")
    })
}


// Middlewares
app.use(cors())
app.use(express.json())
app.use(logger("dev"))


// Routers



const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on Port ${port}`)
})