const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Node Project");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
