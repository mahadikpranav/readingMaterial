const express = require("express");
const router = express.Router();
const readCSV = require("../utility/readCSV");
const writeCSV = require("../utility/writeCSV");
const dataPath = require('../utility/dataPath.js');


// "/books"
router.get("/", async (req, res) => {
    try {
      const books = await readCSV.getDataFromCSV(dataPath.booksData);
    //   console.log(books);
      res.send("200", books);
    } catch (err) {
      res.send("500", err);
    }
  });
  
  // "/books/:isbn"
  router.get("/:isbn", async (req, res) => {
    try {
      let isbn = req.params.isbn;
      const books = (await readCSV.getDataFromCSV(dataPath.booksData)).filter(
        (book) => book.isbn === isbn
      );
      res.send("200", books);
    } catch (err) {
      res.send("500", err);
    }
  });
  
  // "/books"
  router.post("/", async (req, res) => {
    try {
      let emailId = req.body.email;
    //   console.log(emailId);
      const books = (await readCSV.getDataFromCSV(dataPath.booksData)).filter(
        (book) => book.authors.includes(emailId)
      );
      res.send("200", books);
    } catch (error) {
      res.send("500 " + error);
    }
  });
  
  // "/books/add"
  router.post("/add", async (req, res) => {
    try {
      const output = await writeCSV.addDataToCSV(dataPath.booksData, req.body);
      res.send(201,output);
    } catch (error) {
      res.send("500 " + error);
    }
  });

  module.exports = router;