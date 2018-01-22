const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./config/passport-setup')(passport);
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index');
const mongoose = require('mongoose');
const utils = require('./utils');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../react-client/dist`));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(require('cookie-parser')());
// app.use(session({ secret: 'keyboard cat' }));
app.use(
  session({
    secret: 'my little secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth-routes')(app);

// app.use(cookieSession({
//   name: 'session',
//   keys: ['123'],
// }));

// app.use(cookieParser());

app.post('/eat', (req, res) => {
  console.log('eat endpoint hit');
  const term = 'restaurants';
  const options = {
    location: req.body.location || 'chicago',
    price: req.body.price || 4,
    term: term,
    categories: req.body.categories || '',
    api: 'yelp',
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
    categories: req.body.categories || [
      'landmarks',
      'galleries',
      'parks',
      'musuems',
    ],
    api: 'yelp',
  };

  utils.getBusinessesOrEvents(options, (data) => {
    res.send(data);
  });
});

app.post('/party', (req, res) => {
  console.log('party endpoint hit');
  const options = {
    location: req.body.location || 'chicago',
    api: 'eventBrite',
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
    api: 'yelp',
  };

  utils.getBusinessesOrEvents(options, (data) => {
    res.send(data);
  });
});

app.post('/trips', (req, res) => {
  console.log('post req body', req.body);
  db.updateItineraries(req.body, req.user.username, (data) => {
    res.json(data);
  });
});

app.get('/trips', (req, res) => {
  // db.getUserItineraries(req.user.username, res);
  res.json(req.user.itineraries);
});

app.listen(port, () => {
  console.log('listening on port 3000!');
});
