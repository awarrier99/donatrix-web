const webpack = require('webpack');
const path = require('path');
// const Dotenv = require('dotenv-webpack');
// const lessToJs = require('less-vars-to-js');
// const ExternalsPlugin = require('webpack2-externals-plugin');

module.exports = {
  entry: [
    './client/index'
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: [/client/, /server/],
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          failOnWarning: false,
          failOnError: false,
          fix: true,

        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      { test: /\.less/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader', options: { javascriptEnabled: true } }] },
      { test: /\.css/, use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { modules: true } }] },
      { test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/, loader: 'url-loader?limit=100000' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'babel-loader' }, { loader: '@svgr/webpack', options: { babel: false, icon: true } }] },
      { test: /\.json$/, loader: 'json-loader' }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'],
    modules: ['node_modules']
  },
  output: {
    path: path.resolve(__dirname, '/public'),
    filename: 'build/bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: 'public',
    hot: true,
    historyApiFallback: true
  },
  mode: 'development',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new ExternalsPlugin({
    //   type: 'commonjs',
    //   include: path.join(__dirname, 'node_modules')
    // })
  ]
};
