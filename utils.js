// Import file system - fs module
const fs = require("fs");

// Function to write data to JSON file (called from model when new product created) - takes in filename/content
const writeDataToFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // Initialise blank body
      let body = "";

      req.on("data", (chunk) => {
        // Need to convert buffer to string
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  writeDataToFile,
  getPostData,
};
