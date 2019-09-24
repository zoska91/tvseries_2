const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/javascripts/profile/main.js',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'bundle.js'
  }
};
