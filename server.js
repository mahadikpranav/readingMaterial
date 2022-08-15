const readCSV = require("./utility/readCSV");
const writeCSV = require("./utility/writeCSV");
const express = require("express");
const book = require('./model/book.model');
const dataPath = require('./utility/dataPath.js');
const cors = require('cors');
const booksRouter = require('./routes/books.route');
const magazinesRouter = require('./routes/magazines.route');


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
  
  app.use('/books', booksRouter);
  app.use('/magazines', magazinesRouter);
