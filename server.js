const dotenv = require("dotenv");
const app = require("./index");

dotenv.config({ path: "./config.env" });

app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}...`);
});
