const mongoose = require("mongoose");

const jobPosting = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
        type: [String],
        required: true,
      },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: Date.now(),
    },
    detail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobPosting = mongoose.model("JobPosting", jobPosting);
module.exports = JobPosting;
