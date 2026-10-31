import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Layers,
  Sparkles,
  Users,
  Upload,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Shield,
  FileText,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './PortalHome.css';

const PRODUCTS = [
  {
    id: 'zfit',
    name: 'ZFIT',
    tag: 'FLAGSHIP PRODUCT',
    subtitle: 'AI Wearable & Smart Companion',
    desc: 'Next-generation smart wearable, biometric tracking, mobile companion app, and avatar design.',
    disciplines: ['App Development', 'Hardware Rig', 'Firmware', 'UI/UX Design', 'Biometrics'],
    lead: 'Pavan Reddy (CEO)',
    accentColor: '#111111',
  },
  {
    id: 'b2c',
    name: 'Zuccano Consumer',
    tag: 'CONSUMER HARDWARE',
    subtitle: 'Everyday Tech & Hardware Catalog',
    desc: 'Consumer hardware lineup, smart rings, everyday accessories, packaging, and supply chain.',
    disciplines: ['Product Design', 'Supply Chain', 'Web Engineering', 'Packaging'],
    lead: 'Kumar MS (COO)',
    accentColor: '#111111',
  },
  {
    id: 'b2b',
    name: 'Zuccano Business',
    tag: 'ENTERPRISE SOLUTIONS',
    subtitle: 'Enterprise IT & Business Systems',
    desc: 'Enterprise software architecture, B2B hardware distribution, and client management systems.',
    disciplines: ['Cloud Systems', 'Security', 'Enterprise Sales', 'Client Ops'],
    lead: 'Executive Team',
    accentColor: '#111111',
  },
];

