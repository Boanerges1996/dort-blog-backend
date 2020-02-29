const express = require("express")
const AUTH = require("../auth-token")
let controller = require("../controllers/user")

const router = express.Router()
router.post('/signup',controller.registerUser)
router.post("/login",controller.login)
router.get("/verification/:token",controller.verifyEmail)
// router.post("/email/verify/:id")

// router.get("/user/info",AUTH)

// router.put("/user/info",AUTH)

module.exports = router