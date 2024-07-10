const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    //----- obtain info and check if any missing info -----
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password))
      return res.status(400).send({
        sucess: false,
        message: "Enter all info",
      });

    //-------- valid email -------
    if (!validator.isEmail(email)) {
      return res.status(400).send({
        sucess: false,
        message: "Email is not valid",
      });
    }

    //------ check if user already exists ------
    const emailused = await User.findOne({ email });
    if (emailused)
      return res.status(400).send({
        sucess: false,
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
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user.token = token;
    user.password = undefined;

    //------send responce with token------------
    res.status(200).json({
      sucess: false,
      message: "Successfull Registered",
      user,
      token,
    });
  } catch (err) {
    console.log("Error while trying to register", err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res.status(400).send({
        sucess: false,
        message: "Please enter all info",
      });

    //----- valid email check-------
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({
        sucess: false,
        message: "Register to login",
      });

    //-----password check---------
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).send({
        sucess: false,
        message: "Incorrect password",
      });

    //------- jwt --------
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user.token = token; //not working
    user.password = undefined;

    //-----cookies-------
    const options = {
      expiresIn: new Date(Date.now() + 86400 * 1000),
      httpOnly: true, //only manipulated by server
      secure:true,
      sameSite: "None",
    };
    //---------send the token---------
    res.status(200).cookie("token", token, options).json({
      message: "Login succesfull",
      success: true,
      user,
      token
    });
  } catch (err) {
    console.log("Error while trying to login", err);
  }
};
const logout=async(req, res) => {
  console.log('Logging out');
  res.clearCookie('token');
  res.status(200).send({ message: 'Logged out successfully' });
};

module.exports = { register, login ,logout};
