const fs = require("fs");
const { parse } = require("csv-parse");
const book = require('./model/book.model');

function getDataFromCSV(filePath) {
  const data = [];
  // "./data/authors.csv"
  return new Promise((resolve, reject) => {
  fs.createReadStream(filePath)
    .pipe(parse({ columns:true, delimiter: ";",trim: true}))
    .on("data", (row) => {
        data.push(row);
    })
    .on("end", () => {
      console.log(data);
      resolve(data);
    })
    .on("error", (error) => {
      console.log(error.message);
      reject(error);
    });
  });
}

module.exports = {
  getDataFromCSV
};
