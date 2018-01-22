const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/tripcollab');
}

let userSchema = mongoose.Schema({
  username: String,
  itineraries: Array,
  sessionID: String,
  googleId: String,
});

let yelpSchema = mongoose.Schema({
  id: String,
  name: String,
  imageUrl: String,
  url: String,
  rating: String,
  phone: String,
  price: String,
});

let eventBriteSchema = mongoose.Schema({
  id: String,
  name: String,
  imageUrl: String,
  url: String,
  description: String,
  start: Date,
  end: Date,
  cost: Number,
});

let itinerarySchema = mongoose.Schema({
  username: String,
  name: String,
  location: String,
  eat: Array,
  sleep: Array,
  explore: Array,
  events: Array,
});

const User = mongoose.model('User', userSchema);
module.exports.User = User;

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports.Itinerary = Itinerary;

const Business = mongoose.model('Business', yelpSchema);
module.exports.Business = Business;

const Event = mongoose.model('Event', eventBriteSchema);
module.exports.Event = Event;

module.exports.createBusiness = (data, res) => {
  const business = new Business({
    id: data.id,
    name: data.name,
    imageUrl: data.imageUrl,
    url: data.url,
    rating: data.rating,
    phone: data.phone,
    price: data.price,
  });
  Business.create(business)
    .then((newBusiness) => {
      res.status(201).json(newBusiness);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.createEvent = (data, res) => {
  const event = new Event({
    id: data.id,
    name: data.name,
    imageUrl: data.imageUrl,
    url: data.url,
    description: data.description,
    start: data.start,
    end: data.end,
    cost: data.cost,
  });

  Event.create(event)
    .then((newEvent) => {
      res.status(201).json(newEvent);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.createItinerary = (data, res) => {
  const itinerary = new Itinerary({
    username: data.username,
    name: data.name,
    location: data.location,
    businesses: data.businesses,
    events: data.events,
  });
  Itinerary.create(itinerary)
    .then((newItinerary) => {
      res.status(201).json(newItinerary);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.createUser = (data, res) => {
  const user = new User({
    username: data.username,
    itineraries: data.itineraries,
  });
  User.create(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.updateOrCreateUser = (query, cb) => {
  User.findOne({ googleId: query.googleId }, (err, user) => {
    if (!user) {
      let newUser = new User({
        username: query.username,
        sessionID: query.sessionID,
        googleId: query.googleId,
      });
      newUser.save((err, user) => {
        cb(err, user);
      });
    } else {
      console.log(query.googleId);
      user.sessionID = query.sessionID;
      user.save((err, user) => {
        cb(err, user);
      });
    }
  });
};

// module.exports.getUserItineraries = (user, res) => {
//   User.find({ username: user })
//     .then((data) => {
//       console.log('data', data);
//       res.json(data.itineraries);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };

module.exports.updateItineraries = (items, username, cb) => {
  console.log('updateItineraries items', items);
  User.findOneAndUpdate(
    { username: username },
    { $addToSet: { itineraries: { $each: items.itineraries } } },
    { new: true },
    cb
  );
};

module.exports.logout = (sessionID, cb) => {
  User.update({ sessionID: sessionID }, { $set: { sessionID: '' } }, cb);
};
