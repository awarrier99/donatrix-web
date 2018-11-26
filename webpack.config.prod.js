const webpack = require('webpack');
const path = require('path');
// const Dotenv = require('dotenv-webpack');
// const ExternalsPlugin = require('webpack2-externals-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var ManifestPlugin = require('webpack-manifest-plugin');
// var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

// TODO add react-optimize to production presets in .babelrc

// TODO something about this doesn't work, can't use import keyword

module.exports = {
  entry: {
    app: [
      './client/index'
    ]/* ,
    vendor: [
      'react',
      'react-dom',
    ] TODO implement this
    */
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          failOnWarning: false,
          failOnError: false
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.less/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader', options: { javascriptEnabled: true } }] },
      { test: /\.css/, use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { modules: true } }] },
      { test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, loader: 'url-loader?limit=100000' },
      { test: /\.json$/, loader: 'json-loader' }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'],
    modules: ['node_modules']
  },
  output: {
    path: path.join(__dirname, '/public/build'),
    publicPath: '/public/build',
    filename: 'bundle.js'
  },
  mode: 'production',
  plugins: [
    // new Dotenv({ path: './.env' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    })/* ,
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, 'node_modules')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,
      filename: 'vendor.js',
    }), TODO replace with config.optimization.splitChunks
    */
    /* new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
    }), TODO figure out what's causing Chunk.entrypoints error
    */
    /* new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }), */
    /* new webpack.optimize.UglifyJsPlugin(), TODO replace with config.optimization.minimize
     */
  ],
};
