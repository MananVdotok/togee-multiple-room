const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// the settings could come from .env file or environment variables
const host = process.env.SMTP_HOST || "localhost";
const port = Number(process.env.SMTP_PORT || 7777);

const transporter = nodemailer.createTransport({
  host: "secure224.inmotionhosting.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "info@vdotok.dev", // generated ethereal user
    pass: "Supp3rGrv3r", // generated ethereal password
  },
});

module.exports = transporter;
