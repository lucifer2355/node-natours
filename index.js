const express = require("express");
const fs = require("fs");
const app = express();

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello Node Projects", app: "natours" });
// });

// app.post("/", (req, res) => {
//   res.send("you can post to this endpoint");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/tours", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: tours.length, data: { tours } });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
