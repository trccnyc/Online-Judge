const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const execJs = async (filePath, input) => {
  return new Promise((resolve, reject) => {
    const process1 = exec(`node ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
    if (input) {
      const formattedInput = input.trim().split(/\s+/).join("\n");
      console.log(formattedInput);
      process1.stdin.write(formattedInput);
      process1.stdin.end();
    }
  });
};
module.exports = { execJs };
