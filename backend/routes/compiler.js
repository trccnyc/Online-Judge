const express = require("express");
const router = express.Router();
const { compile } = require("../controllers/compileController");
const { tokenCheck } = require("../controllers/tokenController.js");
const { submit } = require("../controllers/submitController.js");
router.use(tokenCheck); //can be removed as we check in ../controllers/submitController
router.post("/run", compile);
router.post("/:id", submit);

module.exports = router;
