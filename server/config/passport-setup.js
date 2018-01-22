const GoogleStrategy = require('passport-google-oauth20').Strategy;
const database = require('../../database/index');
const User = database.User;

let configAuth;
let client_ID;
let client_Secret;
let callback_URL;

if (process.env.NODE_ENV === 'production') {
  client_ID = process.env.CLIENT_ID;
  client_Secret = process.env.CLIENT_SECRET;
  callback_URL = 'https://infinite-shore-73371.herokuapp.com/auth/google/callback';
} else {
  configAuth = require('./auth');
  client_ID = configAuth.googleAuth.clientID;
  client_Secret = configAuth.googleAuth.clientSecret;
  callback_URL = configAuth.googleAuth.callbackURL;
}

module.exports = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: client_ID,
        clientSecret: client_Secret,
        callbackURL: callback_URL,
        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, done) => {
        console.log('email', profile.emails[0].value);
        console.log('googleId', profile.id);
        console.log('sessionId', req.sessionID);
        const username = profile.emails[0].value.slice(
          0,
          profile.emails[0].value.indexOf('@')
        );
        database.updateOrCreateUser(
          {
            username,
            googleId: profile.id,
            sessionID: req.sessionID,
          },
          (err, user) => {
            return done(err, user);
          }
        );
      }
    )
  );
};

// try to find the user based on their google id
// User.findOne({ 'google.id': profile.id }, (err, user) => {
//   if (err) return done(err, user);

//   if (user) {
//     // if a user is found, log them in
//     user.sessionID = req.sessionID;
//     return done(null, user);
//   } else {
//     // if the user isnt in our database, create a new user
//     const newUser = new User();

//     // set all of the relevant information
//     newUser.google.id = profile.id;
//     newUser.google.token = accessToken;
//     newUser.google.name = profile.displayName;
//     newUser.google.email = profile.emails[0].value; // pull the first email
//     console.log('newUser', newUser);

//     // save the user
//     newUser.save((err) => {
//       if (err) throw err;
//       return done(null, newUser);
//     });
//           });
//         });
//       }
//     )
//   );
// };

// save to database
// new User({
//     googleId: profile.id,
//     username: profile.displayName
// }).save().then((newUser) => {
//     console.log('new user created: ', newUser);
// });
