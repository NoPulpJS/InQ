const express = require('express');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const loginRouter = require('./routes/login');

app.use(passport.initialize());
app.use('/login', loginRouter.router);
app.use(express.static(path.join(__dirname, '../client/')));
// app.use('/', (req, res, next) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
