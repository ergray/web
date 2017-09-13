/* eslint-disable sort-keys */
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    API_URL_V1: `"${process.env.API_URL_V1 || 'http://localhost:1776'}"`,
    API_URL_V2: `"${process.env.API_URL_V2 || 'http://localhost:2018/v2'}"`,
  }),
  new webpack.ProvidePlugin({
    Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
    fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
  }),
  new CopyWebpackPlugin([
    { from: 'src/CommonStyle.css', to: 'screen.css' },
  ]),
  new HtmlWebpackPlugin({
    title: 'Liquid',
    favicon: 'favicon.png',
    filename: 'index.html',
    hash: true, // cache bust all script tags and css links
  }),
  new HtmlWebpackPlugin({
    title: 'Liquid: 404 Not Found',
    favicon: 'favicon.png',
    filename: '404.html',
    hash: true, // cache bust all script tags and css links
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    append: false,
    assets: ['screen.css'],
  }),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  entry: './index.web.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: '/',
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
        include: [
          path.resolve(__dirname, 'index.web.js'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react-app', 'env', 'stage-2'],
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
