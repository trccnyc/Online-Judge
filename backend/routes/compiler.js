const express = require("express");
const router = express.Router();
const { run } = require("../controllers/runController.js");
const { tokenCheck } = require("../controllers/tokenController.js");
const { submit } = require("../controllers/submitController.js");

router.use(tokenCheck); //can be removed as we check in ../controllers/submitController
router.post("/run", run);
router.post("/:id", submit);

module.exports = router;
