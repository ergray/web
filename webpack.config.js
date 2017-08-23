/* eslint-disable sort-keys */
const webpack = require('webpack')

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
  plugins: [
    new webpack.DefinePlugin({
      API_URL_V1: `"${process.env.API_URL_V1 || 'http://localhost:2017'}"`,
      API_URL_V2: `"${process.env.API_URL_V2 || 'http://localhost:2018/v2'}"`,
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
  ],

  devServer: {
    historyApiFallback: true,
  },
}
