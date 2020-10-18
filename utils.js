// 'fs' module deals with files system
const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

function writeDataToFile(fileName, content) {
  // 'utf8' is encoding. Last argument is a f. with a possible error
  fs.writeFileSync(fileName, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        //   When resolves the promis, it returns the 'body' data
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
