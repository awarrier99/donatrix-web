const path = require('path');

module.exports = function routes(app) {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/app.html'));
  });
};
