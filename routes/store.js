const express = require("express");
const router = express.Router();
const {
  getAllSingleKanji,
  getAllLongKanjiStory,
  deleteKanji,
} = require("../controllers/store");

router.route("/singleKanji").get(getAllSingleKanji);
router.route("/singleKanji/:id").delete(deleteKanji);
router.route("/longKanjiStory").get(getAllLongKanjiStory);

module.exports = router;
