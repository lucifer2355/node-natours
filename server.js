const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./index");

dotenv.config({ path: "./config.env" });

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

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  price: { type: Number, required: [true, "A tour must have a price"] },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tours = mongoose.model("Tours", toursSchema);

app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}...`);
});
