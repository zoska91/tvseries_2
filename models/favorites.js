const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId: String,
  seriesId: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
