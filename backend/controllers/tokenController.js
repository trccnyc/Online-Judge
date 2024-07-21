const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const tokenCheck = (req, res, next) => {
  try {
    const cookie = req.cookies;
    const token = cookie.token;
    if (!token)
      return res.send({ success: false, message: "Login/Signup to continue" });
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.send({ success: false, message: err.message });
      else next();
    });
  } catch (err) {
    console.log(err.message);
  }
};

const adminCheck = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = jwt.decode(token, process.env.SECRET_KEY);
    const admin=await Admin.findOne({email:decode.email});
    if (!admin) return res.send({ success: false, message: "Not authorized to add" });
    next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { tokenCheck, adminCheck };
