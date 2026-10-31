import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Server,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './EmployeeLogin.css';

const DEMO_ACCOUNTS = [
  {
    label: 'CEO / Founder',
    name: 'Pavan Reddy',
    email: 'pavan.reddy@zuccano.com',
    role: 'CEO - Zuccano & Zfit',
    department: 'Executive Leadership',
    avatar: '/team-ayaan.jpg',
  },
  {
    label: 'Head of Operations',
    name: 'Kumar MS',
    email: 'kumar.ms@zuccano.com',
    role: 'COO (Chief Operating Officer)',
    department: 'Operations & Strategy',
    avatar: '/team-sameer.jpg',
  },
  {
    label: 'Hardware & Design',
    name: 'Sara K.',
    email: 'sara.k@zuccano.com',
    role: 'Lead Product Designer',
    department: 'Hardware R&D',
    avatar: '/team-sara.jpg',
  },
];

export const EmployeeLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('pavan.reddy@zuccano.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('credentials'); // 'credentials' | 'sso'
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSelectDemo = (account) => {
    setEmail(account.email);
    setPassword('zuccano2026!secure');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid corporate email (e.g. name@zuccano.com)');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage('Please enter your employee password or security token');
      return;
    }

    setIsLoading(true);

    // Simulate secure corporate authentication handshake
    setTimeout(() => {
      const matched = DEMO_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email.toLowerCase()
      ) || {
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role: 'Core Member',
        department: 'Engineering & Product',
      };

      login(matched);
      setIsLoading(false);
      navigate('/dashboard');
    }, 900);
  };

  const handleSSOLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        name: 'Pavan Reddy',
        email: 'pavan.reddy@zuccano.com',
        role: 'CEO - Zuccano & Zfit',
        department: 'Executive Leadership',
        avatar: '/team-ayaan.jpg',
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="employee-login-root">
      {/* ── Background Subtle Architectural Grid Lines ── */}
      <div className="el-grid-lines" aria-hidden="true">
        <div className="el-grid-col" />
        <div className="el-grid-col" />
        <div className="el-grid-col" />
        <div className="el-grid-col" />
      </div>

      {/* ── Top Corporate Header Bar ── */}
      <header className="el-header">
        <div className="el-header-left">
          <Link to="/" className="el-brand" title="Zuccano Corporate">
            <span className="el-brand-name">zuccano</span>
            <span className="el-brand-dot">.</span>
          </Link>
          <div className="el-portal-badge">
            <span className="el-badge-pulse" />
            <span>ZUCCANO.ME // EMPLOYEES PORTAL</span>
          </div>
        </div>

        <div className="el-header-right">
          <div className="el-status-pill" title="Server Uptime 99.98%">
            <span className="el-status-indicator" />
            <span className="el-status-text">SYSTEMS OPERATIONAL</span>
            <span className="el-status-region">• BOM1 (MUMBAI)</span>
          </div>

          <Link to="/" className="el-back-link">
            <span>Public Site</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </header>

      {/* ── Main Login Layout Canvas ── */}
      <main className="el-main">
        <div className="el-content-grid">
          {/* Left Column: Form & Authentication Box */}
          <div className="el-form-panel">
            {/* Eyebrow & Brand Headings */}
            <div className="el-intro">
              <span className="el-eyebrow">
                <ShieldCheck size={14} className="el-eyebrow-icon" />
                SECURITY GATEWAY // INTERNAL DIRECTORY
              </span>
              <h1 className="el-title">
                INTERNAL<br />
                WORKSPACES<span className="el-title-dot">.</span>
              </h1>
              <p className="el-subtitle">
                Access company tools, hardware metrics, engineering consoles, and the Zuccano administrative network.
              </p>
            </div>

            {/* Auth Method Tabs */}
            <div className="el-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'credentials'}
                className={`el-tab-btn ${activeTab === 'credentials' ? 'active' : ''}`}
                onClick={() => setActiveTab('credentials')}
              >
                <KeyRound size={14} />
                <span>Corporate ID</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'sso'}
                className={`el-tab-btn ${activeTab === 'sso' ? 'active' : ''}`}
                onClick={() => setActiveTab('sso')}
              >
                <Server size={14} />
                <span>Single Sign-On (SSO)</span>
              </button>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="el-alert-error" role="alert">
                <AlertCircle size={15} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Tab 1: Direct Credentials */}
            {activeTab === 'credentials' ? (
              <form onSubmit={handleSubmit} className="el-form" noValidate>
                {/* Email or ID */}
                <div className="el-field-group">
                  <label htmlFor="el-email" className="el-label">
                    Corporate Email / Employee ID
                  </label>
                  <div className="el-input-wrap">
                    <Mail size={16} className="el-input-icon" />
                    <input
                      id="el-email"
                      type="email"
                      className="el-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="firstname.lastname@zuccano.com"
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Password / Access Key */}
                <div className="el-field-group">
                  <div className="el-label-row">
                    <label htmlFor="el-pass" className="el-label">
                      Access Passphrase / Hardware Key
                    </label>
                    <button
                      type="button"
                      className="el-forgot-link"
                      onClick={() => setShowForgotModal(true)}
                    >
                      Need help?
                    </button>
                  </div>
                  <div className="el-input-wrap">
                    <Lock size={16} className="el-input-icon" />
                    <input
                      id="el-pass"
                      type={showPassword ? 'text' : 'password'}
                      className="el-input el-input-pass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="el-pass-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="el-options-row">
                  <label className="el-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="el-checkbox"
                    />
                    <span>Remember this workstation for 30 days</span>
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="el-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="el-loading-state">
                      <span className="el-spinner" />
                      <span>Authenticating with Zuccano Auth...</span>
                    </span>
                  ) : (
                    <>
                      <span>Enter Workspace</span>
                      <ArrowRight size={16} className="el-btn-arrow" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Tab 2: SSO Alternative */
              <div className="el-sso-container">
                <p className="el-sso-desc">
                  Connect instantly via your pre-provisioned corporate directory identity:
                </p>

                <div className="el-sso-buttons">
                  <button
                    type="button"
                    className="el-sso-btn"
                    onClick={() => handleSSOLogin('Google')}
                    disabled={isLoading}
                  >
                    <svg className="el-sso-icon" viewBox="0 0 24 24" width="18" height="18">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google Workspace (@zuccano.com)</span>
                  </button>

                  <button
                    type="button"
                    className="el-sso-btn"
                    onClick={() => handleSSOLogin('Microsoft')}
                    disabled={isLoading}
                  >
                    <svg className="el-sso-icon" viewBox="0 0 24 24" width="18" height="18">
                      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                      <rect x="13" y="1" width="10" height="10" fill="#7fba00" />
                      <rect x="1" y="13" width="10" height="10" fill="#00a4ef" />
                      <rect x="13" y="13" width="10" height="10" fill="#ffb900" />
                    </svg>
                    <span>Microsoft Entra ID (Azure SSO)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Demo Credentials Bar */}
            <div className="el-demo-box">
              <div className="el-demo-title">
                <Sparkles size={13} className="el-demo-sparkle" />
                <span>QUICK TEST ACCOUNTS (CLICK TO AUTO-FILL):</span>
              </div>
              <div className="el-demo-chips">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    className="el-demo-chip"
                    onClick={() => handleSelectDemo(acc)}
                  >
                    <span className="el-demo-chip-name">{acc.name}</span>
                    <span className="el-demo-chip-role">({acc.label})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Corporate Systems & Architectural Telemetry */}
          <div className="el-info-panel">
            <div className="el-info-card">
              <div className="el-info-card-header">
                <span className="el-info-title">NODE TELEMETRY</span>
                <span className="el-info-chip">LIVE</span>
              </div>

              <div className="el-metrics-list">
                <div className="el-metric-item">
                  <span className="el-m-label">Host Environment</span>
                  <span className="el-m-val el-m-mono">zuccano.me (Production)</span>
                </div>
                <div className="el-metric-item">
                  <span className="el-m-label">Security Protocol</span>
                  <span className="el-m-val">TLS 1.3 / AES-256 GCM</span>
                </div>
                <div className="el-metric-item">
                  <span className="el-m-label">Hardware Clusters</span>
                  <span className="el-m-val">3 Active (ZFIT / B2C / Core)</span>
                </div>
                <div className="el-metric-item">
                  <span className="el-m-label">Auth Gateway</span>
                  <span className="el-m-val">Zuccano Vault v2.4</span>
                </div>
              </div>

              <div className="el-security-notice">
                <div className="el-sec-badge">
                  <CheckCircle2 size={13} />
                  <span>RESTRICTED ACCESS POLICY</span>
                </div>
                <p className="el-sec-text">
                  This system is strictly reserved for authorized employees and contractors of Zuccano Inc. All sessions are cryptographically signed and monitored.
                </p>
              </div>

              <div className="el-sub-links">
                <a href="#helpdesk" className="el-sub-link">
                  <span>IT Helpdesk</span>
                  <ChevronRight size={13} />
                </a>
                <a href="#vpn" className="el-sub-link">
                  <span>Hardware VPN Setup</span>
                  <ChevronRight size={13} />
                </a>
                <a href="#guidelines" className="el-sub-link">
                  <span>SecOps Handbook</span>
                  <ChevronRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="el-footer">
        <div className="el-footer-left">
          <span className="el-f-num">01</span>
          <span className="el-f-line" />
          <span className="el-f-text">ZUCCANO INTERNAL // ALL RIGHTS RESERVED</span>
        </div>
        <div className="el-footer-right">
          <span>HOSTED FOR EMPLOYEES AT <strong>ZUCCANO.ME</strong></span>
          <span className="el-f-dot">•</span>
          <span>EST. 2026</span>
        </div>
      </footer>

      {/* Help Modal */}
      {showForgotModal && (
        <div className="el-modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="el-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="el-modal-header">
              <h3>Employee Access Support</h3>
              <button
                type="button"
                className="el-modal-close"
                onClick={() => setShowForgotModal(false)}
              >
                ✕
              </button>
            </div>
            <p className="el-modal-desc">
              If you have lost access to your Zuccano credentials or hardware security key, contact the Internal IT & Security desk:
            </p>
            <div className="el-modal-contacts">
              <div className="el-contact-item">
                <strong>Internal Helpdesk:</strong> it-support@zuccano.com
              </div>
              <div className="el-contact-item">
                <strong>Emergency Admin:</strong> security@zuccano.com
              </div>
              <div className="el-contact-item">
                <strong>Slack Channel:</strong> #it-helpdesk-internal
              </div>
            </div>
            <button
              type="button"
              className="el-modal-btn"
              onClick={() => setShowForgotModal(false)}
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLogin;
