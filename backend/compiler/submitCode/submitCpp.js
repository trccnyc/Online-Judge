const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const TestCase = require("../../models/Testcases");
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

const compile = async (filePath, outPath) => {
  return new Promise((resolve, reject) => {
    exec(`g++ ${filePath} -o${outPath}`, (err, stdout, stderr) => {
      if (err) return reject({ err, stderr });
      if (stderr) return reject(stderr);
      resolve();
    });
  });
};

const submitCpp = async (filePath, id) => {
  const fileName = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${fileName}.exe`);
  await compile(filePath, outPath);
  const testcasesSchema = await TestCase.findOne({ problem: id });
  const testcases = testcasesSchema.testcase;
  return new Promise((resolve, reject) => {
    let b = 0;
    for (let i = 0; i < testcases.length; i++) {
      const startTime = process.hrtime();
      const process1 = exec(`${outPath}`, (err, stdout, stderr) => {
        const [s, nanos] = process.hrtime(startTime);
        console.log(s, nanos);
        if (err) return reject({ err, stderr });
        if (stderr) return reject(stderr);
        const trimmedoutput = stdout.trim();
        console.log(testcases[i].output, trimmedoutput);
        if (testcases[i].output !== trimmedoutput) {
          reject({ message: "WA" });
        }
        b++;
        if (b == testcases.length)
          resolve({ message: "Accepted", time: `${s + nanos / 1e9}` });
      });
      process1.stdin.write(testcases[i].input);
      process1.stdin.end();
    }
  });
};
module.exports = { submitCpp };
