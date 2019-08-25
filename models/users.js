const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  login: String,
  password: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', usersSchema);
