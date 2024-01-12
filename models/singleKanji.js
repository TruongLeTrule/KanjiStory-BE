const mongoose = require("mongoose");

const SingleKanjiSchema = new mongoose.Schema({
  kanjiInfo: Object,
  story: String,
  storyType: Object,
});

module.exports = mongoose.model("SingleKanji", SingleKanjiSchema);
