const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const AuthSchema = mongoose.model("AuthSchema", authSchema);
module.exports = AuthSchema;
