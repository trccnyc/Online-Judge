const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

const execCpp = async (filePath, input) => {
  const fileName = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${fileName}.exe`);
  return new Promise((resolve, reject) => {
    const process = exec(
      `g++ ${filePath} -o${outPath} && ${outPath}`,
      (err, stdout, stderr) => {
        if (err) reject({ err, stderr });
        if (stderr) reject(stderr);
        resolve(stdout);
      }
    );
    if (input) {
      process.stdin.write(input);
      process.stdin.end();
    }
  });
};
module.exports = { execCpp };
