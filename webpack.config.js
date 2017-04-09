/* eslint-disable sort-keys */

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
}
