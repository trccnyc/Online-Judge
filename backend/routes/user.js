const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  userCheck,
  updateUser,
} = require("../controllers/userController.js");

router.get("/", (req, res) => {
  res.send("HOME PAGE");
});
router.get("/user", userCheck);
router.get("/logout", logout);
router.post("/login", login);
router.post("/register", register);
router.post("/updateuser", updateUser);

module.exports = router;
