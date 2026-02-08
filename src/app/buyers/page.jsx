'use client';

import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { motion, AnimatePresence } from 'framer-motion';

// Helper Component for "Printing" Animation
const TypewriterEffect = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className={styles.typewriterText}>{displayedText}</span>;
};

const Buyers = () => {
  const [formData, setFormData] = useState({
    property_id: '',
    city: '',
    commercial_type: 'office',
    size_sqm: '',
    annual_rent: '',
    occupancy_status: '',
    lease_term_years: ''
  });

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation(null);
    setError(null);

    // Prepare payload with correct types (floats for numbers)
    const payload = {
      property_id: formData.property_id,
      city: formData.city,
      commercial_type: formData.commercial_type,
      size_sqm: parseFloat(formData.size_sqm),
      annual_rent: parseFloat(formData.annual_rent),
      occupancy_status: formData.occupancy_status,
      lease_term_years: parseFloat(formData.lease_term_years)
    };

    try {
      const response = await fetch('https://project-wokd.onrender.com/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendation');
      }

      const data = await response.json();

      // Construct recommendation object from API response
      // Assuming API returns an explanation/recommendation string or object
      // We map it to our UI structure
      setRecommendation({
        ...formData, // Keep original details
        // If API returns a specific 'recommendation_text' or similar, use it. 
        // Otherwise stringify the whole data or use a default success message.
        aiReasoning: data.recommendation || data.message || JSON.stringify(data), 
        matchScore: data.score ? Math.round(data.score * 100) : 95, // Example fallback
        name: `AI Analyzed: ${formData.commercial_type} in ${formData.city}`,
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
      });

    } catch (err) {
      console.error(err);
      setError("Unable to connect to AI server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.hero}
        >
          <h1>Find your dream investment with AI.</h1>
          <p>Enter property details below to get a real-time AI analysis.</p>
        </motion.header>

        <div className={styles.contentContainer}>
          {/* Form Section */}
          <motion.section 
            className={styles.formSection}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2>Property Criteria</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="property_id">Property ID</label>
                  <input 
                    type="text" 
                    id="property_id" 
                    name="property_id" 
                    placeholder="e.g. PROP_001"
                    value={formData.property_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    placeholder="e.g. Bengaluru"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="commercial_type">Commercial Type</label>
                  <select 
                    id="commercial_type" 
                    name="commercial_type" 
                    value={formData.commercial_type}
                    onChange={handleChange}
                  >
                    <option value="office">Office</option>
                    <option value="retail_shop">Retail Shop</option>
                    <option value="showroom">Showroom</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="size_sqm">Size (sqm)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    id="size_sqm" 
                    name="size_sqm" 
                    placeholder="e.g. 1200.0"
                    value={formData.size_sqm}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="annual_rent">Annual Rent (₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    id="annual_rent" 
                    name="annual_rent" 
                    placeholder="e.g. 1800000.0"
                    value={formData.annual_rent}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="occupancy_status">Occupancy Status</label>
                  <input 
                    type="text" 
                    id="occupancy_status" 
                    name="occupancy_status" 
                    placeholder="e.g. vacant"
                    value={formData.occupancy_status}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="lease_term_years">Lease Term (Years)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    id="lease_term_years" 
                    name="lease_term_years" 
                    placeholder="e.g. 3.0"
                    value={formData.lease_term_years}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Connecting to AI...' : 'Analyze Property'}
              </button>
            </form>
          </motion.section>

          {/* Result Section */}
          <div className={styles.resultContainer}>
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.loader}
                >
                  <div className={styles.spinner}></div>
                  <p>AI is processing property data...</p>
                </motion.div>
              )}

              {error && !loading && (
                <motion.div 
                   key="error"
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }}
                   className={styles.errorCard}
                >
                  <p>⚠️ {error}</p>
                </motion.div>
              )}

              {!recommendation && !loading && !error && (
                <motion.div 
                  key="placeholder"
                  className={styles.placeholderCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className={styles.placeholderIcon}>✨</div>
                  <h3>AI Analysis Ready</h3>
                  <p>
                    Submit property details to receive a comprehensive AI-generated recommendation report.
                  </p>
                </motion.div>
              )}

              {recommendation && !loading && (
                <motion.div 
                  key="result"
                  className={styles.recCard}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  
                  
                  <div className={styles.recContent}>
                    <div className={styles.recHeader}>
                      <h3>{recommendation.name}</h3>
                      <div className={styles.aiNote}>
                        <strong>AI Verdict: </strong>
                        {/* Typewriter Effect Applied Here */}
                        <TypewriterEffect text={recommendation.aiReasoning} />
                      </div>
                    </div>
                    
                    <div className={styles.detailsGrid}>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>ID</span>
                        <span className={styles.value}>{recommendation.property_id}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>City</span>
                        <span className={styles.value}>{recommendation.city}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Rent</span>
                        <span className={styles.value}>₹{recommendation.annual_rent}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Size</span>
                        <span className={styles.value}>{recommendation.size_sqm} sqm</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Buyers;