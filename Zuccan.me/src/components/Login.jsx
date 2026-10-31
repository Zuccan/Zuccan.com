import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  Crown,
  BarChart2,
  Shield,
  ShoppingBag,
  X,
  CheckCircle2,
  Building,
  Sparkles
} from 'lucide-react';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('employee.zfit@zuccano.me');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState('Employee');
  const [selectedProduct, setSelectedProduct] = useState('zfit'); // 'zfit' | 'consumer' | 'business' | 'all'

  // Interactive forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Quick preset loader
  const handleSelectPreset = (role, product, presetEmail) => {
    setSelectedRole(role);
    setSelectedProduct(product);
    setEmail(presetEmail);
    setPassword('••••••••••••');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Detect product from email or selectedProduct
    let product = selectedProduct;
    if (email.includes('consumer')) product = 'consumer';
    else if (email.includes('business')) product = 'business';
    else if (email.includes('zfit')) product = 'zfit';

    let role = selectedRole;
    if (email.includes('ceo')) role = 'CEO';
    else if (email.includes('cfo')) role = 'CFO';

    // Save user session
    localStorage.setItem(
      'zuccano_user',
      JSON.stringify({
        email,
        role,
        product,
        loginTime: new Date().toISOString(),
      })
    );
    navigate('/choose-product');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      setForgotEmail('');
    }, 2000);
  };

  return (
    <div className="login-canvas">
      {/* ── Background Subtle Watermark Shapes (Matching Reference) ── */}
      <div className="bg-watermark-shape" aria-hidden="true">
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M320 40L140 260H260L180 460L380 220H250L320 40Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="bg-watermark-circle" aria-hidden="true" />

      {/* ── Main Container ── */}
      <div className="login-wrapper">
        {/* ════════════ LEFT COLUMN ════════════ */}
        <div className="login-left-col">
          {/* Top Logo */}
          <div className="brand-logo">
            <span className="brand-name">zuccano</span>
            <span className="brand-dot">.</span>
          </div>

          {/* Hero Content */}
          <div className="hero-text-block">
            <h1 className="hero-heading">
              Welcome to<br />
              Zuccano<span className="hero-dot">.</span>
            </h1>

            <p className="hero-subtext">
              Same vision. Different roles.<br />
              One team.
            </p>

            {/* Role / Officer Filter Badges */}
            <div className="role-badges-row">
              <button
                type="button"
                className={`role-badge ${selectedRole === 'Employee' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRole('Employee');
                  if (email.includes('ceo')) setEmail(`emp.${selectedProduct}@zuccano.me`);
                }}
              >
                <Users size={15} className="role-icon" />
                <span>Employee</span>
              </button>

              <button
                type="button"
                className={`role-badge ${selectedRole === 'CEO' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRole('CEO');
                  setEmail(`ceo.${selectedProduct}@zuccano.me`);
                }}
              >
                <Crown size={15} className="role-icon" />
                <span>CEO</span>
              </button>

              <button
                type="button"
                className={`role-badge ${selectedRole === 'CFO' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRole('CFO');
                  setEmail(`cfo.${selectedProduct}@zuccano.me`);
                }}
              >
                <BarChart2 size={15} className="role-icon" />
                <span>CFO</span>
              </button>

              <button
                type="button"
                className={`role-badge ${selectedRole === 'Other Officers' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRole('Other Officers');
                  setEmail(`officer.${selectedProduct}@zuccano.me`);
                }}
              >
                <Shield size={15} className="role-icon" />
                <span>Other Officers</span>
              </button>
            </div>

            {/* Looking for a Job Card -> Navigates to Dedicated /apply page */}
            <div className="job-banner-card">
              <div className="job-icon-box">
                <ShoppingBag size={20} className="job-bag-icon" />
              </div>

              <div className="job-text-box">
                <span className="job-title">Looking for a Job?</span>
                <span className="job-desc">Explore career opportunities at Zuccano.</span>
              </div>

              <button
                type="button"
                className="job-link-btn"
                onClick={() => navigate('/apply')}
              >
                <span>View Open Positions</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Bottom Tagline */}
            <div className="bottom-tagline">
              <span className="tagline-dash" />
              <span className="tagline-text">BUILDING A SMARTER TOMORROW</span>
            </div>
          </div>
        </div>

        {/* ════════════ RIGHT COLUMN: LOGIN CARD ════════════ */}
        <div className="login-right-col">
          <div className="login-card">
            <div className="card-header">
              <h2 className="card-title">Employee Login</h2>
              <p className="card-subtitle">
                Access your workspace, manage your profile, and stay connected.
              </p>
            </div>

            {/* Fast 1-Click Role & Division Tester Pills */}
            <div className="demo-presets-row">
              <span className="presets-label">Quick Sign-in:</span>
              <button
                type="button"
                className={`preset-pill ${selectedRole === 'CEO' && selectedProduct === 'zfit' ? 'preset-active' : ''}`}
                onClick={() => handleSelectPreset('CEO', 'zfit', 'ceo.zfit@zuccano.me')}
              >
                👑 ZFIT CEO
              </button>
              <button
                type="button"
                className={`preset-pill ${selectedRole === 'Employee' && selectedProduct === 'zfit' ? 'preset-active' : ''}`}
                onClick={() => handleSelectPreset('Employee', 'zfit', 'emp.zfit@zuccano.me')}
              >
                💼 ZFIT Employee
              </button>
              <button
                type="button"
                className={`preset-pill ${selectedRole === 'CEO' && selectedProduct === 'consumer' ? 'preset-active' : ''}`}
                onClick={() => handleSelectPreset('CEO', 'consumer', 'ceo.consumer@zuccano.me')}
              >
                👑 Consumer CEO
              </button>
              <button
                type="button"
                className={`preset-pill ${selectedRole === 'Employee' && selectedProduct === 'business' ? 'preset-active' : ''}`}
                onClick={() => handleSelectPreset('Employee', 'business', 'emp.business@zuccano.me')}
              >
                💼 Business Dev
              </button>
            </div>

            <form onSubmit={handleSubmit} className="card-form" noValidate>
              {/* Email Address Field */}
              <div className="form-group">
                <label htmlFor="emailInput" className="form-label">
                  Email Address
                </label>
                <div className="input-container">
                  <Mail size={16} className="input-icon-left" />
                  <input
                    id="emailInput"
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="passInput" className="form-label">
                  Password
                </label>
                <div className="input-container">
                  <Lock size={16} className="input-icon-left" />
                  <input
                    id="passInput"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input form-input-pass"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="pass-visibility-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Division / Product Assignment Selector */}
              <div className="form-group">
                <label htmlFor="prodSelect" className="form-label">
                  Assigned Product Division
                </label>
                <select
                  id="prodSelect"
                  className="form-input form-select-input"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="zfit">ZFIT — Smart Mirror & Virtual Fitting</option>
                  <option value="consumer">Zuccano Consumer — Hardware & Wearables</option>
                  <option value="business">Zuccano Business — Enterprise & Retail IoT</option>
                  <option value="all">Global Executive Suite (All Products Access)</option>
                </select>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="form-options-row">
                <label className="remember-checkbox-label">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-pass-btn"
                  onClick={() => setShowForgotModal(true)}
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary Login Button */}
              <button type="submit" className="login-primary-btn">
                <span>Login as {selectedRole}</span>
                <ArrowRight size={16} className="btn-arrow" />
              </button>

              {/* Divider */}
              <div className="form-divider">
                <span className="divider-line" />
                <span className="divider-text">or</span>
                <span className="divider-line" />
              </div>

              {/* Secondary Apply for Job Button -> Navigates to Dedicated /apply page */}
              <button
                type="button"
                className="apply-job-btn"
                onClick={() => navigate('/apply')}
              >
                <ShoppingBag size={15} />
                <span>Apply for a Job</span>
                <ArrowRight size={14} className="apply-arrow" />
              </button>

              {/* Bottom Caption */}
              <p className="card-footer-caption">
                Join our team and be a part of something great.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* ════════════ FORGOT PASSWORD MODAL ════════════ */}
      {showForgotModal && (
        <div className="modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Reset Password</h3>
                <p className="modal-subtitle">Enter your company email to receive reset instructions.</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowForgotModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {forgotSent ? (
              <div className="modal-success-state">
                <CheckCircle2 size={44} className="success-icon" />
                <h4>Reset Link Sent!</h4>
                <p>Instructions have been sent to your corporate email if an account exists.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="modal-form">
                <div className="modal-form-group">
                  <label>Company Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your corporate email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="modal-submit-btn">
                  <span>Send Reset Link</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
