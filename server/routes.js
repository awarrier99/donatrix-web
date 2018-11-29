const path = require('path');
const api = require('./api');

module.exports = function routes(app) {
  app.post('/api/login', api.logIn);
  app.post('/api/register', api.register);
  app.post('/api/checkUser', api.checkUser);
  app.get('/api/locations', api.getLocations);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/app.html'));
  });
};
