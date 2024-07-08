const { exec } = require("child_process");
const TestCase = require("../../models/Testcases");

const submitJava = async (filePath, id) => {
  const testcasesSchema = await TestCase.findById(id);
  const testcases = testcasesSchema.testcase;
  return new Promise((resolve, reject) => {
    let b = 0;
    for (let i = 0; i < testcases.length; i++) {
      const process = exec(`java ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        const trimmedoutput = stdout.trim();
        console.log(testcases[i].output, trimmedoutput);
        if (testcases[i].output !== trimmedoutput) {
          reject({ message: "WA" });
        }
        b++;
        if (b == testcases.length) resolve({ message: "Accepted" });
      });
      const formattedInput = testcases[i].input
        .replace(/^\s+|\s+$/g, "")
        .split(/\s+/)
        .join("\n");
      process.stdin.write(formattedInput);
      process.stdin.end();
    }
  });
};
module.exports = { submitJava };
