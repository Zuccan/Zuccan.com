import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Gift, Award, Smartphone, CheckCircle2 } from 'lucide-react';
import './Customers.css';

const PERKS = [
  { icon: Zap,       text: '1-tap biometric checkout at partner stores' },
  { icon: Award,     text: 'Real cashback — no points, no expiry' },
  { icon: Gift,      text: 'Exclusive drops, VIP events & curated perks' },
  { icon: Smartphone,text: 'Smart spending AI built into your pocket' },
];

export const Customers = () => {
  const [form, setForm]         = useState({ name: '', email: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="wl-page wl-page-consumer">

      {/* ── LEFT PANEL ── */}
      <div className="wl-left">
        <div className="wl-left-inner">
          <span className="wl-eyebrow">For Everyone</span>

          <motion.h1
            className="wl-title"
            spellCheck={false}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            Shopping<br />
            that actually<br />
            works for<br />
            <span className="wl-title-accent">you<span className="wl-dot">.</span></span>
          </motion.h1>

          <motion.p
            className="wl-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            Be the first to experience 1-tap checkout, real instant cashback,
            and a smarter way to shop. Join the waitlist — spots are limited.
          </motion.p>

          <motion.ul
            className="wl-perks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.6 }}
          >
            {PERKS.map(({ icon: Icon, text }, i) => (
              <li key={i} className="wl-perk-item">
                <span className="wl-perk-dash">—</span>
                <span>{text}</span>
              </li>
            ))}
          </motion.ul>

          <div className="wl-badge-row">
            <span className="wl-badge">Free Forever</span>
            <span className="wl-badge">Zero Hidden Fees</span>
            <span className="wl-badge">Biometric Secure</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="wl-right">
        <div className="wl-form-card">

          {!submitted ? (
            <>
              <div className="wl-form-header">
                <p className="wl-form-num">01</p>
                <h2 className="wl-form-title">Join the Waitlist</h2>
                <p className="wl-form-sub">
                  Early members get priority access, bonus cashback, and founding member perks.
                </p>
              </div>

              <form className="wl-form" onSubmit={handleSubmit} noValidate>
                <div className="wl-field">
                  <label className="wl-label" htmlFor="c-name">Your Name</label>
                  <input
                    id="c-name"
                    className="wl-input"
                    type="text"
                    name="name"
                    placeholder="Kavana G Aridhiya"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="wl-field">
                  <label className="wl-label" htmlFor="c-email">Email Address</label>
                  <input
                    id="c-email"
                    className="wl-input"
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="wl-field">
                  <label className="wl-label" htmlFor="c-city">Your City</label>
                  <input
                    id="c-city"
                    className="wl-input"
                    type="text"
                    name="city"
                    placeholder="Bangalore, Hyderabad, Mumbai..."
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Referral counter display */}
                <div className="wl-counter-strip">
                  <span className="wl-counter-num">2,841</span>
                  <span className="wl-counter-label">people already on the list</span>
                </div>

                <button
                  type="submit"
                  className={`wl-submit-btn${loading ? ' wl-loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="wl-spinner" />
                  ) : (
                    <>
                      <span>Secure My Spot</span>
                      <ArrowUpRight size={18} />
                    </>
                  )}
                </button>

                <p className="wl-fine-print">No spam. Unsubscribe anytime. We only email when it matters.</p>
              </form>
            </>
          ) : (
            <motion.div
              className="wl-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckCircle2 size={52} className="wl-success-icon" />
              <h2 className="wl-success-title">You're in!</h2>
              <p className="wl-success-sub">
                We'll notify <strong>{form.email}</strong> the moment Zuccano launches in <strong>{form.city}</strong>. Get ready.
              </p>
              <div className="wl-success-num">
                <span className="wl-success-num-label">Your position</span>
                <span className="wl-success-num-val">#2,842</span>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Customers;
