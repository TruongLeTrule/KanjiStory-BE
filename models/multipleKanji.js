const mongoose = require("mongoose");

const MultipleKanjiStorySchema = new mongoose.Schema({
  kanji: Array,
  story: String,
  storyType: String,
  date: Date,
});

module.exports = mongoose.model("MultipleKanjiStory", MultipleKanjiStorySchema);
