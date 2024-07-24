import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from 'react';
import styles from '../styles/AISearchBar.module.css';
import { motion } from 'framer-motion';

const AISearchBar = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyCyav19FJJT8NiuT0Q59wTG5iw5FQ93zOo');

    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Generative AI Call to fetch text insights
     */
    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Provide detailed information about the stock ${search}, including its current price, recent performance, key statistics, and any relevant news.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    return (
        <div>
            <div className={styles.searchBarContainer}>
                <input
                    className={styles.inputField}
                    placeholder='Search about Stocks'
                    onChange={handleChangeSearch}
                    disabled={loading}
                />
                <button
                    className={styles.searchButton}
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>

            {loading ? (
                <p className={styles.loadingText}>Loading ...</p>
            ) : (
                aiResponse && (
                    <motion.div
                        className={`${styles.responseContainer} ${styles.fadeIn}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className={styles.responseText}>{aiResponse}</p>
                    </motion.div>
                )
            )}
        </div>
    );
};

export default AISearchBar;
