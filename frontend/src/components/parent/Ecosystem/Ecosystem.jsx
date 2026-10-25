import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Users, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Ecosystem.css';

export const Ecosystem = () => {
  return (
    <section id="ecosystem" className="ecosystem-section">
      <div className="container">
        {/* Section Header */}
        <div className="ecosystem-header">
          <span className="section-pill">Two Pillars. One Vision.</span>
          <h2 className="ecosystem-title">
            Built for modern life and enterprise scale<span className="dot-red">.</span>
          </h2>
          <p className="ecosystem-sub">
            Zuccano delivers connected commerce infrastructure, uniting consumer-first experiences with enterprise-grade solutions.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="ecosystem-cards-grid">
          {/* Card 1: For Business */}
          <div className="division-card card-business-theme">
            <div className="card-top">
              <span className="division-tag">Enterprise Infrastructure</span>
              <Building2 size={24} className="division-icon" />
            </div>

            <h3 className="division-heading">Zuccano for Business</h3>
            <p className="division-desc">
              High-frequency payment orchestration, automated supply chain cloud, and multi-channel commerce APIs built with 99.999% SLA uptime.
            </p>

            <ul className="division-points">
              <li>
                <Cpu size={16} />
                <span>Microsecond API latency with modern developer SDKs</span>
              </li>
              <li>
                <ShieldCheck size={16} />
                <span>Zero-trust enterprise fraud guard & bank-grade compliance</span>
              </li>
              <li>
                <Globe size={16} />
                <span>Instant global multi-currency settlements across 140+ countries</span>
              </li>
            </ul>

            <Link to="/business" className="card-action-btn dark">
              <span>Explore Enterprise Solutions</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Card 2: For Everyone */}
          <div className="division-card card-consumer-theme">
            <div className="card-top">
              <span className="division-tag">Consumer Lifestyle</span>
              <Users size={24} className="division-icon" />
            </div>

            <h3 className="division-heading">Zuccano for Everyone</h3>
            <p className="division-desc">
              Everyday commerce reinvented: 1-tap checkout, instant real cashback on premier brands, and smart spending intelligence right from your phone.
            </p>

            <ul className="division-points">
              <li>
                <Zap size={16} />
                <span>1-Tap biometric contactless checkout across all partner stores</span>
              </li>
              <li>
                <span className="highlight-bullet">💎</span>
                <span>Real liquid cashback deposited instantly with zero expired points</span>
              </li>
              <li>
                <span className="highlight-bullet">✨</span>
                <span>Curated VIP drops, exclusive event access, and intelligent savings</span>
              </li>
            </ul>

            <Link to="/customers" className="card-action-btn light">
              <span>Discover Customer App</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
