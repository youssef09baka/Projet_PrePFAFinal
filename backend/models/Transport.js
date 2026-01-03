const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  type: { type: String, required: true },      // Bus / Train / Avion
  company: { type: String, required: true },   // CTM, ONCF, RAM
  duration: { type: String, required: true },  // ex: 4h30
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Transport", transportSchema);
