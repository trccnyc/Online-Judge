const { exec } = require("child_process");
const Problem = require("../../models/Problems");

const submitCpp = async (execFile, id) => {
  const problem = await Problem.findById(id);
  const timeLimit = problem.limits.time;
  const spaceLimitKB = problem.limits.space * 1024 * 4;
  const testcases = problem.testcases;

  return new Promise((resolve, reject) => {
    let testcases_left = testcases.length;
    let totalTime = 0;
    let flag = false;

    const processTestcase = (i) => {
      if (flag) return;

      const startTime = process.hrtime();
      const execProcess = exec(`${execFile}`, (err, stdout, stderr) => {
        if (flag) return;
        const [s, nanos] = process.hrtime(startTime);
        const elapsedTime = s + nanos / 1e9;
        totalTime += elapsedTime;

        if (err) {
          flag = true;
          if (err.signal == "SIGTERM") {
            return reject({
              type: "Time Limit Exceeded",
              message: `Time Limit Exceeded on TestCase ${i + 1}`,
              time: timeLimit
            });
          } else {
            return reject({
              type: "Runtime Error",
              message: stderr || err.message,
              time: totalTime
            });
          }
        } else if (elapsedTime > timeLimit) {
          flag = true;
          return reject({
            type: "Time Limit Exceeded",
            message: `Time Limit Exceeded on TestCase ${i + 1}`,
            testcase: testcases[i],
            time: totalTime 
          });
        } else if (stderr) {
          flag = true;
          return reject({
            type: `Runtime Error on TestCase ${i + 1}`,
            message: stderr, 
            time: totalTime
          });
        }

        const trimmedoutput = stdout.trim();
        if (testcases[i].output !== trimmedoutput) {
          flag = true;
          return reject({
            type: "Wrong Answer",
            message: `Wrong Answer on TestCase ${i + 1}`,
            testcase: testcases[i].input,
            expected_output: testcases[i].output,
            your_output: trimmedoutput,
            time: totalTime
          });
        }

        testcases_left--;
        if (testcases_left === 0) {
          resolve({ message: "Accepted", time: totalTime  });
        } else {
          processTestcase(i + 1);
        }
      });

      execProcess.stdin.write(testcases[i].input);
      execProcess.stdin.end();
    };

    processTestcase(0);
  });
};

module.exports = { submitCpp };
