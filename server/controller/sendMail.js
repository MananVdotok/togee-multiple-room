const transporter = require("../components/emailer");

const sendMsg = async (req, res) => {
  try {
    const { from, to, subject, text, html } = req.body;
    // send an email
    console.log({ from, to, subject, text, html });
    const info = await transporter.sendMail({
      from,
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);

    return res.json({
      message: `message recived on server and sending within a minute`,
    });
  } catch (error) {
    console.log("error from try catch ", error);
  }
};

module.exports = sendMsg;
