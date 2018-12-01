const request = require('request-promise-native');

module.exports.logIn = (req, res) => {
  console.log(req.body.email);
  const options = {
    method: 'POST',
    uri: 'https://donatrix-api.herokuapp.com/login',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: req.body,
    json: true
  };
  request(options)
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        success: false,
        msg: err.message
      });
    });
};

module.exports.register = (req, res) => {
  console.log(`${req.body.name}: ${req.body.email}`);
  const options = {
    method: 'POST',
    uri: 'https://donatrix-api.herokuapp.com/register',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: req.body,
    json: true
  };
  request(options)
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        success: false,
        msg: err.message
      });
    });
};

module.exports.checkUser = (req, res) => {
  console.log(req.body.email);
  const options = {
    method: 'POST',
    uri: 'https://donatrix-api.herokuapp.com/checkUser',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: req.body,
    json: true
  };
  request(options)
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        success: false,
        msg: err.message
      });
    });
};

module.exports.getLocations = (req, res) => {
  const options = {
    method: 'GET',
    uri: 'https://donatrix-api.herokuapp.com/locations',
    headers: {
      Accept: 'application/json'
    },
    json: true
  };
  request(options)
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        success: false,
        msg: err.message
      });
    });
};

module.exports.getLocationById = (req, res) => {
  const options = {
    method: 'POST',
    uri: 'https://donatrix-api.herokuapp.com/location',
    headers: {
      Accept: 'application/json'
    },
    body: req.body,
    json: true
  };
  request(options)
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        success: false,
        msg: err.message
      });
    });
};

module.exports.getItems = (req, res) => {
  const options = {
    method: 'GET',
    uri: 'https://donatrix-api.herokuapp.com/allItems',
    headers: {
      Accept: 'application/json'
    },
    json: true
  };
  request(options)
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        success: false,
        msg: err.message
      });
    });
};
