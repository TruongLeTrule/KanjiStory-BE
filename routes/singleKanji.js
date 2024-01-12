const express = require("express");
const router = express.Router();

const {
  createKanjiStory,
  saveKanjiStory,
} = require("../controllers/singleKanji");

router.route("/:kanji/:storyType").get(createKanjiStory);
router.route("/").post(saveKanjiStory);

module.exports = router;
