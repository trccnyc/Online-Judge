const express = require("express");
const router = express.Router();
const { DBconnection } = require("../database/db.js");
const cookieParser = require("cookie-parser");
const { register, login } = require("../controllers/userController.js");
const { addproblem } = require("../controllers/problemController.js");
const Problem = require('../models/Problems');
require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
DBconnection();

router.get("/", (req, res) => {
  console.log("someone visited Home page");
});
router.post("/login", login);
router.post("/register", register);
router.post("/addproblem", addproblem);
router.get("/problemset",async (req,res)=>{
  const problems=await Problem.find({});
  res.json(problems);
  console.log(problems);
});
router.use((req, res) => {
  res.status(404).send("Page not found");
});
module.exports = router;
