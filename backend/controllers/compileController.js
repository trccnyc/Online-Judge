const { generateFile } = require("../compiler/generateFileController.js");
const { execCpp } = require("../compiler/execCode/execCpp.js");
const { execPy } = require("../compiler/execCode/execPy.js");
const { execJs } = require("../compiler/execCode/execJs.js");

const compile = async (req, res) => {
  console.log(req.cookies);
  const { language = "cpp", code, input } = req.body;
  if (code === undefined)
    return res.status(400).json({ success: false, message: "Empty code!" });
  try {
    const filePath = await generateFile(language, code);
    let output = "";
    if (language === "cpp" || language === "c")
      output = await execCpp(filePath, input);
    if (language === "py") output = await execPy(filePath, input);
    if (language === "js") output = await execJs(filePath, input);
    return res.json({ filePath, input, output });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error : " + err.message });
  }
};
module.exports = { compile };
