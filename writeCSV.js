const fs = require("fs");
const { stringify } = require("csv-stringify");

function addDataToCSV(filePath, data) {
  console.log(filePath, data);
  return new Promise((resolve, reject) => {
    stringify(
      data,
      {
        header: false,
      },
      function (err, output) {
        if (err) reject(err);
        fs.appendFile(filePath, output, (error, result) => {
          if (error) reject(error);
          resolve("Data inserted successfully");
        });
      }
    );
  });
}

function exportToCSV(filePath, data) {
  console.log(filePath, data);
  return new Promise((resolve, reject) => {
    stringify(
      data,
      {
        header: true,
      },
      function (err, output) {
        if (err) reject(err);
        fs.writeFile(filePath, output, (error, result) => {
          if (error) reject(error);
          resolve("Data inserted successfully");
        });
      }
    );
  });
}

module.exports = {
  addDataToCSV,
  exportToCSV,
};
