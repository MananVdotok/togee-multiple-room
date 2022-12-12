const express = require("express");
const sendMsg = require("./controller/sendMail");

const app = express();
const port = 7070;
app.use(express.json());

app.route("/sendMessage").post(sendMsg);

app.listen(port, () => {
  console.log(`server is listining on ${port}`);
});
