const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const API_KEY = "e7115b67ae9947869b45559746c9ca2a";
if (!API_KEY) {
  console.error("API key is missing. Make sure your .env file is set up correctly.");
  process.exit(1);
}

const BASE_URL = 'https://newsapi.org/v2/everything';

const stockSymbols = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "META",
  "TSLA", "V", "JNJ", "CSCO", "XOM",
  "AVGO", "ACN", "QCOM", "MDT", "COST",
  "LLY", "CRM", "NEE", "INTC", "TXN",
  "LIN", "PM", "ORCL", "UPS", "MS",
  "HON", "BA"
];

const fetchNewsData = async (symbol) => {
  const url = `${BASE_URL}?q=${symbol}&apiKey=${API_KEY}&pageSize=5&sortBy=publishedAt`;
  try {
    const response = await axios.get(url);
    if (response.data.status !== 'ok') {
      console.error(`API error for ${symbol}: ${response.data.message}`);
      return null;
    }
    return response.data.articles.map(article => ({
      symbol,
      title: article.title,
      date: article.publishedAt,
      source: article.source.name,
      url: article.url
    }));
  } catch (error) {
    console.error(`Error fetching news for ${symbol}:`, error.message);
    return null;
  }
};

const fetchAllNews = async () => {
  const newsData = [];
  for (const symbol of stockSymbols) {
    console.log(`Fetching news for ${symbol}...`);
    const articles = await fetchNewsData(symbol);
    if (articles && articles.length) {
      newsData.push(...articles);
      console.log(`Fetched news for ${symbol}`);
    } else {
      console.log(`No news found for ${symbol}`);
    }
    // Adding a delay to avoid hitting rate limits
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
  }
  return newsData;
};

const saveNewsToFile = (data) => {
  fs.writeFileSync('news.json', JSON.stringify(data, null, 2));
  console.log('News data saved to news.json');
};

const main = async () => {
  console.log('Starting news collection...');
  const data = await fetchAllNews();
  saveNewsToFile(data);
  console.log('News collection complete.');
};

main();
