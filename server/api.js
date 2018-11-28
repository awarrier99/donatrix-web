const request = require('request-promise-native');

module.exports.logIn = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const options = {
    method: 'POST',
    uri: 'https://donatrix-api.herokuapp.com/login',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      email,
      password
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

module.exports.register = (req, res) => {
  console.log(req, res);
};
