const express = require("express");
const router = express.Router();
const readCSV = require("../utility/readCSV");
const writeCSV = require("../utility/writeCSV");
const dataPath = require("../utility/dataPath.js");

// "/books"
router.get("/", async (req, res) => {
  try {
    const books = await readCSV.getDataFromCSV(dataPath.booksData);
    //   console.log(books);
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// "/books/:isbn"
router.get("/:isbn", async (req, res) => {
  try {
    let isbn = req.params.isbn;
    const books = (await readCSV.getDataFromCSV(dataPath.booksData)).filter(
      (book) => book.isbn === isbn
    );
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// "/books/add"
router.post("/add", async (req, res) => {
  try {
    const output = await writeCSV.addDataToCSV(dataPath.booksData, req.body);
    res.status(201).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
