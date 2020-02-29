const router = require("express").Router()
const controller = require("../controllers/comment")

router.post("/comment/write/:id",controller.writeAComment)
router.get("/comment/get/blog/:id",controller.getBlogBasedComment)

module.exports = router