var webpack = require('webpack');
var config = {
  context: __dirname + "/client/app",
  entry: { 
    test: "./app.js",
    userPage: "./userPage.js"
  },

  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/client/dist",
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }, {
        test: /\.css?$/,
        loader: 'style!css'
      }
    ],
  },
}

module.exports = config;
