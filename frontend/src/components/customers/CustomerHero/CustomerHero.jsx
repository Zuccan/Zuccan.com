import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../common/Button/Button';
import { apiClient } from '../../../services/api';
import { fadeInUp } from '../../../utils/motionVariants';
import './CustomerHero.css';

export const CustomerHero = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    setErrorMsg('');
    try {
      await apiClient.submitCustomerLead({
        name,
        email,
        interest: 'Early VIP Beta Access'
      });
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="customer-hero section">
      <div className="customer-hero-ambient" />

      <div className="container customer-hero-grid">
        <div className="customer-hero-content">
          <div className="customer-hero-tag">
            <Sparkles size={14} className="tag-sparkle" />
            <span>Zuccano for Consumers</span>
          </div>

          <h1 className="customer-hero-title text-gradient-customer">
            Everyday Commerce, Elevated to Pure Joy.
          </h1>

          <p className="customer-hero-description">
            Experience lightning-speed contactless shopping, instant 5% cashback on premier brands, and an AI-driven personal concierge right from your pocket.
          </p>

          {submitted ? (
            <div className="waitlist-success glass-panel">
              <CheckCircle size={22} className="success-icon" />
              <div>
                <strong>You're on the VIP list, {name}!</strong>
                <p>We've sent an invitation confirmation to {email}.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="customer-waitlist-form glass-panel">
              <div className="form-inputs">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="hero-input"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="hero-input"
                />
              </div>

              {errorMsg && <p className="form-error">{errorMsg}</p>}

              <Button
                variant="customer"
                size="md"
                disabled={loading}
                icon={ArrowRight}
                type="submit"
              >
                {loading ? 'Submitting...' : 'Claim Early VIP Access'}
              </Button>
            </form>
          )}

          <div className="customer-app-badges">
            <div className="app-badge">
              <Download size={16} />
              <span>Available for iOS & Android</span>
            </div>
            <span className="app-badge-separator">•</span>
            <span>Rated 4.9★ by 250,000+ shoppers</span>
          </div>
        </div>

        {/* Interactive App Mockup Graphic */}
        <motion.div
          className="customer-hero-mockup"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="phone-chassis glass-panel">
            <div className="phone-screen">
              <div className="phone-header">
                <span>Zuccano Pay</span>
                <span className="balance-pill">VIP Platinum</span>
              </div>
              <div className="phone-balance-card">
                <span className="balance-title">Cashback Vault</span>
                <span className="balance-amount">$1,480.50</span>
                <span className="balance-rate">+5.2% reward booster active</span>
              </div>
              <div className="phone-quick-actions">
                <div className="action-circle">Scan</div>
                <div className="action-circle">Transfer</div>
                <div className="action-circle">Cashback</div>
                <div className="action-circle">Perks</div>
              </div>
              <div className="phone-activity">
                <span className="activity-label">Recent Rewards</span>
                <div className="activity-row">
                  <span>Apple Store</span>
                  <span className="activity-gain">+$42.00</span>
                </div>
                <div className="activity-row">
                  <span>Starbucks Global</span>
                  <span className="activity-gain">+$3.50</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerHero;
