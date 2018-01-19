const express = require('express');



const passport = require('passport');
const passportSetup = require('./config/passport-setup')(passport);
const app = express();


const bodyParser = require('body-parser');
const db = require('../database');
const mongoose = require('mongoose');
const utils = require('./utils');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');


const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../react-client/dist`));

let authRoutes = require('./routes/auth-routes')(app,passport);
// authRoutes(app, passport);

app.use(cookieSession({
  name: 'session',
  keys: ['123'],
}));

app.use(cookieParser());

app.use('/', authRoutes);
//router.set('view engine', 'ejs');

// router.use('/auth', authRoutes);

// location, price, categories populated with dummy data unless client sends
// params in req.body

// router.get('/auth/home', (req, res) => {
//   res.render('home');
// });

app.post('/eat', (req, res) => {
  console.log('eat endpoint hit');
  const term = 'restaurants';
  const options = {
    location: req.body.location || 'chicago',
    price: req.body.price || 4,
    term: term,
    categories: req.body.categories || '',
    api: 'yelp'
  };

  utils.getBusinessesOrEvents(options, (data) => {
    res.send(data);
  });
});

app.post('/explore', (req, res) => {
  console.log('explore endpoint hit');
  const term = 'tourism';
  const options = {
    location: req.body.location || 'newyork',
    term: term,
    categories: req.body.categories || ['landmarks', 'galleries', 'parks', 'musuems'],
    api: 'yelp'
  };

  utils.getBusinessesOrEvents(options, (data) => {
    res.send(data);
  });
});

app.post('/party', (req, res) => {
  console.log('party endpoint hit');
   const options = {
     location: req.body.location || 'chicago',
     api: 'eventBrite'
   };

  utils.getBusinessesOrEvents(options, (data) => {
    res.send(data);
  });
 });

app.post('/sleep', (req, res) => {
  console.log('sleep endpoint hit');
  const term = 'hotels';

  const options = {
    location: req.body.location || 'philadelphia',
    price: req.body.price || '3',
    term: term,
    api: 'yelp'
  };

  utils.getBusinessesOrEvents(options, (data) => {
    res.send(data);
  });
});

app.post('/trips', (req, res) => {
  db.saveTrip(req.body, () => {
    res.sendStatus(201);
  });
});

app.get('/trips', (req, res) => {
  db.getAllTrips((trips) => {
    res.send(trips);
  });
});

app.listen(port, () => {
  console.log('listening on port 3000!');
});


