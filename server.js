require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();
const mongoose = require("mongoose");

//middleware
app.use(cors());
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

app.post("/", (req, res) => {
  let { repoDat } = req.body;
});

app.listen(PORT, () => console.log("Listening on port 3000!"));
