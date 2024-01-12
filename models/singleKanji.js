const mongoose = require("mongoose");

const SingleKanjiSchema = new mongoose.Schema({
  radical: Object,
  kanji: Object,
  story: String,
  storyType: String,
});

module.exports = mongoose.model("SingleKanji", SingleKanjiSchema);
