const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

const loginRouter = require('./routes/login');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
