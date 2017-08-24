/* eslint-disable sort-keys */
const path = require('path')
const webpack = require('webpack')

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
    API_URL_V1: `"${process.env.API_URL_V1 || 'http://localhost:1776'}"`,
    API_URL_V2: `"${process.env.API_URL_V2 || 'http://localhost:2018/v2'}"`,
  }),
  new webpack.ProvidePlugin({
    Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
    fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
  }),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  entry: './index.web.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/react-responsive/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2'],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: '[name].[hash:16].[ext]' },
      },
    ],
  },
  plugins,
  devServer: {
    historyApiFallback: true,
  },
}
