const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: String,
  companyName: String,
  sector: String,
  industry: String,
  price: Number,
  marketCap: Number,
  peRatio: Number,
  dividendYield: Number,
  yearHigh: Number,
  yearLow: Number
});

module.exports = mongoose.model('stocks', stockSchema);
