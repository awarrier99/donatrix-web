const Express = require('express');
const path = require('path');
const flash = require('express-flash');

// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const PORT = process.env.PORT || 3000;

// Run Webpack dev server in development mode
if (isDevMode) {
  // Webpack Requirements
    const webpack = require('webpack'); //eslint-disable-line
    const config = require('../webpack.config.dev'); //eslint-disable-line
    const webpackDevMiddleware = require('webpack-dev-middleware'); //eslint-disable-line
    const webpackHotMiddleware = require('webpack-hot-middleware'); //eslint-disable-line
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: {
      poll: 1000,
    },
  }));
  app.use(webpackHotMiddleware(compiler));
}

// Apply body Parser and server public assets and routes
// app.use(compression());
app.use(flash());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(path.resolve(__dirname, '../public')));

require('./routes')(app);

// start app
app.listen(PORT, error => {
  if (!error) {
      console.log(`Donatrix is running on port ${PORT}! Load http://localhost:${PORT} in your browser.`); // eslint-disable-line
  }
});

module.exports = app;
