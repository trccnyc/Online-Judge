const { generateFile } = require("../compiler/generateFile.js");
const { execCpp, compileCpp } = require("../compiler/execCode/execCpp.js");
const { execPy } = require("../compiler/execCode/execPy.js");
const { execJs } = require("../compiler/execCode/execJs.js");
const fs = require("fs");
const path = require("path");

const execFilesPath = path.join(__dirname, "../compiler", "execFiles");
if (!fs.existsSync(execFilesPath))
  fs.mkdirSync(execFilesPath, { recursive: true });

const run = async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  if (code === undefined)
    return res.status(400).json({ success: false, message: "Empty code!" });

  try {
    const filePath = await generateFile(language, code);
    let output = "";
    if (language === "cpp" || language == "c") {
      const fileName = path.basename(filePath).split(".")[0];
      const execFile = path.join(execFilesPath, `${fileName}.exe`);
      await compileCpp(filePath, execFile);
      output = await execCpp(execFile, input);
    } else if (language === "py") output = await execPy(filePath, input);
    else if (language === "java") output = await execJs(filePath, input);
    return res.json({ success: true, output });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
module.exports = { run };
