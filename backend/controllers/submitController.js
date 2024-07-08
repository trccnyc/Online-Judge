const { generateFile } = require("../compiler/generateFileController.js");
const { submitCpp } = require("../compiler/submitCode/submitCpp.js");
const { submitPy } = require("../compiler/submitCode/submitPy.js");
const { submitJava } = require("../compiler/submitCode/submitJava.js");
const Submission = require("../models/Submissions.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const submit = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ message: "Login to Submit" });
  const decode = jwt.decode(token, process.env.SECRET_KEY);
  const email = decode.email;
  const user_id = await User.findOne({ email });
  console.log(user_id);
  const { language = "cpp", code, id } = req.body;
  if (code === undefined)
    return res.status(400).json({ success: false, message: "Empty code!" });
  try {
    const filePath = await generateFile(language, code);
    let output = "";
    if (language === "cpp" || language === "c")
      output = await submitCpp(filePath, id, email);
    if (language === "py") output = await submitPy(filePath, id);
    if (language === "java") output = await submitJava(filePath, id);
    await Submission.create({
      user: user_id,
      problem: id,
      language,
      code,
      result: output.message,
    });
    return res.json({ filePath, output });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error : " + err.message });
  }
};

module.exports = { submit };
