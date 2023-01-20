require("dotenv").config();

module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};
