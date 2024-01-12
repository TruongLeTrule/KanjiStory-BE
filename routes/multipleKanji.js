const express = require("express");
const router = express.Router();
const { createLongStory, saveStory } = require("../controllers/multipleKanji");

// Generate story from multiple kanjis
router.route("/generateStory").post(createLongStory);
// Save story to database
router.route("/saveStory").post(saveStory);

module.exports = router;
