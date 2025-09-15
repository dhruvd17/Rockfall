const express = require("express");
const router = express.Router();
const { showLogin, loginUser, showRegister, registerUser } = require("../controllers/authController");


router.get("/login", showLogin).post("/login", loginUser);

router.get("/register", showRegister).post("/register", registerUser);

module.exports = router;
