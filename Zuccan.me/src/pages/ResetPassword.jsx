import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { authService } from '../lib/authService';
import '../components/Login.css';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.updatePassword(password);
      setIsSuccess(true);
    } catch (err) {
      console.warn('Update password failed:', err);
      setError(err.message || 'Failed to update password. Reset token may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-canvas">
      <div className="bg-watermark-shape" aria-hidden="true">
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M320 40L140 260H260L180 460L380 220H250L320 40Z" fill="currentColor" />
        </svg>
      </div>
      <div className="bg-watermark-circle" aria-hidden="true" />

      <div className="login-wrapper" style={{ maxWidth: '480px', gridTemplateColumns: '1fr' }}>
        <div className="login-card" style={{ width: '100%', margin: '0 auto' }}>
          <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
            <span className="brand-name">zuccano</span>
            <span className="brand-dot">.</span>
          </div>

          {isSuccess ? (
            <div className="modal-success-state" style={{ padding: '1rem 0' }}>
              <CheckCircle2 size={48} className="success-icon" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.5rem 0' }}>
                Password Updated!
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Your Zuccano account credentials have been securely updated in Supabase.
              </p>
              <button
                type="button"
                className="login-primary-btn"
                onClick={() => navigate('/login')}
              >
                <span>Proceed to Sign In</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="card-header">
                <h2 className="card-title">Create New Password</h2>
                <p className="card-subtitle">
                  Set a secure, strong password for your Zuccano corporate account.
                </p>
              </div>

              {error && (
                <div className="modal-error-banner" style={{ marginBottom: '1rem' }}>
                  <span>⚠️ {error}</span>
                </div>
              )}

              <form onSubmit={handleUpdate} className="card-form" noValidate>
                <div className="form-group">
                  <label htmlFor="newPassInput" className="form-label">
                    New Password
                  </label>
                  <div className="input-container">
                    <Lock size={16} className="input-icon-left" />
                    <input
                      id="newPassInput"
                      type={showPassword ? 'text' : 'password'}
                      className="form-input form-input-pass"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="pass-visibility-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassInput" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-container">
                    <Lock size={16} className="input-icon-left" />
                    <input
                      id="confirmPassInput"
                      type={showPassword ? 'text' : 'password'}
                      className="form-input form-input-pass"
                      placeholder="Re-enter your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="login-primary-btn"
                  disabled={isLoading}
                  style={{ marginTop: '0.75rem' }}
                >
                  <span>{isLoading ? 'Updating in Supabase...' : 'Set New Password'}</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </button>

                <button
                  type="button"
                  className="apply-job-btn"
                  onClick={() => navigate('/login')}
                  style={{ marginTop: '0.5rem' }}
                >
                  <span>Cancel and Return</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
