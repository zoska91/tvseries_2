const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/javascripts/search/search.js',
  output: {
    path: __dirname + '/public/javascripts',
    filename: '[name].bundle.js'
  }
};
