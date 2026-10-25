import React from 'react';
import './StatsSection.css';

const STATS = [
  { value: '$4.2B+', label: 'Annual Ecosystem Volume', note: 'Transactions processed globally' },
  { value: '14M+', label: 'Active Users', note: 'Engaging across retail apps' },
  { value: '52,000+', label: 'Enterprise Partners', note: 'Brands, merchants & logistics' },
  { value: '99.99%', label: 'Infrastructure Uptime', note: 'High availability SLA' }
];

export const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-note">{stat.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
