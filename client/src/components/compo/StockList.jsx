import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockCard from '../compo/StockCard';
import NewsModal from '../compo/NewsModal';
import styles from '../styles/StockList.module.css';

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [news, setNews] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/stocks');
            setStocks(result.data);
        };
        fetchData();
    }, []);

    const fetchNews = async (symbol) => {
        const result = await axios.get(`/api/news/${symbol}`);
        setNews(result.data);
        setModalIsOpen(true);
    };

    return (
        <div className={styles.stockList}>
            {stocks.map(stock => (
                <StockCard key={stock.symbol} stock={stock} onClick={fetchNews} />
            ))}
            <NewsModal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                news={news} 
            />
        </div>
    );
};

export default StockList;
