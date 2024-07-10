const express = require("express");
const router = express.Router();
const { register, login,logout } = require("../controllers/userController.js");
const {userCheck}=require('../controllers/tokenController.js');
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.js");


router.get("/", (req, res) => {
  console.log("someone visited Home page");
  res.send("HOME PAGE");
});
router.get('/user',userCheck);
router.get("/logout", logout);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
