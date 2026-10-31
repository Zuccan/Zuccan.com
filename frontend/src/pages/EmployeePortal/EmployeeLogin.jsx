import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './EmployeeLogin.css';

const DEMO_ACCOUNTS = [
  {
    name: 'Pavan Reddy',
    role: 'CEO - Zuccano & Zfit',
    email: 'pavan.reddy@zuccano.com',
    avatar: '/team-ayaan.jpg',
  },
  {
    name: 'Kumar MS',
    role: 'COO (Chief Operating Officer)',
    email: 'kumar.ms@zuccano.com',
    avatar: '/team-sameer.jpg',
  },
  {
    name: 'Sara K.',
    role: 'Lead Product Designer',
    email: 'sara.k@zuccano.com',
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

  const handleSelectDemo = (account) => {
    setEmail(account.email);
    setPassword('zuccano2026');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid company email address.');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const matched = DEMO_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email.toLowerCase()
      ) || {
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role: 'Team Member',
        avatar: '/team-ayaan.jpg',
      };

      login(matched);
      setIsLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="employee-login-root">
      {/* ── Background Grid ── */}
      <div className="el-grid-lines" aria-hidden="true">
        <div className="el-grid-col" />
        <div className="el-grid-col" />
        <div className="el-grid-col" />
        <div className="el-grid-col" />
      </div>

      {/* ── Header ── */}
      <header className="el-header">
        <div className="el-header-left">
          <Link to="/" className="el-brand" title="Zuccano">
            <span className="el-brand-name">zuccano</span>
            <span className="el-brand-dot">.</span>
          </Link>
          <span className="el-portal-tag">Employees Portal</span>
        </div>

        <Link to="/" className="el-back-link">
          <ArrowLeft size={14} />
          <span>Back to Website</span>
        </Link>
      </header>

      {/* ── Center Login Card ── */}
      <main className="el-main">
        <div className="el-card">
          <div className="el-card-header">
            <h1 className="el-title">
              Sign In<span className="el-title-dot">.</span>
            </h1>
            <p className="el-subtitle">
              Enter your Zuccano credentials to access the employee dashboard.
            </p>
          </div>

          {errorMessage && (
            <div className="el-alert-error" role="alert">
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="el-form" noValidate>
            <div className="el-field-group">
              <label htmlFor="el-email" className="el-label">
                Company Email
              </label>
              <div className="el-input-wrap">
                <Mail size={16} className="el-input-icon" />
                <input
                  id="el-email"
                  type="email"
                  className="el-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@zuccano.com"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="el-field-group">
              <label htmlFor="el-pass" className="el-label">
                Password
              </label>
              <div className="el-input-wrap">
                <Lock size={16} className="el-input-icon" />
                <input
                  id="el-pass"
                  type={showPassword ? 'text' : 'password'}
                  className="el-input el-input-pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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

            <div className="el-options-row">
              <label className="el-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="el-checkbox"
                />
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="el-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} className="el-btn-arrow" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Test Logins */}
          <div className="el-demo-section">
            <span className="el-demo-label">Quick Sign In:</span>
            <div className="el-demo-buttons">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  className="el-demo-btn"
                  onClick={() => handleSelectDemo(acc)}
                >
                  <strong>{acc.name}</strong>
                  <span>({acc.role.split(' ')[0]})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── Simple Footer ── */}
      <footer className="el-footer">
        <span>ZUCCANO INC. • EMPLOYEES PORTAL</span>
        <span>zuccano.me</span>
      </footer>
    </div>
  );
};

export default EmployeeLogin;
