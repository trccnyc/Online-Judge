const express = require("express");
const router = express.Router();
const { DBconnection } = require("../database/db.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const register = async (req, res) => {
  try {

    //----- obtain info and check if any missing info -----
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password))
      return res.status(400).send("Please enter all info");

    //-------- valid email -------
    if (!validator.isEmail(email)) {
      return res.status(400).send("Email is not valid");
    }

    //------ check if user already exists ------
    const emailused = await User.findOne({ email });
    if (emailused) return res.status(400).send("Email already in use");

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
    console.log(token);
    user.token = token;
    user.temp = "temp";
    user.password = undefined;

    //------send responce with token------------
    res.status(200).json({ message: "Register successfull", user, token });
  } catch (err) {
    console.log("Error while trying to register",err);
  }
};


const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!(email && password))
      return res.status(400).send("Please enter all info");

    //----- valid email check-------
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Register to login");

    //-----password check---------
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Incorrect password");

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
    };

    //---------send the token---------
    res.status(200).cookie("token", token, options).json({
      message: "Login succesfull",
      success: true,
      token,
    });
  } catch (err) {
    console.log("Error while trying to login",err);
  }
};


module.exports = { register, login };
