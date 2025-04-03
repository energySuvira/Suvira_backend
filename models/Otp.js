const mongoose = require("mongoose");

const expireTime = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};

const otpSchema = new mongoose.Schema({
  otp: { type: String },
  email: { type: String },
  expire: {
    type: Date,
    default: expireTime,
    expires: 300,
  },
});

const OtpSchema = mongoose.model("OtpSchema", otpSchema);
module.exports = OtpSchema;
