const axios = require('axios');
let config;
let YELP_API;
let EVENT_BRITE_API;

if (process.env.NODE_ENV === 'production') {
  YELP_API = process.env.YELP_API_KEY;
  EVENT_BRITE_API = process.env.EVENT_BRITE_API_KEY;
} else {
  config = require('./config/config');
  YELP_API = config.YELP_API_KEY;
  EVENT_BRITE_API = config.EVENT_BRITE_API_KEY;
}

// takes list of business info from Yelp API and extracts relevant data
const filterBusinesses = (array) => {
  return array.map((business) => {
    return {
      id: business.id,
      name: business.name,
      imageUrl: business.image_url,
      url: business.url,
      rating: business.rating,
      phone: business.phone,
      price: business.price,
    };
  });
};

// takes list of event info from EventBrite API and extracts relevant data
const filterEvents = (array) => {
  const top10 = array.slice(0, 9);
  return top10.map((event) => {
    return {
      id: event.id,
      name: event.name.text,
      imageUrl: event.logo.url,
      url: event.url,
      description: event.description.text,
      start: event.start.local,
      end: event.end.local,
    };
  });
};

// makes GET request to specified API
const getAxios = (queryURL, key, api, cb) => {
  axios({
    method: 'get',
    url: queryURL,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  })
    .then((response) => {
      if (api === 'yelp') {
        cb(filterBusinesses(response.data.businesses));
      }
      if (api === 'eventBrite') {
        cb(filterEvents(response.data.events));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// forms queryURL based on specified API and initiates GET request
const getBusinessesOrEvents = (options, cb) => {
  // console.log('api: ', options.api);
  let queryURL;
  let key;
  const params = options;
  const { api } = params;

  if (api === 'yelp') {
    if (!options.categories) {
      params.categories = '';
    } else if (Array.isArray(options.categories)) {
      params.categories = options.categories.join(',');
    }

    if (!options.price) {
      params.price = '';
    }

    queryURL = `https://api.yelp.com/v3/businesses/search?term=${
      options.term
    }&categories=${options.categories}&location=${options.location}&price=${
      options.price
    }&limit=10&sort_by=rating`;

    key = YELP_API;
  }

  if (api === 'eventBrite') {
    queryURL = `https://www.eventbriteapi.com/v3/events/search/?q=concerts+festivals+shows&location.address=${
      options.location
    }&sort_by=date`;

    key = EVENT_BRITE_API;
  }

  getAxios(queryURL, key, api, cb);
};

module.exports.getBusinessesOrEvents = getBusinessesOrEvents;
