import React from 'react';
import styles from '../styles/NewsCard.module.css';

const NewsCard = ({ news }) => {
    return (
        <div className={styles.newsCard}>
            <h4>{news.title}</h4>
            <p>{new Date(news.date).toLocaleDateString()}</p>
            <p>Source: {news.source}</p>
            <a href={news.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
    );
};

export default NewsCard;
