const mongoose = require("mongoose");

const SingleKanjiSchema = new mongoose.Schema({
  kanjiInfo: Object,
  story: String,
  storyType: String,
});

module.exports = mongoose.model("SingleKanji", SingleKanjiSchema);
