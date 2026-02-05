"use client"; 

import Link from 'next/link';
import styles from './page.module.css';
import { Search, DollarSign, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className={styles.title} variants={itemVariants}>
            The Future of Real Estate is Here.
          </motion.h1>
          
          <motion.p className={styles.subtitle} variants={itemVariants}>
            Buy, sell, and analyze properties with the power of artificial intelligence.
          </motion.p>
          
          <motion.div className={styles.cardContainer} variants={containerVariants}>
            {/* Card 1: Buyers */}
            <motion.div variants={itemVariants}>
              <Link href="/buyers" className={styles.card}>
                <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
                  <Search size={32} />
                </div>
                <h2>For Buyers</h2>
                <p>Find undervalued homes and hidden gems before anyone else.</p>
                <span className={styles.linkText}>Start Searching <ArrowRight size={16} /></span>
              </Link>
            </motion.div>

            {/* Card 2: Sellers */}
            <motion.div variants={itemVariants}>
              <Link href="/sellers" className={styles.card}>
                <div className={`${styles.iconBox} ${styles.iconBoxRed}`}>
                  <DollarSign size={32} />
                </div>
                <h2>For Sellers</h2>
                <p>Get an instant AI valuation and sell at the market peak.</p>
                <span className={styles.linkText}>Get Valuation <ArrowRight size={16} /></span>
              </Link>
            </motion.div>

            {/* Card 3: AI */}
            <motion.div variants={itemVariants}>
              <Link href="/ai" className={styles.card}>
                <div className={`${styles.iconBox} ${styles.iconBoxPurple}`}>
                  <Cpu size={32} />
                </div>
                <h2>AI Insights</h2>
                <p>Deep market analysis, price predictions, and investment scores.</p>
                <span className={styles.linkText}>Explore Data <ArrowRight size={16} /></span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}