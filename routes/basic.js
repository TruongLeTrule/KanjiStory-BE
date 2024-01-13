const express = require("express");
const router = express.Router();
const csv = require("csvtojson");
const path = require("path");
const csvFilePath = path.resolve("./basic-radical.csv");

console.log(csvFilePath);

router.route("/").get(async (req, res) => {
  try {
    const jsonArray = await csv().fromFile(csvFilePath);
    res.status(200).json({ jsonArray });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
