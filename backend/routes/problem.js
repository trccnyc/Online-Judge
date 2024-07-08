const express = require("express");
const router = express.Router();
const {
  addproblem,
  addtestcase,
} = require("../controllers/problemController.js");
const Problem = require("../models/Problems");
const { tokenCheck, adminCheck } = require("../controllers/tokenController.js");

router.use(tokenCheck);
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json(problems);
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    res.json(problem);
  } catch (err) {
    console.log(err.message);
  }
});
router.use(adminCheck);
router.post("/addproblem", addproblem);
router.post("/addtestcase", addtestcase);

module.exports = router;
