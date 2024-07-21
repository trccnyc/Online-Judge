const express = require("express");
const router = express.Router();

const { tokenCheck, adminCheck } = require("../controllers/tokenController.js");
const { addContest, fetchContestbyID, fetchContests, calculateResults } = require("../controllers/contestController.js");

router.use(tokenCheck);
router.get("/", fetchContests);
router.get("/:id", fetchContestbyID);
router.get('/results/:id',calculateResults);
router.use(adminCheck);
router.post("/addcontest", addContest);


module.exports = router;