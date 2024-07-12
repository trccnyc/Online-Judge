const { exec } = require("child_process");
const Problem = require("../../models/Problems");

const compileCpp = async (filePath, execFile) => {
  return new Promise((resolve, reject) => {
    exec(`g++ ${filePath} -o${execFile}`, (err, stdout, stderr) => {
      if (err)
        return reject({
          type: "Compilation Error",
          message: stderr || err.message,
        });
      if (stderr) return reject({ type: "Compilation Error", message: stderr });
      resolve();
    });
  });
};

const execCpp = async (execFile, input, id) => {
  const problem = await Problem.findById(id);
  const timeLimit = problem.limits.time;
  const spaceLimitKB = problem.limits.space * 1024 * 4;

  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();
    const execProcess = exec(
      `${execFile}`,
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
module.exports = { execCpp, compileCpp };
