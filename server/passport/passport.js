const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../data/models');

passport.serializeUser((user, done) => {
  console.log('inside SERIALIZER: ');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const { displayName, email, photos } = user;

  const findQuery = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };
  db.query(findQuery).then((data) => {
    // console.log('inside db.query findQuery: ', data)
    if (data.rows.length) {
      // console.log('data.rows: ', data.rows)
      const user = data.rows[0];
      return done(null, user);
    }
  }).catch((e) => console.error(e));
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/login/OAuth/callback',
  passReqToCallback: true,
},
((request, accessToken, refreshToken, profile, done) => {
  console.log('STRATEGY____________');
  const { displayName, email, photos } = profile;
  const findQuery = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };

  const insertQuery = {
    text: 'INSERT INTO users (name, photo_url, email) VALUES ($1, $2, $3)',
    values: [displayName, photos[0].value, email],
  };
  // checking if user exists in DB:
  // find a user whose email is the same as teh proflie email
  db.query(findQuery).then((data) => {
    // console.log('inside db.query findQuery: ', data)
    if (data.rows.length) {
      const id = data.rows[0]._id;
      console.log('findQuery: ===============', id);
      // console.log('data.rows: ', data.rows)
      return done(null, profile, accessToken, id);
    }
    db.query(insertQuery).then((insertData) => {
      console.log('insertQuery++++++++++++++++');
      // console.log('inside db.query insertQuery: ', insertData);
      return done(null, profile, accessToken);
    }).catch((e) => console.error(e));
  }).catch((e) => {
    console.error(e);
  });
})));
