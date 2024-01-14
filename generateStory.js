require("dotenv").config();
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.ENDPOINT;
const azureApiKey = process.env.API_KEY;

// Generate story from kanji components
const generateKanjiStory = async ({ radical, kanji, type }) => {
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );
  const deploymentId = "GPT35TURBO";

  console.log(radical);
  // Split meaning in to array and add ""
  const formattedRad = radical.split(",").map((word) => `'${word.trim()}'`);
  const formattedKan = kanji.split(",").map((word) => `'${word.trim()}'`);

  const message = [
    {
      role: "user",
      content: `Generate a ${type} story fewer 20 words and contain ${formattedRad.join(
        ", "
      )} word and ${formattedKan.join(", ")} word`,
    },
  ];

  const result = await client.getChatCompletions(deploymentId, message);
  const story = result.choices.map((choice) => choice.message.content);
  return story[0];
};

// Generate a long story from multiple kanji
const generateStoFroMultiKanji = async ({ kanji, type }) => {
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );
  const deploymentId = "GPT35TURBO";

  // Add "" outside each element
  const formattedArr = kanji.map((kanji) => `"${kanji.trim()}"`);

  const message = [
    {
      role: "user",
      content: `Generate a ${type} japanese story fewer 100 words and contain ${formattedArr.join(
        ", "
      )} word`,
    },
  ];
  const result = await client.getChatCompletions(deploymentId, message);
  const story = result.choices.map((choice) => choice.message.content);
  return story[0];
};

module.exports = { generateKanjiStory, generateStoFroMultiKanji };
