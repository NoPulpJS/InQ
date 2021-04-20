const express = require('express');
// const OAuthController = require('../controllers/OAuthController');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/login/OAuth/callback',
  passReqToCallback: true,
},
((request, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  // User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
  return done(null, profile, accessToken);
})));

router.get('/OAuth/',
  passport.authenticate('google', {
    scope:
  ['email', 'profile'],
  }));

router.get('/OAuth/callback/',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
  }),
  (req, res) => res.status(200).send('wooohoooooo'));

module.exports = { router };
