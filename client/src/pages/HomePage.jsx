import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchBar from "../components/compo/SearchBar";
import StockCard from "../components/compo/StockCard";
import NewsModal from "../components/compo/NewsModal";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURI}/api/stocks`);
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURI}/api/news`);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchStocks();
    fetchNews();
  }, []);

  const handleCardClick = (symbol) => {
    setSelectedStock(symbol);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedStock(null);
  };

  const filteredNews = news.filter((article) => article.symbol === selectedStock);

  const filteredStocks = stocks.filter((stock) => {
    if (searchQuery === "") {
      return true; // Show all stocks if search query is empty
    }
    return (
      stock.companyName &&
      stock.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <motion.div
      className={styles.homePage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Stock Analysis App</h1>
      <Link to={"/ai-search"}>
        <button className={styles.googleAi}>Ask suggestion from GoogleAI</button>
      </Link>
      <SearchBar onSearch={setSearchQuery} />
      <motion.div className={styles.stockList} layout>
        {filteredStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            onClick={handleCardClick}
          />
        ))}
      </motion.div>
      <NewsModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        news={filteredNews}
      />
    </motion.div>
  );
};

export default HomePage;
