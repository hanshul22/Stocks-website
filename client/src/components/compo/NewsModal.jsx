import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import NewsCard from '../compo/NewsCard';
import styles from '../styles/NewsModal.module.css';

const NewsModal = ({ isOpen, onRequestClose, news }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="News Modal"
            className={styles.modal}
            overlayClassName={styles.overlay}
            shouldCloseOnOverlayClick={true}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={styles.modalContent}
            >
                <h2>Stock News</h2>
                <button onClick={onRequestClose} className={styles.closeButton}>X</button>
                <div className={styles.newsList}>
                    {news.map((article, index) => (
                        <NewsCard key={index} news={article} />
                    ))}
                </div>
            </motion.div>
        </Modal>
    );
};

export default NewsModal;
