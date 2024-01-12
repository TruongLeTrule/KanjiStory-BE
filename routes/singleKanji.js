const express = require("express");
const router = express.Router();

const {
  createKanjiStory,
  saveKanjiStory,
  regenerateStory,
} = require("../controllers/singleKanji");

router.route("/:kanji/:storyType").get(createKanjiStory);
router.route("/regenerateStory").post(regenerateStory);
router.route("/").post(saveKanjiStory);

module.exports = router;
