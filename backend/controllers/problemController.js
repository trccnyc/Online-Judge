const express = require("express");
const router = express.Router();
const Problem = require('../models/Problems');
const addproblem= async (req, res) => {
    try {
  
      //----- obtain info and check if any missing info -----
      const { Title,Description,Examples,timeConstraint,spaceConstraint } = req.body;
      if (!(Title&&Description&&timeConstraint&&spaceConstraint))
        return res.status(400).send("Please enter all info");
  
      //------ check if user already exists ------
      const titleExists = await Problem.findOne({ Title });
      if (titleExists) return res.status(400).send("Problem with same title already exists");
  
      //------ save user to database ------
      let problem = await Problem.create({
        Title,
        Description,
        Examples,
        timeConstraint,
        spaceConstraint,
      });

      res.status(200).json({ message: "Problem added to the dataset", problem });
    } catch (err) {
      console.log("Error while trying to add problem",err);
    }
  };
module.exports = { addproblem };