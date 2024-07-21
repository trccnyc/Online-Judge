const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Admin = require("../models/Admin");

const register = async (req, res) => {
  try {
    //----- obtain info and check if any missing info -----
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password))
      return res.status(400).send({
        success: false,
        message: "Enter all info",
      });

    //-------- valid email -------
    if (!validator.isEmail(email)) {
      return res.status(400).send({
        success: false,
        message: "Email is not valid",
      });
    }

    //------ check if user already exists ------
    const emailused = await User.findOne({ email });
    if (emailused)
      return res.status(400).send({
        success: false,
        message: "Email already in use",
      });

    //------ encrypt password ------
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    //------ save user to database ------
    let user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
    });

    //------- json web token --------
    const token = jwt.sign(
      { id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    user.password = undefined;

    const options = {
      expiresIn: new Date(Date.now() + 86400 * 1000),
      httpOnly: true, //only manipulated by server
      secure: true,
      sameSite: "None",
    };
    //------send responce with token------------
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (err) {
    console.log("Error in ./controllers/userController-register", err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res.status(400).send({
        success: false,
        message: "Please enter all info",
      });

    //----- valid email check-------
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({
        success: false,
        message: "Register to login",
      });

    //-----password check---------
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).send({
        success: false,
        message: "Incorrect password",
      });

    //------- jwt --------
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    user.token = token; //not working
    user.password = undefined;

    //-----cookies-------
    const options = {
      expiresIn: new Date(Date.now() + 86400 * 1000),
      httpOnly: true, //only manipulated by server
      secure: true,
      sameSite: "None",
    };
    //---------send the token---------
    res.status(200).cookie("token", token, options).json({
      message: "Login succesfull",
      success: true,
      user,
      token,
    });
  } catch (err) {
    console.log("Error in ./controllers/userController-login", err);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in ./controllers/userController-logout", err);
  }
};
const updateUser=async(req,res)=>{
  try{
    const cookie = req.cookies;
    const token = cookie.token;
    if (!token)return res.send({ success: false, message: "Token not found" });
    const decode = jwt.decode(token, process.env.SECRET_KEY);
    console.log(decode);
    if(!decode.email)return res.send({success: false, message: "Invalid Token"})
    const {firstName,lastName}=req.body;
    const updatedName=await User.findOneAndUpdate({email:decode.email},{firstName,lastName});
  }catch(err){
    console.log("Error in ./controllers/userController-updateUser",err)
  }
}
const userCheck = async (req, res) => {
  try {
    const cookie = req.cookies;
    const token = cookie.token;
    if (!token) {
      return res.send({ success: false, message: "Token not found" });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.send({ success: false, message: err.message });
      }
      decoded.admin = false;
      decoded.success = true;
      const admin = await Admin.findOne({ email: decoded.email });
      if (admin) decoded.admin = true;
      res.send(decoded);
    });
  } catch (err) {
    console.log("Error in ./controllers/userController-userCheck ", err);
  }
};

module.exports = { register, login, logout, userCheck,updateUser };
