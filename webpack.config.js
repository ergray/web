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
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
  ],

  devServer: {
    historyApiFallback: true,
  },
}
