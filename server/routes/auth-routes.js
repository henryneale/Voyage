const passport = require('passport');
const express = require('express');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const database = require('../../database/index');
const User = database.User;

module.exports = (app) => {
  // route for home page
  app.get('/', (req, res) => {
    console.log('req sessionID', req.sessionID);
    console.log('req session token', req.session.token);
    if (req.sessionID) {
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

  app.get('/profile/:username', (req, res) => {
    if (req.user) {
      res.send(req.user);
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

  app.post('/itinerary', (req, res) => {
    if (!req.user) {
      console.log('!post req user', req.user);
      res.redirect('/auth/google');
    } else {
      console.log('post req user', req.user);
      res.redirect('/');
    }
  });

  app.get('/itinerary', (req, res) => {
    // res.send('hello');
    if (!req.user) {
      console.log('!get req user', req.user);
      // console.log('!get req user', req.session.token);
      // console.log('!req', req);
      res.redirect('/auth/google');
    } else {
      console.log('get req user', req.user);
      // res.json(req.user);
      res.redirect('/trips');
    }
  });

  app.post('/login', (req, res) => {
    if (!req.user) {
      console.log('!post req user', req.user);
      res.redirect('/auth/google');
    } else {
      console.log('post req user', req.user);
      res.redirect('/');
    }
  });

  app.get('/login', (req, res) => {
    if (!req.user) {
      console.log('!get req user', req.user);
      res.redirect('/auth/google');
    } else {
      console.log('get req user', req.user);
      res.redirect('/trips');
    }
  });

  // route for logging out
  app.get('/logout', (req, res) => {
    database.logout(req.sessionID, () => {
      res.send(false);
    });
  });

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get(
    '/auth/google',
    // passport.authenticate('google', { scope: ['profile', 'email'] })
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    })
  );

  // the callback after google has authenticated the user
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: '/',
    }),
    (req, res) => {
      // req.session.token = req.user.token;
      // console.log(req.user.token);
      res.redirect('/');
    }
  );

  app.get('/checkSession', (req, res) => {
    User.findOne({ sessionID: req.sessionID }, (err, user) => {
      if (user) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });
};

// route middleware to make sure a user is logged in
// const isLoggedIn = (req, res, next) => {
//   // if user is authenticated in the session, carry on
//   if (req.isAuthenticated()) return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }
