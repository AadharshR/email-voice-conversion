const express = require("express");
const app = express()
const loginController = require("./loginController");
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use('/login',loginController)
const port = 3005;
app.listen(port, () => {
    console.log('we are live on ' + port);
  });