const readCSV = require("./readCSV");
const writeCSV = require("./writeCSV");
const express = require("express");
const book = require('./model/book.model');
const dataPath = require('./dataPath.js');
var cors = require('cors');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5002;
app.use(express.json());
app.listen(PORT, () => {
  console.log("Server Started");
});

app.get("/", async (req, res) => {
  try {
    const books = await readCSV.getDataFromCSV(dataPath.booksData);
    const magazines = await readCSV.getDataFromCSV(dataPath.magazinesData);
    const readingMaterial = [...books, ...magazines];
    readingMaterial.sort((a, b) => a.title.localeCompare(b.title));

    res.send("200", readingMaterial);
  } catch (err) {
    res.send("500", err);
  }
});

app.post("/export", async (req, res) => {
    try {
      const books = await readCSV.getDataFromCSV(dataPath.booksData);
      const magazines = await readCSV.getDataFromCSV(dataPath.magazinesData);
      const readingMaterial = [...books, ...magazines];
      readingMaterial.sort((a, b) => a.title.localeCompare(b.title));
      const output = await writeCSV.exportToCSV(dataPath.newData+"exportedData", readingMaterial);
      res.send(201,output);
    } catch (err) {
      res.send("500", err);
    }
  });
  
 
app.get("/books", async (req, res) => {
  try {
    const books = await readCSV.getDataFromCSV(dataPath.booksData);
    console.log(books);
    res.send("200", books);
  } catch (err) {
    res.send("500", err);
  }
});

app.get("/books/:isbn", async (req, res) => {
  try {
    let isbn = req.params.isbn;
    const books = (await readCSV.getDataFromCSV(dataPath.booksData)).filter(
      (book) => book.isbn === isbn
    );
    // console.log(books.f);
    res.send("200", books);
  } catch (err) {
    res.send("500", err);
  }
});

app.post("/books", async (req, res) => {
  try {
    let emailId = req.body.email;
    console.log(emailId);
    const books = (await readCSV.getDataFromCSV(dataPath.booksData)).filter(
      (book) => book.authors.includes(emailId)
    );
    res.send("200", books);
  } catch (error) {
    res.send("500 " + error);
  }
});

app.post("/books/add", async (req, res) => {
  try {
    const output = await writeCSV.addDataToCSV(dataPath.booksData, req.body);
    res.send(201,output);
  } catch (error) {
    res.send("500 " + error);
  }
});

app.get("/magazines", async (req, res) => {
  try {
    const magazines = await readCSV.getDataFromCSV(dataPath.magazinesData);
    console.log(magazines);
    res.send("200", magazines);
  } catch (err) {
    res.send("500", err);
  }
});

app.get("/magazines/:isbn", async (req, res) => {
  try {
    let isbn = req.params.isbn;
    const magazines = (
      await readCSV.getDataFromCSV(dataPath.magazinesData)
    ).filter((mag) => mag.isbn === isbn);
    res.send("200", magazines);
  } catch (err) {
    res.send("500", err);
  }
});
app.post("/magazines", async (req, res) => {
  try {
    let emailId = req.body.email;
    console.log(emailId);
    const magazines = (
      await readCSV.getDataFromCSV(dataPath.magazinesData)
    ).filter((magazine) => magazine.authors.includes(emailId));
    res.send("200", magazines);
  } catch (error) {
    res.send("500 " + error);
  }
});

app.post("/magazines/add", async (req, res) => {
    try {
      const output = await writeCSV.addDataToCSV(dataPath.magazinesData, req.body);
      res.send(201,output);
    } catch (error) {
      res.send("500 " + error);
    }
  });
  
