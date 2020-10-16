const mongoose = require("mongoose");

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

module.exports = Tours;
