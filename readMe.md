# *Dort Blog*
## *User Routes*
* /user/signup
```
{
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String,min:8,max:1024},
    avatar:{
        type:{String},
        default:"https://image.flaticon.com/icons/png/512/126/126486.png"
    },
    verified:{
        type:Boolean,
        default:false
    },
    date:{
        type:String,
        default:Date.now()
    }
}
```
* /user/login
```
{
    email:"Any",
    password:"Any"
}
```
## *Email Verification*
* /user/verification/:token
