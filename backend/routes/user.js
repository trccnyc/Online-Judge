const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController.js");
const {tokenCheck}=require('../controllers/tokenController.js')
router.get("/", (req, res) => {
  console.log("someone visited Home page");
  res.send("HOME PAGE");
});
router.post("/login", login);
router.post("/register", register);

module.exports = router;
