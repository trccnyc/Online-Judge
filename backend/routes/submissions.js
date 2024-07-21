const express = require("express");
const router = express.Router();
const { tokenCheck, adminCheck } = require("../controllers/tokenController.js");
const {allSubmissions,problemSubmissions}=require('../controllers/userSubmissionController.js')

router.use(tokenCheck);
router.get('/',allSubmissions);
router.get('/:id',problemSubmissions);

module.exports = router;
