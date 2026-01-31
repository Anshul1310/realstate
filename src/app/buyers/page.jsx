'use client';

import React from 'react';
import styles from './style.module.css';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Buyers = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.hero}
        >
          <h1>Find your dream home with AI.</h1>
          <p>We analyze market trends to get you the best price.</p>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search by city..." />
            <button className={styles.searchBtn}>Search</button>
          </div>
        </motion.header>

        <motion.section 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div 
              key={item} 
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={styles.card}
            >
              <div className={styles.imagePlaceholder}></div>
              <div className={styles.cardContent}>
                <h3>Modern Loft in Downtown</h3>
                <p className={styles.price}>$450,000</p>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  );
};

export default Buyers;