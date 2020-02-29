const router = require("express").Router()
const AUTH = require("../auth-token")
const controller = require("../controllers/blog")

router.post("/blog/write/:id",AUTH,controller.writeBlog)
router.get("/blog/all/blog/:id",AUTH,controller.getAllSpecifyUserBlog)
router.get("/blog/all/category/:id",AUTH,controller.getMyBlogByCategory)
router.get("/blog/all",controller.getAllBlogsInDb)
router.get("/blog/search",controller.searchBlog)



module.exports = router