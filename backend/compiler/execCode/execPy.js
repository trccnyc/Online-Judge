const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const execPy = async (filePath, input) => {
  return new Promise((resolve, reject) => {
    const process = exec(`python ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
    if (input) {
      const formattedInput = input
        .replace(/^\s+|\s+$/g, "")
        .split(/\s+/)
        .join("\n");
      process.stdin.write(formattedInput);
      process.stdin.end();
    }
  });
};
module.exports = { execPy };
