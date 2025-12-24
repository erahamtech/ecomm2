const crypto = require("crypto");
const dayjs = require("dayjs");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const hashOtp = (otp) =>
  crypto.createHash("sha256").update(otp).digest("hex");

// You plug your SMS/Email provider here
const sendOtp = async ({ to, otp, channel = "sms" }) => {
  // Todo: integrate with Twilio, AWS SNS, etc.
  console.log(`OTP for ${to} via ${channel}: ${otp}`);
};

module.exports = {
  generateOtp,
  hashOtp,
  sendOtp
};
