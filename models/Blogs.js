const mongoose = require("mongoose");
const { format } = require("date-fns");

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      get: (date) => format(date, "MMM dd, yyyy"),
    },
    time: {
      type: Date,
      default: Date.now,
      get: (time) => format(time, "p"),
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorImg: {
      type: String,
      required: true,
    },
    blogImg: {
      type: String,
    },
    views: {
      type: String,
      default: "1",
    },
    likes: {
      type: String,
      default: "1",
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const BlogSchema = mongoose.model("BlogSchema", blogSchema);
module.exports = BlogSchema;
