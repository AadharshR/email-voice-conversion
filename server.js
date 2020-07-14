const express = require("express");
const app = express()
// const loginController = require("./loginController");
const bodyParser = require("body-parser");
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
const usersRoute  = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', usersRoute);
app.use('/api/v1',adminRoute);
const port = 3005;
app.listen(port, () => {
    console.log('we are live on ' + port);
  });