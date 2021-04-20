const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const loginRouter = require('./routes/login');

dotenv.config();

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
