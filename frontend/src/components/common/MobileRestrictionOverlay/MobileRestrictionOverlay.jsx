import React, { useState } from 'react';
import { Monitor, Copy, Check, ExternalLink, Mail, ArrowUpRight } from 'lucide-react';
import './MobileRestrictionOverlay.css';

export const MobileRestrictionOverlay = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleEmailMyself = () => {
    const subject = encodeURIComponent('Check out Zuccano on Desktop');
    const body = encodeURIComponent(`Here is the link to explore Zuccano on your desktop or laptop:\n\n${window.location.origin}\n\nTechnology for everyone. Built for business.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="mobile-restriction-overlay" aria-modal="true" role="dialog" aria-label="Desktop Access Notice">
      {/* ── Background Subtle Architectural Grid Lines ── */}
      <div className="mro-grid-lines" aria-hidden="true">
        <div className="mro-grid-line" />
        <div className="mro-grid-line" />
        <div className="mro-grid-line" />
        <div className="mro-grid-line" />
      </div>

      {/* ── Header ── */}
      <header className="mro-header">
        <div className="mro-brand">
          <span className="mro-brand-text">zuccano</span>
          <span className="mro-brand-dot">.</span>
        </div>
        <div className="mro-status-badge">
          <span className="mro-status-pulse" />
          <span>DESKTOP ONLY</span>
        </div>
      </header>

      {/* ── Main Content Body ── */}
      <main className="mro-main">
        {/* Animated Minimalist Device Graphic */}
        <div className="mro-device-graphic" aria-hidden="true">
          <div className="mro-laptop-frame">
            <div className="mro-screen-inner">
              <div className="mro-mockup-header">
                <span className="mro-dot-mockup" />
                <span className="mro-dot-mockup" />
                <span className="mro-dot-mockup" />
              </div>
              <div className="mro-mockup-content">
                <span className="mro-mockup-line-w" />
                <span className="mro-mockup-line-sub" />
                <div className="mro-mockup-cards">
                  <div className="mro-mockup-card active" />
                  <div className="mro-mockup-card" />
                </div>
              </div>
            </div>
            <div className="mro-laptop-base" />
          </div>
        </div>

        {/* Eyebrow Label */}
        <p className="mro-eyebrow">
          NOTICE &nbsp;/&nbsp; PHONE ACCESS RESTRICTED
        </p>

        {/* Editorial Heading matching Zuccano typography */}
        <h1 className="mro-heading">
          OPTIMIZED FOR<br />
          DESKTOP<span className="mro-heading-dot">.</span>
        </h1>

        {/* Supporting Explanation */}
        <p className="mro-desc">
          Zuccano is currently handcrafted and optimized exclusively for larger desktop and laptop workspaces.
        </p>
        <p className="mro-subdesc">
          Our full mobile experience is in active development. Please open <strong>zuccano.in</strong> on your computer for the complete experience.
        </p>

        {/* Action Buttons */}
        <div className="mro-actions">
          <button
            type="button"
            className="mro-btn-primary"
            onClick={handleCopyLink}
            aria-label="Copy website link to open on computer"
          >
            {copied ? (
              <>
                <Check size={17} className="mro-btn-icon" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy size={17} className="mro-btn-icon" />
                <span>Copy Link for Desktop</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="mro-btn-secondary"
            onClick={handleEmailMyself}
            aria-label="Email link to myself"
          >
            <Mail size={16} className="mro-btn-icon" />
            <span>Email Link to Myself</span>
          </button>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="mro-footer">
        <div className="mro-footer-left">
          <span className="mro-f-num">01</span>
          <span className="mro-f-line" />
          <span className="mro-f-label">ZUCCANO INC.</span>
        </div>
        <span className="mro-footer-right">EST. 2026</span>
      </footer>
    </div>
  );
};

export default MobileRestrictionOverlay;
