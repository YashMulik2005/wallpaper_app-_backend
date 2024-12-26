const express = require("express");
const { signup, login, getUserDetails } = require("../controllers/User");
const authMiddleware = require("../utils/tokenMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", authMiddleware, getUserDetails);

module.exports = router;
