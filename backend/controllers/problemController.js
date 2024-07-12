const Problem = require("../models/Problems");

const addProblem = async (req, res) => {
  try {
    console.log(req.body);
    const {
      title,
      description,
      examples,
      limits,
      input_format,
      output_format,
      constraints,
      testcases,
    } = req.body;
    if (
      !(
        title &&
        description &&
        examples &&
        limits &&
        input_format &&
        output_format &&
        testcases
      )
    )
      return res.status(400).send({
        success: false,
        message: "Please enter all info",
      });

    //------ check if user already exists ------
    const titleExists = await Problem.findOne({ title });
    if (titleExists) {
      const updatedProblem = await Problem.findOneAndUpdate(
        { title },
        {
          description,
          examples,
          limits,
          input_format,
          output_format,
          constraints,
          testcases,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Problem Updated in the dataset",
        updatedProblem,
      });
    } else {
      //------ save user to database ------
      let problem = await Problem.create({
        title,
        description,
        examples,
        limits,
        input_format,
        output_format,
        constraints,
        testcases,
      });

      res.status(200).json({
        success: true,
        message: "Problem added to the dataset",
        problem,
      });
    }
  } catch (err) {
    console.log("Error in ./controllers/problemController-addProblem", err);
  }
};
const fetchProblembyID = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    res.json({ success: true, problem });
  } catch (err) {
    console.log(
      "Error in ./controllers/problemController-fetchProblembyID",
      err
    );
  }
};
const fetchProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json({ success: true, problems });
  } catch (err) {
    console.log("Error in ./controllers/problemController-fetchProblems", err);
  }
};

module.exports = { addProblem, fetchProblems, fetchProblembyID };
