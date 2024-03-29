const { generateStoFroMultiKanji } = require("../generateStory");
const MultipleKanjiStory = require("../models/multipleKanji");

const createLongStory = async (req, res) => {
  try {
    const { kanji, type } = req.body;

    // Deprecate the duplicated elements
    const cleanKanji = [...new Set(kanji)];

    const { story, translate } = await generateStoFroMultiKanji({
      kanji: cleanKanji,
      type,
    });
    res
      .status(201)
      .json({
        story,
        translate,
        kanji: cleanKanji,
        storyType: type,
        date: new Date(),
      });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const saveStory = (req, res) => {
  try {
    const multipleKanjiStory = MultipleKanjiStory.create(req.body);
    res.status(201).json({ multipleKanjiStory });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createLongStory, saveStory };
