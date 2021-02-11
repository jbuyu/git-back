const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "howdy-api",
  });
});

app.post("/", (req, res) => {
  let { data } = req.body;
  res.json({
    message: "doc-api",
  });
});

app.listen(PORT, () => {
  console.log("listening on port,", PORT);
});
