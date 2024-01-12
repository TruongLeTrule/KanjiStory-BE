const express = require("express");
const router = express.Router();
const {
  getAllSingleKanji,
  getAllLongKanjiStory,
} = require("../controllers/store");

router.route("/singleKanji").get(getAllSingleKanji);
router.route("/longKanjiStory").get(getAllLongKanjiStory);

module.exports = router;
