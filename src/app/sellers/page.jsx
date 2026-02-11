'use client';

import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SellersPage() {
  // Form State
  const [formData, setFormData] = useState({
    city: '',
    type: 'residential',
    sqft: '',
    bedrooms: '',
  });

  const [topProperties, setTopProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Commercial Type Mapping (API returns Int, we might want to display string)
  const COMMERCIAL_TYPES = ['Office', 'Retail Shop', 'Showroom', 'Warehouse'];

  // 1. Fetch Top 10 Properties on Mount
  useEffect(() => {
    const fetchTopProperties = async () => {
      try {
        const response = await fetch('https://project-wokd.onrender.com/properties/top10');
        if (!response.ok) throw new Error('Failed to load top properties');
        const data = await response.json();
        setTopProperties(data);
      } catch (err) {
        console.error("Error fetching top properties:", err);
      }
    };

    fetchTopProperties();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Click Handler for Slider Items
  const handlePropertyClick = (property) => {
    // Convert SQM to Sq. Ft. (approx 10.764)
    const sqftConverted = property.size_sqm ? Math.round(property.size_sqm * 10.764) : '';

    setFormData({
      city: property.city || '',
      type: 'commercial', // API returns commercial properties
      sqft: sqftConverted,
      bedrooms: '', // Commercial properties typically don't list bedrooms
    });

    // Scroll to form for better UX
    const formElement = document.getElementById('ai-strategy-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleAiAnalyze = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating AI API call
    setTimeout(() => {
      setLoading(false);
      setAiResult({
        estPrice: `$${(Number(formData.sqft) * 350).toLocaleString()}`,
        confidence: '94%',
        strategy: `Based on current market trends in ${formData.city}, a ${formData.type} property of this size (${formData.sqft} sq.ft) is in high demand. We recommend listing on Thursday for maximum exposure.`,
      });
    }, 2000);
  };

  return (
    <main className={styles.container}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
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

        <div className={styles.right}>
          <div className={styles.mockCard}>
            <div className={styles.mockHeader}>
              <span>Your Property Estimate</span>
            </div>
            <div className={styles.mockPrice}>$485,000</div>
            <div className={styles.mockGraph}>
              <div className={styles.bar} style={{height: '40%'}}></div>
              <div className={styles.bar} style={{height: '60%'}}></div>
              <div className={styles.bar} style={{height: '50%'}}></div>
              <div className={styles.bar} style={{height: '80%'}}></div>
              <div className={styles.barActive} style={{height: '95%'}}></div>
            </div>
            <p className={styles.mockLabel}>Market Confidence: <strong>98%</strong></p>
          </div>
        </div>
      </section>

      {/* 2. Horizontal Property Slider (Fetched Data) */}
      <section className={styles.sliderSection}>
        <div className={styles.sliderHeader}>
          <h2>Recently Analyzed by Us</h2>
          <p>Real commercial properties evaluated by our AI. Click to load details.</p>
        </div>
        <div className={styles.sliderTrack}>
          {/* Duplicate list for infinite scroll effect */}
          {[...topProperties, ...topProperties].map((prop, idx) => {
            // Generate fallback images
             const fallbackImages = [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1577705998148-6bd4f549e1e7?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1582037928769-1d8f28c257b6?auto=format&fit=crop&w=600&q=80'
              ];
            const displayImg = fallbackImages[idx % fallbackImages.length];
            const displayType = COMMERCIAL_TYPES[prop.commercial_type] || 'Property';

            return (
              <div 
                className={styles.sliderCard} 
                key={`${prop.property_id}-${idx}`}
                onClick={() => handlePropertyClick(prop)}
              >
                <img src={displayImg} alt="Property" />
                <div className={styles.cardOverlay}>
                  <div className={styles.cardInfo}>
                     <span className={styles.cardPrice}>
                        ₹{(prop.annual_rent / 100000).toFixed(1)} L/yr
                     </span>
                     <span className={styles.cardLoc}>{prop.city}</span>
                  </div>
                  <span className={styles.cardType}>{displayType}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. AI Recommendation Section */}
      <section className={styles.aiSection} id="ai-strategy-form">
        <div className={styles.aiHeader}>
          <h2>Unlock Your Property's Potential</h2>
          <p>Get a detailed selling strategy generated by our advanced AI model.</p>
        </div>

        <div className={styles.aiContent}>
          {/* Form */}
          <form className={styles.aiForm} onSubmit={handleAiAnalyze}>
            <div className={styles.fieldGroup}>
              <label>City</label>
              <input 
                name="city" 
                type="text" 
                placeholder="e.g. San Francisco" 
                required 
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label>Property Type</label>
                <select 
                  name="type" 
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label>Bedrooms</label>
                <input 
                  name="bedrooms" 
                  type="number" 
                  placeholder="3" 
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label>Square Footage</label>
              <input 
                name="sqft" 
                type="number" 
                placeholder="e.g. 2500" 
                required 
                value={formData.sqft}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className={styles.analyzeBtn} disabled={loading}>
              {loading ? 'Analyzing...' : 'Generate AI Strategy'}
            </button>
          </form>

          {/* Result Area */}
          <div className={styles.aiResult}>
            {loading ? (
              <div className={styles.placeholderResult}>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles size={48} color="#ff385c" />
                </motion.div>
                <p style={{marginTop: 20}}>AI is crunching market data...</p>
              </div>
            ) : aiResult ? (
              <motion.div 
                className={styles.resultContent}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className={styles.aiBadge}>AI Recommendation</span>
                <h3>Estimated Value: {aiResult.estPrice}</h3>
                <p className={styles.resultText}>{aiResult.strategy}</p>
                <p style={{marginTop: 20, fontSize: '0.9rem', color: '#666'}}>
                  Confidence Score: <strong>{aiResult.confidence}</strong>
                </p>
              </motion.div>
            ) : (
              <div className={styles.placeholderResult}>
                <Sparkles size={48} color="#ccc" />
                <p style={{marginTop: 20}}>Fill out the form (or click a property above) to see the magic.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}