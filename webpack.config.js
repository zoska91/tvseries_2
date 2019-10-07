const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    search: './public/javascripts/search/search.js',
    showFavorites: './public/javascripts/showFavorites.js'
  },
  output: {
    path: __dirname + '/public/javascripts/bundle',
    filename: '[name].bundle.js'
  }
};
