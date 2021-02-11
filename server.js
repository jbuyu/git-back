require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongoose

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//routes
app.get("/", (req, res) => {
  res.send("Howdy!");
});

app.post("/repos", (req, res) => {
  // let { newRepoData } = req.body;
  console.log(req.body);
});

app.listen(PORT, () => console.log("Listening on port 3000!"));
