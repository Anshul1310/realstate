import Link from 'next/link';
import styles from './page.module.css';
import { Search, DollarSign, Cpu, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>The Future of Real Estate is Here.</h1>
        <p className={styles.subtitle}>
          Buy, sell, and analyze properties with the power of artificial intelligence.
        </p>
        
        <div className={styles.cardContainer}>
          {/* Card 1: Buyers */}
          <Link href="/buyers" className={styles.card}>
            <div className={styles.iconBox} style={{ background: '#e6f0ff', color: '#0066ff' }}>
              <Search size={32} />
            </div>
            <h2>For Buyers</h2>
            <p>Find undervalued homes and hidden gems before anyone else.</p>
            <span className={styles.linkText}>Start Searching <ArrowRight size={16} /></span>
          </Link>

          {/* Card 2: Sellers */}
          <Link href="/sellers" className={styles.card}>
            <div className={styles.iconBox} style={{ background: '#fff0f3', color: '#ff385c' }}>
              <DollarSign size={32} />
            </div>
            <h2>For Sellers</h2>
            <p>Get an instant AI valuation and sell at the market peak.</p>
            <span className={styles.linkText}>Get Valuation <ArrowRight size={16} /></span>
          </Link>

          {/* Card 3: AI */}
          <Link href="/ai" className={styles.card}>
            <div className={styles.iconBox} style={{ background: '#f3e6ff', color: '#8844ff' }}>
              <Cpu size={32} />
            </div>
            <h2>AI Insights</h2>
            <p>Deep market analysis, price predictions, and investment scores.</p>
            <span className={styles.linkText}>Explore Data <ArrowRight size={16} /></span>
          </Link>
        </div>
      </section>
    </main>
  );
}