
const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  city: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true }, // ex: 4.3
  image: { type: String, required: true },  // URL image
  description: { type: String, required: true }
});

module.exports = mongoose.model("Hotel", hotelSchema);
