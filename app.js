const express = require("express");
const app = express();
const singleKanji = require("./routes/singleKanji");
const connectDB = require("./db/connect");
require("dotenv").config();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/singleKanji", singleKanji);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening at ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
