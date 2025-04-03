const mongoose = require("mongoose");

// Define the InnerServices schema
const InnerServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  formulae: {
    type: String,
  },
  PhysicalAppearance: {
    type: String,
  },
  Grade: {
    type: String,
  },
  Desc: {
    type: String,
  },
  Specification: {
    type: String,
  },
  SafetyInformation: {
    type: String,
  },
  Support: {
    type: String,
  },
});

const ServiceSchemas = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    section: [
      {
        name: {
          unique: true,
          type: String,
          required: true,
        },
      },
    ],
    InnerServices: [InnerServiceSchema],
  },
  {
    timestamps: true,
  }
);

const ServiceSchema = mongoose.model("ServiceSchema", ServiceSchemas);
module.exports = ServiceSchema;
