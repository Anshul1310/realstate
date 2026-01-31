import React from 'react';
import Navbar from './../components/Navbar';
import styles from './style.module.css';

const Buyers = () => {
  return (
    <div className={styles.page}>
      
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1>Find your dream home with AI.</h1>
          <p>We analyze market trends to get you the best price.</p>
          
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search by city, neighborhood, or zip" />
            <button className={styles.searchBtn}>Search</button>
          </div>
        </header>

        <section className={styles.grid}>
          {/* Mock Data Cards */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className={styles.card}>
              <div className={styles.imagePlaceholder}></div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3>Modern Loft in Downtown</h3>
                  <span className={styles.rating}>★ 4.9</span>
                </div>
                <p className={styles.desc}>2 beds • 850 sqft • AI Value: Great Deal</p>
                <p className={styles.price}>$450,000</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Buyers;