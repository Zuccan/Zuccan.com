import React from 'react';
import { Link } from 'react-router-dom';
import zuccanoLogo from '../../../assets/Zucaano logo.png';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="zuccano-minimal-footer">
      <div className="container">
        <div className="footer-main-row">
          {/* Brand Info */}
          <div className="footer-brand-box">
            <Link to="/" className="footer-brand-logo">
              <img src={zuccanoLogo} alt="Zuccano" className="footer-logo-img" />
              <span className="footer-logo-name">Zuccano</span>
            </Link>
            <p className="footer-motto">
              Technology for everyone. Built for business<span className="dot-red">.</span>
            </p>
          </div>

          {/* Links Columns */}
          <div className="footer-nav-columns">
            <div className="footer-col">
              <span className="footer-col-header">Ecosystem</span>
              <ul className="footer-links-list">
                <li><Link to="/">Corporate Group</Link></li>
                <li><Link to="/business">For Business</Link></li>
                <li><Link to="/customers">For Everyone</Link></li>
                <li><a href="#ecosystem">Solutions</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-col-header">Company</span>
              <ul className="footer-links-list">
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-col-header">Direct Portals</span>
              <div className="footer-portal-pills">
                <Link to="/business" className="footer-pill-btn dark">
                  For Business ↗
                </Link>
                <Link to="/customers" className="footer-pill-btn light">
                  For Everyone ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Zuccano Inc. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy</a>
            <span>•</span>
            <a href="#terms">Terms</a>
            <span>•</span>
            <a href="#security">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
