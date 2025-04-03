const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  
    address: {
      type: String,
      required: true,
    },
  
    education: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobApplicationSchema = mongoose.model("JobApplicationSchema", jobApplicationSchema);
module.exports = JobApplicationSchema;