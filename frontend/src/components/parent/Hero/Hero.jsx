import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = () => {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="zuccano-hero-root">
      <div className="hero-inner-container">
        {/* Main Central Typography */}
        <motion.div
          className="hero-headings"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-line">
            Technology for everyone.
          </h1>
          <h1 className="hero-line">
            Built for <span className="nowrap-token">business<span className="dot-red" /></span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          Products and solutions for businesses and everyday life.
        </motion.p>

        {/* Dual CTA Buttons Matching Reference Exactly */}
        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Black Pill: For Business */}
          <Link to="/business" className="hero-pill-btn btn-dark">
            <span>For Business</span>
            <ArrowUpRight size={18} className="pill-arrow" />
          </Link>

          {/* White Pill with Outline: For Everyone */}
          <Link to="/customers" className="hero-pill-btn btn-light">
            <span>For Everyone</span>
            <ArrowUpRight size={18} className="pill-arrow" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Scroll to Explore Indicator */}
      <motion.div
        className="hero-scroll-indicator"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="scroll-label">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={17} className="scroll-arrow-icon" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
