const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    carrerBanner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Logo = mongoose.model("Logo", logoSchema);
module.exports = Logo;
