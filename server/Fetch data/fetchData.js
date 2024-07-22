const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
if (!API_KEY) {
  console.error("API key is missing. Make sure your .env file is set up correctly.");
  process.exit(1);
}

const BASE_URL = 'https://www.alphavantage.co/query';

const stockSymbols = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "META",
  "TSLA", "V", "JNJ", "CSCO", "XOM",
  "AVGO", "ACN", "QCOM", "MDT", "COST",
  "LLY", "CRM", "NEE", "INTC", "TXN",
  "LIN", "PM", "ORCL", "UPS", "MS",
  "HON", "BA"
];

const fetchStockData = async (symbol) => {
  const url = `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
  try {
    const response = await axios.get(url);
    if (response.data.Note) {
      console.error(`API limit reached for symbol: ${symbol}`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error.message);
    return null;
  }
};

const fetchAllData = async () => {
  const stockData = [];
  for (const symbol of stockSymbols) {
    const data = await fetchStockData(symbol);
    if (data && data.Symbol) {
      stockData.push({
        symbol: data.Symbol,
        companyName: data.Name,
        sector: data.Sector,
        industry: data.Industry,
        price: parseFloat(data['50DayMovingAverage']),
        marketCap: parseFloat(data.MarketCapitalization),
        peRatio: parseFloat(data.PERatio),
        dividendYield: parseFloat(data.DividendYield),
        yearHigh: parseFloat(data['52WeekHigh']),
        yearLow: parseFloat(data['52WeekLow'])
      });
      console.log(`Fetched data for ${symbol}`);
    } else {
      console.log(`No data found for ${symbol}`);
    }
    // Adding a delay to avoid hitting rate limits
    await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds delay
  }
  return stockData;
};

const saveDataToFile = (data) => {
  fs.writeFileSync('stocks.json', JSON.stringify(data, null, 2));
  console.log('Data saved to stocks.json');
};

const main = async () => {
  console.log('Starting data collection...');
  const data = await fetchAllData();
  saveDataToFile(data);
  console.log('Data collection complete.');
};

main();
