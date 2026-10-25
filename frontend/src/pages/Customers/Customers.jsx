import React from 'react';
import { CustomerHero } from '../../components/customers/CustomerHero/CustomerHero';
import { Marquee } from '../../components/effects/Marquee/Marquee';
import { GlowCard } from '../../components/common/GlowCard/GlowCard';
import { ShoppingBag, Zap, Award, Gift, Smartphone, HeartHandshake } from 'lucide-react';
import './Customers.css';

const CONSUMER_PERKS = [
  {
    icon: Zap,
    title: '1-Tap Micro-Checkout',
    description: 'Zero typing required. Authenticate securely with biometrics for instant checkout across partner stores.'
  },
  {
    icon: Award,
    title: 'Up to 5% Instant Cashback',
    description: 'No points that expire. Real liquid cashback instantly credited to your Zuccano Pay balance.'
  },
  {
    icon: Gift,
    title: 'Exclusive Brand Drops',
    description: 'Early access to limited edition product drops, VIP concerts, and luxury lifestyle events.'
  },
  {
    icon: Smartphone,
    title: 'Smart Spending AI',
    description: 'Intelligent budgets, automated bill negotiation, and real-time alerts so you never overpay.'
  }
];

export const Customers = () => {
  return (
    <div className="customers-page">
      {/* 1. High Energy B2C Hero with App Preview & Lead Capture */}
      <CustomerHero />

      {/* 2. Consumer Feature Ticker */}
      <div className="customer-ticker-wrapper">
        <Marquee
          items={[
            '⚡ 1-TAP CHECKOUT',
            '💎 VIP CASHBACK',
            '🔒 BIOMETRIC SECURITY',
            '🎁 CURATED PERKS',
            '📱 SEAMLESS MOBILE APP',
            '✨ ZERO HIDDEN FEES'
          ].map((text, i) => (
            <span key={i} className="customer-ticker-item">
              {text}
            </span>
          ))}
          speed={24}
        />
      </div>

      {/* 3. Key Customer Benefits Grid */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label" style={{ color: 'var(--accent-customer)' }}>
              Built for Modern Shoppers
            </span>
            <h2 className="section-title text-gradient-customer">
              Why Millions Choose Zuccano
            </h2>
            <p className="section-desc">
              Every detail engineered to give you the most effortless shopping and rewards experience possible.
            </p>
          </div>

          <div className="perks-grid">
            {CONSUMER_PERKS.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <GlowCard
                  key={idx}
                  className="perk-card"
                  glowColor="rgba(6, 182, 212, 0.16)"
                >
                  <div className="perk-icon-wrap">
                    <Icon size={24} className="perk-icon-svg" />
                  </div>
                  <h3 className="perk-title">{perk.title}</h3>
                  <p className="perk-desc">{perk.description}</p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customers;
