const axios = require("axios");
const SingleKanji = require("../models/singleKanji");
const { generateKanjiStory } = require("../generateStory");

// Get kanji specific information
const getKanjiInfo = async (kanji, type) => {
  const options = {
    method: "GET",
    url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${kanji}`,
    headers: {
      "X-RapidAPI-Key": "cf66fc0103msh70da5e8a14c1e6ep105fd9jsn6c3453c6dbfa",
      "X-RapidAPI-Host": "kanjialive-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const { radical, kanji } = response.data;

    // Generate story from kanji and radical meaning and type of story
    const story = await generateKanjiStory({
      radical: radical.meaning.english,
      kanji: kanji.meaning.english,
      type,
    });
    return { radical, kanji, story, storyType: type, date: new Date() };
  } catch (error) {
    console.error(error);
  }
};

// Get the kanji information and story about kanji
const createKanjiStory = async (req, res) => {
  try {
    const storyType = req.params.storyType;
    const queryKanji = req.params.kanji;
    let kanjiArr = [];

    // Split each kanji in the query to character
    for (var i = 0; i < queryKanji.length; i++) {
      kanjiArr.push(queryKanji[i]);
    }

    // Deprecate duplicated elements
    kanjiArr = [...new Set(kanjiArr)];

    // Get story within character
    const kanjiInfo = await Promise.all(
      kanjiArr.map(async (kanji) => {
        const result = await getKanjiInfo(kanji, storyType);
        return result;
      })
    );
    res.status(200).json({ kanjiInfo });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// Regenerate the story
const regenerateStory = async (req, res) => {
  try {
    const { storyType, radical, kanji } = req.body;

    // Split meaning in to array
    const radicalMean = radical.meaning.english;
    const kanjiMean = kanji.meaning.english;

    // Generate story from kanji, radical and type of story
    const story = await generateKanjiStory({
      radical: radicalMean,
      kanji: kanjiMean,
      type: storyType,
    });
    res.status(200).json({ story });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const saveKanjiStory = (req, res) => {
  try {
    const singleKanji = SingleKanji.create(req.body);
    res.status(201).json({ singleKanji });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createKanjiStory, saveKanjiStory, regenerateStory };
