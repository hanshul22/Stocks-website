const express = require("express");
const mongoose = require("mongoose");
const stockRoutes = require("./routes/stock.routes");
const newsRoutes = require("./routes/news.routes");
const stockanalysisRoutes = require("./routes/stockanalysis.routes");
require("dotenv").config();
const cors = require("cors");
const ConnectToDB = require("./config/dbconnect");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
ConnectToDB();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "*", // Allows requests from all origins; adjust as needed
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Use CORS middleware
app.use(cors(corsOptions));

// Set up routes
app.use("/api/stocks", stockRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/stockanalysis", stockanalysisRoutes); // Fixed the route path

// Example stock data for suggestions
const stockData = [
  "Apple Inc.",
  "Microsoft Corporation",
  "Alphabet Inc.",
  "Amazon.com, Inc.",
  "Meta Platforms, Inc.",
  "Tesla, Inc.",
  "Visa Inc.",
  "Johnson & Johnson",
  "Cisco Systems, Inc.",
  "Exxon Mobil Corporation",
  "Broadcom Inc.",
  "Accenture plc",
  "Qualcomm Incorporated",
  "Medtronic plc",
  "Costco Wholesale Corporation",
  "Eli Lilly and Company",
  "Salesforce, Inc.",
  "NextEra Energy, Inc.",
  "Intel Corporation",
  "Texas Instruments Incorporated",
  "Linde plc",
  "Philip Morris International Inc.",
  "Oracle Corporation",
  "United Parcel Service, Inc.",
  "Morgan Stanley",
  "Honeywell International Inc.",
  "The Boeing Company",
];

// Fetch stock suggestions based on query
const fetchStockSuggestions = async (query) => {
  // Simulate async operation, e.g., querying a database or API
  return new Promise((resolve) => {
    const suggestions = stockData.filter((symbol) =>
      symbol.toLowerCase().includes(query.toLowerCase())
    );
    resolve(suggestions);
  });
};

// Define the /api/suggestions endpoint
app.get("/api/suggestions", async (req, res) => {
  try {
    const query = req.query.q || "";
    if (!query) {
      return res
        .status(400)
        .json({ error: 'Query parameter "q" is required.' });
    }

    const suggestions = await fetchStockSuggestions(query);
    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
