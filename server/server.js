const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes
const loginRouter = require('./routes/login');
// controllers
const authenticationController = (require('./controllers/authenticationController.js'));

app.use(cookieSession({
  name: 'session-name',
  keys: ['key1', 'key2'],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../client/')));
app.use('/login', loginRouter.router);

app.get('/profile',
  authenticationController.checkUserLoggedIn,
  (req, res) => res.status(200).send(`<img src='${req.user.photos[0].value}'></img>`));

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  return res.redirect('/');
});

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
