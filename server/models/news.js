const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('news', newsSchema);
