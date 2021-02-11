require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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

//schema

const repoSchema = new Schema({
  owner: String,
  repoName: { type: String, required: true },
  issues: String,
  forks: Number,
  stars: Number,
});

const Repo = model("Repo", repoSchema);

//routes
app.get("/", (req, res) => {
  res.send("Howdy!");
});

app.post("/repos", (req, res) => {
  let newRepoData = req.body;
  let repoData = new Repo({
    ...newRepoData,
  });
  let repo = Repo.exists({ repoName: newRepoData.repoName });
  if (repo) {
    repoData.save(function (error) {
      console.log("saved");
      if (error) {
        console.error(error);
      }
    });
  } else {
    console.log("already exists");
  }
});

app.get("/favRepos", async (req, res) => {
  const repos = await Repo.find();
  var result = repos.reduce((unique, o) => {
    if (!unique.some((obj) => obj.label === o.label && obj.value === o.value)) {
      unique.push(o);
    }
    return unique;
  }, []);
  res.send({
    result,
  });
});

app.listen(PORT, () => console.log("Listening on port 4000!"));
