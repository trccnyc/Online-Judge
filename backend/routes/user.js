const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  userCheck,
} = require("../controllers/userController.js");

router.get("/", (req, res) => {
  res.send("HOME PAGE");
});
router.get("/user", userCheck);
router.get("/logout", logout);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
