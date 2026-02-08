import styles from './style.module.css';
import { Send, TrendingUp, MapPin, Zap } from 'lucide-react';

export default function AIPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        
        {/* Sidebar / Stats Area */}
        <aside className={styles.sidebar}>
          <div className={styles.statCard}>
            <div className={styles.iconBg}><TrendingUp size={20} /></div>
            <h3>Market Trend</h3>
            <p className={styles.positive}>+12.5% Up</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.iconBg}><Zap size={20} /></div>
            <h3>Hot Area</h3>
            <p>Brooklyn, NY</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.iconBg}><MapPin size={20} /></div>
            <h3>Active Listings</h3>
            <p>1,240</p>
          </div>
        </aside>

        {/* Chat Interface */}
        <section className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <h2>AI Deal Closer</h2>
            <p>Ask me about optimized property rates, investment opportunities, mortgage rates, or local insights.</p>
          </div>

          <div className={styles.chatWindow}>
            <div className={styles.messageAI}>
              <p>Hello! I analyze millions of data points on real Estate. How can I help you today?</p>
            </div>
            <div className={styles.messageUser}>
              <p>Is it a good time to buy in Miami?</p>
            </div>
            <div className={styles.messageAI}>
              <p>Miami is currently seeing a <strong>4% price correction</strong>. It is a buyers market in the downtown condos sector, but single-family homes remain competitive.</p>
            </div>
          </div>

          <div className={styles.inputArea}>
            <input type="text" placeholder="Ask anything..." />
            <button className={styles.sendBtn}><Send size={18} /></button>
          </div>
        </section>

      </div>
    </main>
  );
}
