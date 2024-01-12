const mongoose = require("mongoose");

const MultipleKanjiStorySchema = new mongoose.Schema({
  kanji: Array,
  story: String,
  storyType: String,
});

module.exports = mongoose.model("MultipleKanjiStory", MultipleKanjiStorySchema);
