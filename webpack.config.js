var path = require('path');
var webpack = require('webpack');
     
module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },{
        test: /\.[s]?css$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015', 'react', 'stage-0']
        }
    }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
