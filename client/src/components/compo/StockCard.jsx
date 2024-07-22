import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/StockCard.module.css';

const StockCard = ({ stock, onClick }) => {
  return (
    <motion.div
      className={styles.stockCard}
      onClick={() => onClick(stock.symbol)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h2>{stock.companyName}</h2>
      <p>Sector: {stock.sector}</p>
      <p>Price: ${stock.price}</p>
      <p>Market Cap: {stock.marketCap}</p>
      <button
        className={styles.newsButton}
        onClick={(e) => {
          e.stopPropagation();
          onClick(stock.symbol);
        }}
      >
        Relevant News
      </button>
    </motion.div>
  );
};

export default StockCard;
