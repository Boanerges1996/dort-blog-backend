# **Dort Blog**
---
## **User Routes**
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
## *User Info*
* /user/info/:id **PUT**
* /user/info/:id **GET**

---

# **Blog Routes**
* /user/blog/write/:id
```
{
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
    }
}
```

* /user/blog/all/blog/:id **GET** 
> *For getting all post blogs written by a user*
* /user/blog/all/category/:id?category="something" **GET** 
> *For getting users blog based on category*
* /user/blog/all **GET** 
> *For getting all blogs based on date written*
* /user/blog/search?keyword="something" **GET**
> *For searching for specific blogs*

---
# **Comment Routes**
* /user/comment/write/:id **POST**
> id is users_id
```
{
    blog_id:{
        type:String
    },
    comment:{
        type:String
    }
}
```
* /user/comment/get/blog/:id **GET**
> id _represents_ the blog id