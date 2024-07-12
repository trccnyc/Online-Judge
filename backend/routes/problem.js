const express = require("express");
const router = express.Router();
const {
  addProblem,
  fetchProblems,
  fetchProblembyID,
} = require("../controllers/problemController.js");
const { tokenCheck, adminCheck } = require("../controllers/tokenController.js");

router.use(tokenCheck);
router.get("/", fetchProblems);
router.get("/:id", fetchProblembyID);
router.use(adminCheck);
router.post("/addproblem", addProblem);

module.exports = router;
