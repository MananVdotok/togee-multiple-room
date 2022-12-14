const express = require("express");
const sendMsg = require("./controller/sendMail");
const process = require("process");

const app = express();
const port = 7070;
app.use(express.json());

app.route("/sendMessage").post(sendMsg);

app.listen(port, () => {
  console.log(`server is listining on ${port}`);
  console.log("This process is your pid " + process.pid);
});
