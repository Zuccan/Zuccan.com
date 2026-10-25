import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, ShieldCheck, Globe, Cpu, CheckCircle2 } from 'lucide-react';
import './Business.css';

const PERKS = [
  { icon: Cpu,         text: 'Microsecond API latency with developer SDKs' },
  { icon: ShieldCheck, text: 'Bank-grade zero-trust fraud protection' },
  { icon: Globe,       text: 'Multi-currency settlements in 140+ countries' },
  { icon: Building2,   text: '99.999% SLA uptime guaranteed' },
];

export const Business = () => {
  const [form, setForm] = useState({ company: '', name: '', email: '', size: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // simulated request
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="wl-page">

      {/* ── LEFT PANEL ── */}
      <div className="wl-left">
        <div className="wl-left-inner">
          <span className="wl-eyebrow">For Business</span>

          <motion.h1
            className="wl-title"
            spellCheck={false}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            Enterprise<br />
            infrastructure<br />
            built for<br />
            <span className="wl-title-accent">scale<span className="wl-dot">.</span></span>
          </motion.h1>

          <motion.p
            className="wl-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            Join the waitlist for early B2B access. Get priority onboarding,
            dedicated support, and launch pricing — reserved for founding partners.
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
            <span className="wl-badge">SOC2 Type II</span>
            <span className="wl-badge">ISO 27001</span>
            <span className="wl-badge">PCI DSS Level 1</span>
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
                <h2 className="wl-form-title">Request Early Access</h2>
                <p className="wl-form-sub">
                  We review every application personally. Expect a response within 48 hours.
                </p>
              </div>

              <form className="wl-form" onSubmit={handleSubmit} noValidate>
                <div className="wl-field-row">
                  <div className="wl-field">
                    <label className="wl-label" htmlFor="b-name">Your Name</label>
                    <input
                      id="b-name"
                      className="wl-input"
                      type="text"
                      name="name"
                      placeholder="Pavan Reddy"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="wl-field">
                    <label className="wl-label" htmlFor="b-company">Company Name</label>
                    <input
                      id="b-company"
                      className="wl-input"
                      type="text"
                      name="company"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="wl-field">
                  <label className="wl-label" htmlFor="b-email">Work Email</label>
                  <input
                    id="b-email"
                    className="wl-input"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="wl-field">
                  <label className="wl-label" htmlFor="b-size">Company Size</label>
                  <select
                    id="b-size"
                    className="wl-input wl-select"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select team size</option>
                    <option value="1-10">1 – 10 employees</option>
                    <option value="11-50">11 – 50 employees</option>
                    <option value="51-200">51 – 200 employees</option>
                    <option value="201-500">201 – 500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div className="wl-field">
                  <label className="wl-label" htmlFor="b-message">What are you building? <span className="wl-optional">(optional)</span></label>
                  <textarea
                    id="b-message"
                    className="wl-input wl-textarea"
                    name="message"
                    placeholder="Briefly describe your use case..."
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                  />
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
                      <span>Request Enterprise Access</span>
                      <ArrowUpRight size={18} />
                    </>
                  )}
                </button>
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
              <h2 className="wl-success-title">You're on the list.</h2>
              <p className="wl-success-sub">
                We've received your request. Our team will reach out to <strong>{form.email}</strong> within 48 hours to begin your onboarding.
              </p>
              <div className="wl-success-num">
                <span className="wl-success-num-label">Your position</span>
                <span className="wl-success-num-val">#247</span>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Business;
