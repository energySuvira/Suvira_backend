const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  pdf: { type: String },
  customFields: [
    {
      fieldName: { type: String },
      fieldType: { type: String, enum: ["text", "number", "email", "date", "file"] },
      fieldValue: { type: mongoose.Schema.Types.Mixed },
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
