const readCSV = require("./utility/readCSV");
const writeCSV = require("./utility/writeCSV");
const express = require("express");
const book = require("./model/book.model");
const dataPath = require("./utility/dataPath.js");
const cors = require("cors");
const booksRouter = require("./routes/books.route");
const magazinesRouter = require("./routes/magazines.route");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5002;
app.use(express.json());
server = app.listen(PORT, () => {
  console.log("Server Started");
});

app.get("/", async (req, res) => {
  try {
    const books = await readCSV.getDataFromCSV(dataPath.booksData);
    const magazines = await readCSV.getDataFromCSV(dataPath.magazinesData);
    const readingMaterial = [...books, ...magazines];
    readingMaterial.sort((a, b) => a.title.localeCompare(b.title));
    res.status(200).send(readingMaterial);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/export", async (req, res) => {
  try {
    const books = await readCSV.getDataFromCSV(dataPath.booksData);
    const magazines = await readCSV.getDataFromCSV(dataPath.magazinesData);
    const readingMaterial = [...books, ...magazines];
    readingMaterial.sort((a, b) => a.title.localeCompare(b.title));
    const output = await writeCSV.exportToCSV(
      dataPath.newData + "exportedData",
      readingMaterial
    );
    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.use("/books", booksRouter);
app.use("/magazines", magazinesRouter);

module.exports = server;
