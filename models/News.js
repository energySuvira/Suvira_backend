const mongoose = require("mongoose");
const { format } = require("date-fns");

const newsSchema = new mongoose.Schema(
  {
    publishedBy: {
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
    headline: {
      type: String,
      required: true,
    },
    news: {
      type: String,
      required: true,
    },
    newsImg: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const NewsSchema = mongoose.model("NewsSchema", newsSchema);
module.exports = NewsSchema;
