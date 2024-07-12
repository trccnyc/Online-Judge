const { exec } = require("child_process");
const Problem = require("../../models/Problems");

const submitCpp = async (execFile, id) => {
  const problem = await Problem.findById(id);
  const timeLimit = problem.limits.time;
  const spaceLimitKB = problem.limits.space * 1024 * 4;
  const testcases = problem.testcases;

  return new Promise((resolve, reject) => {
    let b = testcases.length;
    let totalTime = 0;
    let flag = false;
    for (let i = 0; i < testcases.length; i++) {
      const startTime = process.hrtime();
      const execProcess = exec(`${execFile}`, (err, stdout, stderr) => {
        if (flag) return;
        const [s, nanos] = process.hrtime(startTime);
        const elapsedTime = s + nanos / 1e9;
        totalTime += elapsedTime;
        if (err) {
          if (err.signal == "SIGTERM")
            return reject({
              type: "Time Limit Exceeded",
              message: "Time Limit Exceeded",
            });
          else {
            return reject({
              type: "Runtime Error",
              message: stderr || err.message,
            });
          }
        } else if (elapsedTime > timeLimit)
          return reject({
            type: "Time Limit Exceeded",
            message: "Time Limit Exceeded",
          });
        else if (stderr)
          return reject({ type: "Runtime Error", message: stderr });
        const trimmedoutput = stdout.trim();
        if (testcases[i].output !== trimmedoutput) {
          flag = true;
          return reject({
            type: "Wrong Answer",
            message: "Wrong Answer",
            expected_output: testcases[i].output,
            your_output: trimmedoutput,
          });
        }
        b--;
        if (b === 0)
          resolve({ message: "Accepted", time: totalTime / (i + 1) });
      });
      
      execProcess.stdin.write(testcases[i].input);
      execProcess.stdin.end();
    }
  });
};
module.exports = { submitCpp };
