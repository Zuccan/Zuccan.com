import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Cpu, Database, BarChart3 } from 'lucide-react';
import { Button } from '../../common/Button/Button';
import { fadeInUp, staggerContainer } from '../../../utils/motionVariants';
import './BusinessHero.css';

export const BusinessHero = () => {
  return (
    <section className="business-hero section">
      <div className="business-hero-ambient" />

      <div className="container business-hero-container">
        <div className="business-hero-tag">
          <ShieldCheck size={14} className="tag-shield" />
          <span>Zuccano Enterprise Infrastructure</span>
        </div>

        <h1 className="business-hero-title text-gradient-business">
          High-Performance Commerce Infrastructure for Global Enterprises.
        </h1>

        <p className="business-hero-description">
          Scale your enterprise payment pipelines, supply chain orchestration, and omnichannel retail operations with microsecond latency and 99.999% SLA uptime.
        </p>

        <div className="business-hero-actions">
          <Button variant="business" size="lg" href="#partner-form" icon={ArrowRight}>
            Request Enterprise Demo
          </Button>
          <Button variant="glass" size="lg" href="#solutions">
            API Documentation
          </Button>
        </div>

        {/* Enterprise Highlights Grid */}
        <motion.div
          className="business-hero-metrics"
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="metric-box glass-panel">
            <Cpu size={22} className="metric-icon" />
            <span className="metric-val">12ms</span>
            <span className="metric-lbl">Avg API Latency</span>
          </motion.div>

          <motion.div variants={fadeInUp} className="metric-box glass-panel">
            <Database size={22} className="metric-icon" />
            <span className="metric-val">500M+</span>
            <span className="metric-lbl">Daily API Requests</span>
          </motion.div>

          <motion.div variants={fadeInUp} className="metric-box glass-panel">
            <BarChart3 size={22} className="metric-icon" />
            <span className="metric-val">0.001%</span>
            <span className="metric-lbl">Fraud Ratio (AI Guard)</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessHero;
