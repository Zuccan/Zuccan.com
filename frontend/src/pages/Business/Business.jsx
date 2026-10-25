import React from 'react';
import { BusinessHero } from '../../components/business/BusinessHero/BusinessHero';
import { PartnerInquiryForm } from '../../components/business/PartnerInquiryForm/PartnerInquiryForm';
import { GlowCard } from '../../components/common/GlowCard/GlowCard';
import { Marquee } from '../../components/effects/Marquee/Marquee';
import { Server, ShieldCheck, Activity, Layers, Terminal, Globe } from 'lucide-react';
import './Business.css';

const SOLUTIONS = [
  {
    icon: Server,
    title: 'High-Volume Settlement Engine',
    desc: 'Instant batch or real-time settlements with multi-currency routing across 140+ countries.'
  },
  {
    icon: Terminal,
    title: 'Developer-First APIs & Webhooks',
    desc: 'TypeScript, Python, and Go SDKs with end-to-end sandbox environments and comprehensive docs.'
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Fraud Shield',
    desc: 'Proprietary machine learning models inspecting 2,000+ transaction signals in sub-15ms.'
  },
  {
    icon: Globe,
    title: 'Global Omnichannel Sync',
    desc: 'Unify in-store POS, mobile apps, and online checkouts into a single real-time ledger.'
  }
];

export const Business = () => {
  return (
    <div className="business-page">
      {/* 1. B2B Enterprise Hero */}
      <BusinessHero />

      {/* 2. Enterprise Ticker */}
      <div className="business-ticker-wrapper">
        <Marquee
          items={[
            '💼 SOC2 TYPE II CERTIFIED',
            '⚡ 99.999% SLA UPTIME',
            '🌐 GLOBAL ISO 20022 READY',
            '🔒 256-BIT QUANTUM-SAFE ENCRYPTION',
            '📈 500M+ DAILY TRANSACTIONS'
          ].map((text, i) => (
            <span key={i} className="business-ticker-item">
              {text}
            </span>
          ))}
          speed={26}
        />
      </div>

      {/* 3. Solutions Grid */}
      <section id="solutions" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label" style={{ color: 'var(--accent-business)' }}>
              Core Infrastructure
            </span>
            <h2 className="section-title text-gradient-business">
              Engineered for Enterprise Throughput
            </h2>
            <p className="section-desc">
              Everything high-growth enterprises require to accelerate international expansion and transaction efficiency.
            </p>
          </div>

          <div className="solutions-grid">
            {SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <GlowCard
                  key={idx}
                  className="solution-card"
                  glowColor="rgba(245, 158, 11, 0.16)"
                >
                  <div className="solution-icon-wrap">
                    <Icon size={24} className="solution-icon-svg" />
                  </div>
                  <h3 className="solution-title">{sol.title}</h3>
                  <p className="solution-desc">{sol.desc}</p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Enterprise Partner Inquiry Lead Capture (FastAPI Connected) */}
      <PartnerInquiryForm />
    </div>
  );
};

export default Business;
