const express = require("express");
const app = express();
const basic = require("./routes/basic");
const singleKanji = require("./routes/singleKanji");
const multipleKanji = require("./routes/multipleKanji");
const store = require("./routes/store");
const auth = require("./routes/auth");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/singleKanji", singleKanji);
app.use("/api/v1/multipleKanji", multipleKanji);
app.use("/api/v1/store", store);
app.use("/api/v1/user", auth);
app.use("/api/v1/basic", basic);

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
