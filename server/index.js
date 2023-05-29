const express = require("express");
const sendMsg = require("./controller/sendMail");
const process = require("process");

const app = express();
const port = 7070;
app.use(express.json());

app.route("/sendMessage").post(sendMsg);
app.route("/hi").get((req, res) => {
  console.log("request received");
  return res.status(200).json({ message: new Date(Date.now()).toString() });
});

app.listen(port, () => {
  console.log(`server is listining on ${port}`);
  console.log("This process is your pid " + process.pid);
});
