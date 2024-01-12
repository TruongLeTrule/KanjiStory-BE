const SingleKanji = require("../models/singleKanji");
const MultipleKanjiStory = require("../models/multipleKanji");

const getAllSingleKanji = async (req, res) => {
  try {
    const singleKanjis = await SingleKanji.find({});
    res.status(200).json({ singleKanjis });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllLongKanjiStory = async (req, res) => {
  try {
    const multipleKanjiStory = await MultipleKanjiStory.find({});
    res.status(200).json({ multipleKanjiStory });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllSingleKanji, getAllLongKanjiStory };
