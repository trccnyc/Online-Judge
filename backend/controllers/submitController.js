const { generateFile } = require("../compiler/generateFile.js");
const { submitCpp } = require("../compiler/submitCode/submitCpp.js");
const { submitPy } = require("../compiler/submitCode/submitPy.js");
const { submitJava } = require("../compiler/submitCode/submitJava.js");
const { compileCpp } = require("../compiler/execCode/execCpp.js");
const Submission = require("../models/Submissions.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const execFilesPath = path.join(__dirname, "../compiler", "execFiles");
if (!fs.existsSync(execFilesPath))
  fs.mkdirSync(execFilesPath, { recursive: true });

const submit = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;
  if (!token) return res.json({ success: false, message: "Login to Submit" });
  const decode = jwt.decode(token, process.env.SECRET_KEY);
  const email = decode.email;
  const user_id = await User.findOne({ email });
  const { language = "cpp", code } = req.body;
  if (code === undefined)
    return res.status(400).json({ success: false, message: "Empty code!" });

  
  try {
    const filePath = await generateFile(language, code);
    let output = "";
    if (language === "cpp" || language === "c") {
      const fileName = path.basename(filePath).split(".")[0];
      const execFile = path.join(execFilesPath, `${fileName}.exe`);
      try{
        await compileCpp(filePath, execFile);
      }catch(err){
        return res.json({ success: true, output:err })
      }
      
      try{
        output = await submitCpp(execFile, id);
      }catch(err){
        return res.json({ success: true, output:err })
      }
    } else if (language === "py") {
      output = await submitPy(filePath, id);
    } else if (language === "java") output = await submitJava(filePath, id);

    await Submission.create({
      user: user_id,
      problem: id,
      language,
      code,
      result: output.message,
    });
    return res.json({ success: true, output });
  } catch (error) {
    res.status(500).json({ success: false, error  });
  }
};

module.exports = { submit };
