const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  symbol: String,
  articles: [
    {
      title: String,
      date: String,
      source: String,
      url: String
    }
  ]
});

module.exports = mongoose.model('news', newsSchema);
