const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  backgroundImage: { type: String },
  pdf: { type: String },
  subsectors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subsector" }],
});

module.exports = mongoose.model("Sector", sectorSchema);
