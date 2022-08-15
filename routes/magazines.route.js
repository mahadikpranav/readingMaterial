const express = require("express");
const router = express.Router();
const readCSV = require("../utility/readCSV");
const writeCSV = require("../utility/writeCSV");
const dataPath = require("../utility/dataPath.js");

//"/magazines"
router.get("/", async (req, res) => {
  try {
    const magazines = await readCSV.getDataFromCSV(dataPath.magazinesData);
    //   console.log(magazines);
    res.status(200).send(magazines);
  } catch (error) {
    res.status(500).send(error);
  }
});

//"/magazines/:isbn"
router.get("/:isbn", async (req, res) => {
  try {
    let isbn = req.params.isbn;
    const magazines = (
      await readCSV.getDataFromCSV(dataPath.magazinesData)
    ).filter((mag) => mag.isbn === isbn);
    res.status(200).send(magazines);
  } catch (error) {
    res.status(500).send(error);
  }
});

//"/magazines"
router.post("/", async (req, res) => {
  try {
    let emailId = req.body.email;
    //   console.log(emailId);
    const magazines = (
      await readCSV.getDataFromCSV(dataPath.magazinesData)
    ).filter((magazine) => magazine.authors.includes(emailId));
    res.status(200).send(magazines);
  } catch (error) {
    res.send("500 " + error);
  }
});

//"/magazines/add"
router.post("/add", async (req, res) => {
  try {
    const output = await writeCSV.addDataToCSV(
      dataPath.magazinesData,
      req.body
    );
    res.status(201).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