export const PortalHome = () => {
  const navigate = useNavigate();
  const { employee, isAuthenticated, logout } = useAuth();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Job application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [targetProduct, setTargetProduct] = useState('zfit');
  const [targetRole, setTargetRole] = useState('Frontend / React Developer');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [notes, setNotes] = useState('');

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    // If authenticated, navigate to dashboard with product context or open workspace
    if (isAuthenticated) {
      navigate('/dashboard', { state: { product: product.id } });
    } else {
      // If not authenticated, take them to login or workspace preview
      navigate('/login', { state: { product: product.id } });
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;

    // Save submission to local storage list
    try {
      const existing = JSON.parse(localStorage.getItem('zuccano_job_applications') || '[]');
      existing.unshift({
        id: Date.now(),
        name: applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        product: targetProduct,
        role: targetRole,
        portfolio: portfolioLink,
        notes,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem('zuccano_job_applications', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setShowApplyModal(false);
      // Reset
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setPortfolioLink('');
      setNotes('');
    }, 2200);
  };

  return (
    <div className="portal-home-root">
      {/* ── Background Architectural Grid Lines ── */}
      <div className="ph-grid-lines" aria-hidden="true">
        <div className="ph-grid-col" />
        <div className="ph-grid-col" />
        <div className="ph-grid-col" />
        <div className="ph-grid-col" />
      </div>

      {/* ── Top Header ── */}
      <header className="ph-header">
        <div className="ph-header-left">
          <Link to="/" className="ph-brand" title="Zuccano">
            <span className="ph-brand-name">zuccano</span>
            <span className="ph-brand-dot">.</span>
          </Link>
          <span className="ph-portal-tag">zuccano.me</span>
        </div>

        <div className="ph-header-right">
          {/* Apply for Job Button */}
          <button
            type="button"
            className="ph-btn-careers"
            onClick={() => setShowApplyModal(true)}
          >
            <Briefcase size={14} />
            <span>Apply for Job</span>
          </button>

          {/* User Status / Login Button */}
          {isAuthenticated ? (
            <div className="ph-user-pill">
              <span className="ph-user-name">{employee?.name}</span>
              <button
                type="button"
                className="ph-user-logout"
                onClick={() => logout()}
                title="Log out"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="ph-btn-login">
              <span>Sign In</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </header>

      {/* ── Main Product Selection Hero ── */}
      <main className="ph-main">
        <div className="ph-container">
          {/* Eyebrow & Title */}
          <div className="ph-hero-intro">
            <div className="ph-eyebrow">
              <span className="ph-eyebrow-num">01</span>
              <span className="ph-eyebrow-line" />
              <span>TEAM WORKSPACES // WORK MANAGEMENT</span>
            </div>

            <h1 className="ph-hero-title">
              CHOOSE YOUR<br />
              PRODUCT<span className="ph-title-dot">.</span>
            </h1>

            <p className="ph-hero-subtitle">
              Select your product division to upload work, submit deliverables, and manage your team records.
            </p>
          </div>

          {/* Products Cards Grid */}
          <div className="ph-products-grid">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="ph-product-card"
                onClick={() => handleSelectProduct(prod)}
                role="button"
                tabIndex={0}
              >
                <div className="ph-card-top">
                  <span className="ph-card-tag">{prod.tag}</span>
                  <span className="ph-card-lead">Lead: {prod.lead}</span>
                </div>

                <div className="ph-card-body">
                  <h2 className="ph-card-title">{prod.name}</h2>
                  <p className="ph-card-sub">{prod.subtitle}</p>
                  <p className="ph-card-desc">{prod.desc}</p>
                </div>

                <div className="ph-card-disciplines">
                  <span className="ph-disc-label">Active Work Areas:</span>
                  <div className="ph-disc-chips">
                    {prod.disciplines.map((d) => (
                      <span key={d} className="ph-disc-chip">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ph-card-footer">
                  <span className="ph-action-text">
                    Open {prod.name} Workspace
                  </span>
                  <div className="ph-arrow-circle">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Login Layers / Access Levels Information Bar */}
          <section className="ph-layers-section">
            <div className="ph-layers-header">
              <Shield size={16} />
              <span>PORTAL ACCESS LEVELS & ROLES</span>
            </div>
            <div className="ph-layers-grid">
              <div className="ph-layer-item">
                <strong>1. Executive & Admin</strong>
                <p>Manage all product workspaces, review submitted work, approve deliverables, and review job applications.</p>
              </div>
              <div className="ph-layer-item">
                <strong>2. Core Team Member</strong>
                <p>Upload project work, file code/design deliverables, and track work log records.</p>
              </div>
              <div className="ph-layer-item">
                <strong>3. Intern & Contributor</strong>
                <p>Submit individual task assignments and weekly progress reports.</p>
              </div>
              <div className="ph-layer-item highlight">
                <strong>4. Job Applicant</strong>
                <p>Submit job applications and portfolios directly to Zuccano leadership.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="ph-footer">
        <div className="ph-footer-left">
          <span className="ph-f-num">01</span>
          <span className="ph-f-line" />
          <span>ZUCCANO TEAM & WORK PORTAL</span>
        </div>
        <div className="ph-footer-right">
          <span>HOST: <strong>ZUCCANO.ME</strong></span>
          <span className="ph-f-dot">•</span>
          <span>EST. 2026</span>
        </div>
      </footer>

      {/* ── Job Application Modal ── */}
      {showApplyModal && (
        <div className="ph-modal-backdrop" onClick={() => setShowApplyModal(false)}>
          <div className="ph-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ph-modal-header">
              <div>
                <h3 className="ph-modal-title">
                  Apply to Zuccano<span className="ph-title-dot">.</span>
                </h3>
                <p className="ph-modal-subtitle">
                  Submit your details and work samples directly to our team.
                </p>
              </div>
              <button
                type="button"
                className="ph-modal-close"
                onClick={() => setShowApplyModal(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="ph-apply-success">
                <CheckCircle2 size={44} className="ph-success-icon" />
                <h4>Application Received!</h4>
                <p>Thank you, {applicantName}. Our leadership team will review your application and reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="ph-apply-form">
                <div className="ph-form-row">
                  <div className="ph-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                    />
                  </div>
                  <div className="ph-field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ph-form-row">
                  <div className="ph-field">
                    <label>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                    />
                  </div>
                  <div className="ph-field">
                    <label>Target Product</label>
                    <select
                      value={targetProduct}
                      onChange={(e) => setTargetProduct(e.target.value)}
                    >
                      <option value="zfit">ZFIT (Wearable & App)</option>
                      <option value="b2c">Zuccano Consumer (Hardware)</option>
                      <option value="b2b">Zuccano Business (Enterprise)</option>
                      <option value="general">Any / General Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="ph-form-row">
                  <div className="ph-field">
                    <label>Role Applied For</label>
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                    >
                      <option value="Frontend / React Developer">Frontend / React Developer</option>
                      <option value="Mobile App Developer (React Native / Flutter)">Mobile App Developer</option>
                      <option value="Hardware / Embedded Engineer">Hardware / Embedded Engineer</option>
                      <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                      <option value="Operations & Project Management">Operations & Project Management</option>
                      <option value="Internship (Engineering / Design)">Internship (Engineering / Design)</option>
                    </select>
                  </div>
                  <div className="ph-field">
                    <label>Portfolio / GitHub / LinkedIn</label>
                    <input
                      type="url"
                      placeholder="https://github.com/yourname"
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ph-field">
                  <label>Briefly tell us what you've built & why Zuccano:</label>
                  <textarea
                    rows={3}
                    placeholder="Share any projects you're proud of, tools you love, or links to your work..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <button type="submit" className="ph-modal-submit">
                  <span>Submit Application</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalHome;
