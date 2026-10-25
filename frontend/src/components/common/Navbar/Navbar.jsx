import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import zuccanoLogo from '../../../assets/Zucaano logo.png';
import './Navbar.css';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll when menu is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`zuccano-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo & Brand Name */}
          <Link to="/" className="header-brand" aria-label="Zuccano Home">
            <img
              src={zuccanoLogo}
              alt="Zuccano Emblem"
              className="header-logo-img"
            />
            <span className="header-brand-name">Zuccano</span>
          </Link>

          {/* Minimalist Circular Black Menu Button */}
          <button
            className={`header-menu-btn ${menuOpen ? 'menu-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            <div className="hamburger-lines">
              <span className="line line-top" />
              <span className="line line-mid" />
              <span className="line line-bot" />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Minimalist Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="menu-overlay-header">
              <Link to="/" className="header-brand" onClick={() => setMenuOpen(false)}>
                <img src={zuccanoLogo} alt="Zuccano" className="header-logo-img" />
                <span className="header-brand-name">Zuccano</span>
              </Link>
              <button
                className="header-menu-btn close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} color="#ffffff" />
              </button>
            </div>

            <div className="menu-overlay-content">
              <nav className="menu-nav-links">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link to="/" className="menu-nav-item" onClick={() => setMenuOpen(false)}>
                    <span>Group Overview</span>
                    <ArrowUpRight size={24} className="menu-nav-arrow" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link to="/business" className="menu-nav-item" onClick={() => setMenuOpen(false)}>
                    <span>For Business</span>
                    <ArrowUpRight size={24} className="menu-nav-arrow" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link to="/customers" className="menu-nav-item" onClick={() => setMenuOpen(false)}>
                    <span>For Everyone</span>
                    <ArrowUpRight size={24} className="menu-nav-arrow" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <a href="/#ecosystem" className="menu-nav-item" onClick={() => setMenuOpen(false)}>
                    <span>Ecosystem Solutions</span>
                    <ArrowUpRight size={24} className="menu-nav-arrow" />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a href="/#about" className="menu-nav-item" onClick={() => setMenuOpen(false)}>
                    <span>About Company</span>
                    <ArrowUpRight size={24} className="menu-nav-arrow" />
                  </a>
                </motion.div>
              </nav>

              <div className="menu-overlay-footer">
                <div className="menu-footer-contact">
                  <span className="footer-label">Corporate Office</span>
                  <p>Zuccano Group Inc.</p>
                  <p>contact@zuccano.com</p>
                </div>
                <div className="menu-footer-portals">
                  <span className="footer-label">Direct Portals</span>
                  <div className="portal-buttons-wrap">
                    <Link to="/business" className="mini-pill-btn dark" onClick={() => setMenuOpen(false)}>
                      For Business ↗
                    </Link>
                    <Link to="/customers" className="mini-pill-btn light" onClick={() => setMenuOpen(false)}>
                      For Everyone ↗
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
