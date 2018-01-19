const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../database/index');
const configAuth = require('./auth');

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
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
          // try to find the user based on their google id
          User.findOne({ 'google.id': profile.id }, (err, user) => {
            if (err) return done(err);

            if (user) {
              // if a user is found, log them in
              return done(null, user);
            } else {
              // if the user isnt in our database, create a new user
              const newUser = new User();

              // set all of the relevant information
              newUser.google.id = profile.id;
              newUser.google.token = accessToken;
              newUser.google.name = profile.displayName;
              newUser.google.email = profile.emails[0].value; // pull the first email

              // save the user
              newUser.save((err) => {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
};

// save to database
new User({
    googleId: profile.id,
    username: profile.displayName
}).save().then((newUser) => {
    console.log('new user created: ', newUser);
});

