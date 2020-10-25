const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNHANDLER EXCEPTION Shuting down.....");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./index");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connecion succesfull");
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION Shuting down.....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
