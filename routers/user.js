const express = require("express")
const AUTH = require("../auth-token")
let controller = require("../controllers/user")

const router = express.Router()
router.post('/signup',controller.registerUser)
router.post("/login",controller.login)
router.get("/verification/:token",controller.verifyEmail)
// router.post("/email/verify/:id")

router.get("/info/:id",AUTH,controller.getUserInfo)
router.put("/info/:id",AUTH,controller.updateUser)

module.exports = router