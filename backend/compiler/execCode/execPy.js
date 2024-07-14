const { exec } = require("child_process");
const fs = require("fs");
const Problem = require("../../models/Problems");
const path = require("path");

const execPy = async (filePath, input) => {

  const timeLimit = 5;

  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();
    const execProcess = exec(
      `python ${filePath}`,
      { timeout: timeLimit * 1000, maxBuffer: 1024 * 4096 },
      (err, stdout, stderr) => {
        const [s, nanos] = process.hrtime(startTime);
        const elapsedTime = s + nanos / 1e9;
        if (err) {
          if (err.signal == "SIGTERM")
            reject({
              type: "Time Limit Exceeded",
              message: "Time Limit Exceeded",
            });
          else {
            reject({
              type: "Runtime Error",
              message: stderr || err.message,
            });
          }
        } else if (elapsedTime > timeLimit)
          reject({
            type: "Time Limit Exceeded",
            message: "Time Limit Exceeded",
          });
        else if (stderr)
          reject({
            type: "Runtime Error",
            message: stderr,
          });
        else resolve(stdout);
      }
    );

    execProcess.stdin.write(input);
    execProcess.stdin.end();
  });
};
module.exports = { execPy };
