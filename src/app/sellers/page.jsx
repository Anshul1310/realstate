import styles from './style.module.css';
import { CheckCircle } from 'lucide-react';

export default function SellersPage() {
  return (
    <main className={styles.container}>
      <div className={styles.splitLayout}>
        {/* Left Side: Text & Form */}
        <div className={styles.left}>
          <h1>Sell smart. AI-driven valuation.</h1>
          <p>We analyze 50+ market data points to calculate the exact worth of your property today.</p>
          
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Enter your home address..." />
            <button>Get Estimate</button>
          </div>

          <div className={styles.features}>
            <div className={styles.feat}><CheckCircle size={20} color="#ff385c"/> Free instant report</div>
            <div className={styles.feat}><CheckCircle size={20} color="#ff385c"/> No hidden fees</div>
            <div className={styles.feat}><CheckCircle size={20} color="#ff385c"/> Connect with top agents</div>
          </div>
        </div>

        {/* Right Side: Visual Mockup */}
        <div className={styles.right}>
          <div className={styles.mockCard}>
            <div className={styles.mockHeader}>
              <span>Your Property Estimate</span>
            </div>
            <div className={styles.mockPrice}>$485,000</div>
            <div className={styles.mockGraph}>
              {/* Simple CSS Bar Graph Mockup */}
              <div className={styles.bar} style={{height: '40%'}}></div>
              <div className={styles.bar} style={{height: '60%'}}></div>
              <div className={styles.bar} style={{height: '50%'}}></div>
              <div className={styles.bar} style={{height: '80%'}}></div>
              <div className={styles.barActive} style={{height: '95%'}}></div>
            </div>
            <p className={styles.mockLabel}>Market Confidence: <strong>98%</strong></p>
          </div>
        </div>
      </div>
    </main>
  );
}