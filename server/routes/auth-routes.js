const passport = require('passport');
const express = require('express');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (app) => {
  // route for home page
  app.get('/', (req, res) => {
    if (req.session.token) {
      res.cookie('token', req.session.token);
      res.json({
        status: 'session cookie set',
      });
    } else {
      res.cookie('token', '');
      res.json({
        status: 'session cookie not set',
      });
    }
  });

  // route for login form
  // route for processing the login form
  // route for signup form
  // route for processing the signup form

  // route for showing the profile page
  // app.get('/profile', isLoggedIn, (req, res) => {
  //   res.render('profile.ejs', {
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });

  // route for logging out
  app.get('/logout', (req, res) => {
    req.logout();
    res.session = null;
    res.redirect('/');
  });

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  // the callback after google has authenticated the user
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: '/',
    }),
    (req, res) => {
      req.session.token = req.user.token;
      res.redirect('/');
    }
  );
};

// route middleware to make sure a user is logged in
// const isLoggedIn = (req, res, next) => {
//   // if user is authenticated in the session, carry on
//   if (req.isAuthenticated()) return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }
