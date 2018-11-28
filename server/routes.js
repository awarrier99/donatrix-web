const path = require('path');
const api = require('./api');

module.exports = function routes(app) {
  app.post('/login', api.logIn);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/app.html'));
  });
};
