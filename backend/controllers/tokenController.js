const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const tokenCheck = (req, res, next) => {
  try {
    const cookie = req.cookies;
    console.log(req);
    const token = cookie.token;
    if (!token) res.send("Login/Signup to continue");
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) res.send(err.message);
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
    const email = decode.email;
    const user = await Admin.findOne({ email });
    if (!user) res.send("Not authorized to add");
    next();
  } catch (err) {
    console.log(err.message);
  }
};


module.exports = { tokenCheck, adminCheck };
