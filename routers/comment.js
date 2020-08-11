const router = require("express").Router()
const controller = require("../controllers/comment")
const AUTH = require("../auth-token")

router.post("/comment/write/:id",AUTH,controller.writeAComment)
router.get("/comment/get/blog/:id",controller.getBlogBasedComment)

module.exports = router