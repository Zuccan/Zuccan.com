import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Ecosystem.css';

export const Ecosystem = () => {
  return (
    <section id="ecosystem" className="eco-section">
      <div className="eco-container">

        {/* ── Top Header Row ── */}
        <div className="eco-header-row">
          <div className="eco-header-left">
            <span className="eco-eyebrow">Built for a broader world</span>
            <motion.h2
              className="eco-title"
              spellCheck={false}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Two pillars.{' '}
              <span style={{ display: 'block' }}>
                One vision<span className="eco-dot">.</span>
              </span>
            </motion.h2>
          </div>

          <div className="eco-header-right">
            <p className="eco-intro-text">
              We build technology for businesses that move forward and products
              for people who make everyday life better.
            </p>
          </div>
        </div>

        {/* ── Horizontal Divider ── */}
        <div className="eco-h-rule" />

        {/* ── Two Pillars ── */}
        <div className="eco-pillars">

          {/* Pillar 1 — B2B */}
          <motion.div
            className="eco-pillar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eco-pillar-number-row">
              <span className="eco-num">01</span>
              <span className="eco-num-line" />
            </div>
            <h3 className="eco-pillar-heading" spellCheck={false}>B2B</h3>
            <p className="eco-pillar-tag">For Businesses</p>
            <p className="eco-pillar-desc">
              Digital solutions for teams, companies and organisations.
            </p>
            <ul className="eco-bullet-list">
              <li><span className="eco-dash">—</span><span>Custom solutions</span></li>
              <li><span className="eco-dash">—</span><span>Scalable technology</span></li>
              <li><span className="eco-dash">—</span><span>Long term collaboration</span></li>
            </ul>
            <Link to="/business" className="eco-cta-link">
              <span>Explore B2B</span>
              <ArrowUpRight size={14} className="eco-cta-icon" />
            </Link>
          </motion.div>

          {/* Vertical / Horizontal Divider */}
          <div className="eco-v-rule" />

          {/* Pillar 2 — B2C */}
          <motion.div
            className="eco-pillar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <div className="eco-pillar-number-row">
              <span className="eco-num">02</span>
              <span className="eco-num-line" />
            </div>
            <h3 className="eco-pillar-heading" spellCheck={false}>B2C</h3>
            <p className="eco-pillar-tag">For People</p>
            <p className="eco-pillar-desc">
              Products and experiences designed for everyday users.
            </p>
            <ul className="eco-bullet-list">
              <li><span className="eco-dash">—</span><span>Simple and useful products</span></li>
              <li><span className="eco-dash">—</span><span>Everyday convenience</span></li>
              <li><span className="eco-dash">—</span><span>Direct user experience</span></li>
            </ul>
            <Link to="/customers" className="eco-cta-link">
              <span>Explore B2C</span>
              <ArrowUpRight size={14} className="eco-cta-icon" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
