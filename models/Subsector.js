const mongoose = require("mongoose");

const subsectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  pdf: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("Subsector", subsectorSchema);
