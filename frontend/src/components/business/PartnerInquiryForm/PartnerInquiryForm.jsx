import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Building, Mail, User, Phone, FileText } from 'lucide-react';
import { Button } from '../../common/Button/Button';
import { apiClient } from '../../../services/api';
import './PartnerInquiryForm.css';

export const PartnerInquiryForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    business_email: '',
    phone: '',
    company_size: '11-50',
    solution_interest: 'Enterprise Omnichannel APIs',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await apiClient.submitBusinessInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="partner-form" className="section partner-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label" style={{ color: 'var(--accent-business)' }}>
            Enterprise Partnership
          </span>
          <h2 className="section-title text-gradient-business">
            Connect with Our Global Enterprise Team
          </h2>
          <p className="section-desc">
            Get bespoke volume pricing, sandbox credentials, and dedicated solutions architecture support.
          </p>
        </div>

        <div className="partner-form-card glass-panel">
          {submitted ? (
            <div className="partner-success-state">
              <CheckCircle size={48} className="success-icon-large" />
              <h3>Partnership Request Received!</h3>
              <p>
                Thank you, <strong>{formData.contact_name}</strong> from <strong>{formData.company_name}</strong>.
                Our Senior Enterprise Solutions Architect will review your requirements and reach out at <strong>{formData.business_email}</strong> within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="partner-form-grid">
              <div className="form-group">
                <label><Building size={14} /> Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="e.g. Acme Global Logistics"
                  required
                />
              </div>

              <div className="form-group">
                <label><User size={14} /> Full Contact Name</label>
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label><Mail size={14} /> Work Email</label>
                <input
                  type="email"
                  name="business_email"
                  value={formData.business_email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="form-group">
                <label><Phone size={14} /> Work Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="form-group">
                <label>Company Size</label>
                <select
                  name="company_size"
                  value={formData.company_size}
                  onChange={handleChange}
                >
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="200+">200+ Enterprise</option>
                </select>
              </div>

              <div className="form-group">
                <label>Solution of Interest</label>
                <select
                  name="solution_interest"
                  value={formData.solution_interest}
                  onChange={handleChange}
                >
                  <option value="Enterprise Omnichannel APIs">Enterprise Omnichannel APIs</option>
                  <option value="High-Frequency Settlement Engine">High-Frequency Settlement Engine</option>
                  <option value="Supply Chain & Inventory Cloud">Supply Chain & Inventory Cloud</option>
                  <option value="Custom Strategic Partnership">Custom Strategic Partnership</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label><FileText size={14} /> Project Scope & Objectives</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your transaction volume, timeline, and current infrastructure stack..."
                />
              </div>

              {errorMsg && <p className="form-error full-width">{errorMsg}</p>}

              <div className="form-submit-row full-width">
                <Button
                  variant="business"
                  size="lg"
                  type="submit"
                  disabled={loading}
                  icon={ArrowRight}
                >
                  {loading ? 'Submitting...' : 'Submit Enterprise Inquiry'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnerInquiryForm;
