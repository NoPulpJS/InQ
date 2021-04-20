const express = require('express');
const passport = require('passport');
require('../passport/passport.js')

const router = express.Router();

router.get('/OAuth/',
  passport.authenticate('google', {
    scope:
  ['email', 'profile'],
  }));

router.get('/OAuth/callback/',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
  }),
  (req, res) => {
    return res.redirect('/profile')
  });

module.exports = { router };
