const Problem = require("../models/Problems");
const TestCase = require("../models/Testcases");

const addproblem = async (req, res) => {
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
    } = req.body;
    if (
      !(
        title &&
        description &&
        examples &&
        limits &&
        input_format &&
        output_format
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
      });

      res.status(200).json({
        success: true,
        message: "Problem added to the dataset",
        problem,
      });
    }
  } catch (err) {
    console.log("Error while trying to add problem", err);
  }
};
const addtestcase = async (req, res) => {
  try {
    console.log(req.body);
    const { problem, testcase } = req.body;
    if (!(problem && testcase))
      return res.status(400).send({
        success: false,
        message: "Please enter all info",
      });

    //------ check if user already exists ------
    const titleExists = await Problem.findById(problem);
    if (!titleExists) {
      return res.status(400).send({
        success: true,
        message: "Problem with the given id not found",
      });
    }

    //------ save user to database ------
    let testcases = await TestCase.findOneAndUpdate(
      { problem: problem },
      { testcase: testcase },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Problem added to the dataset", testcase });
  } catch (err) {
    console.log("Error while trying to add problem", err);
  }
};

module.exports = { addproblem, addtestcase };
