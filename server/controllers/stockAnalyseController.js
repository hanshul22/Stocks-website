const Stock = require('../models/stock');

const parameters = {
  peRatio: {
    low: 10,
    high: 25,
  },
  dividendYield: {
    min: 2,
  },
  yearHighLow: {
    high: 0.95, // 95% of the 52-week high
    low: 0.05, // 5% of the 52-week low
  },
};

const analyzeStock = (stock) => {
  let analysis = {};

  // Analyze P/E Ratio
  if (stock.peRatio < parameters.peRatio.low) {
    analysis.peRatio = 'undervalued';
  } else if (stock.peRatio > parameters.peRatio.high) {
    analysis.peRatio = 'overvalued';
  } else {
    analysis.peRatio = 'fairly valued';
  }

  // Analyze Dividend Yield
  if (stock.dividendYield >= parameters.dividendYield.min) {
    analysis.dividendYield = 'good income investment';
  } else {
    analysis.dividendYield = 'low income investment';
  }

  // Analyze 52-Week High/Low
  if (stock.price >= stock.yearHigh * parameters.yearHighLow.high) {
    analysis.yearHighLow = 'near 52-week high';
  } else if (stock.price <= stock.yearLow * parameters.yearHighLow.low) {
    analysis.yearHighLow = 'near 52-week low';
  } else {
    analysis.yearHighLow = 'normal range';
  }

  return analysis;
};

const getStockAnalysis = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const stock = await Stock.findOne({ symbol });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const analysis = analyzeStock(stock);
    res.json({ symbol: stock.symbol, analysis });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stock data', error });
  }
};

module.exports = {
  getStockAnalysis
};
