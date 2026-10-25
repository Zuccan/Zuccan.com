import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ProductsShowcase } from '../../components/products/ProductsShowcase/ProductsShowcase';
import './Customers.css';

export const Customers = () => {
  const { setMobileMenuOpen } = useNavigation();
  const location = useLocation();

  // If user navigates directly to /products or has #products hash, scroll smoothly to products section
  useEffect(() => {
    if (location.pathname === '/products' || location.hash === '#products') {
      const el = document.getElementById('products-section');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.pathname, location.hash]);

  const scrollToProducts = (e) => {
    if (e) e.preventDefault();
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHero = (e) => {
    if (e) e.preventDefault();
    document.getElementById('b2c-hero-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="b2c-page">
      {/* ── Section 1: B2C Hero Section ── */}
      <section id="b2c-hero-section" className="b2c-hero">

        {/* 6 Architectural Vertical Column Grid Lines */}
        <div className="b2c-grid-lines" aria-hidden="true">
          <div className="b2c-grid-col col-1" />
          <div className="b2c-grid-col col-2" />
          <div className="b2c-grid-col col-3" />
          <div className="b2c-grid-col col-4" />
          <div className="b2c-grid-col col-5" />
          <div className="b2c-grid-col col-6" />
        </div>

        {/* ── Top Grid-Aligned Header Bar ── */}
        <header className="b2c-header">
          {/* Column 1: zuccano. */}
          <div className="b2c-col-brand">
            <a href="/customers" onClick={scrollToHero} className="b2c-brand">
              <span className="b2c-brand-text">zuccano</span>
              <span className="b2c-brand-dot">.</span>
            </a>
          </div>

          {/* Column 2: HOME */}
          <div className="b2c-col-tab">
            <div className="b2c-nav-item active" onClick={scrollToHero} style={{ cursor: 'pointer' }}>
              <span className="b2c-nav-text">HOME</span>
              <span className="b2c-nav-bar" />
            </div>
          </div>

          {/* Column 3: PRODUCTS */}
          <div className="b2c-col-tab">
            <a href="#products" onClick={scrollToProducts} className="b2c-nav-item" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="b2c-nav-text">PRODUCTS</span>
            </a>
          </div>

          {/* Column 4: SUPPORT */}
          <div className="b2c-col-tab">
            <a href="/#support" className="b2c-nav-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="b2c-nav-text">SUPPORT</span>
            </a>
          </div>

          {/* Column 5: spacer */}
          <div className="b2c-col-spacer" />

          {/* Column 6: Circular Menu Button */}
          <div className="b2c-col-menu">
            <button
              type="button"
              className="b2c-circle-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation"
            >
              <span className="b2c-circle-line" />
              <span className="b2c-circle-line" />
              <span className="b2c-circle-line" />
            </button>
          </div>
        </header>

        {/* ── Main Hero Area ── */}
        <main className="b2c-main">
          {/* Eyebrow */}
          <p className="b2c-eyebrow">
            B2C &nbsp;/&nbsp; CONSUMER PRODUCTS
          </p>

          {/* Headline (2 Lines, Single Line Each on Desktop) */}
          <h1 className="b2c-headline">
            <span className="b2c-hl-line-1">USEFUL THINGS.</span>
            <span className="b2c-hl-line-2">
              FOR A BETTER <span className="b2c-everyday-wrap">EVERYDAY<span className="b2c-hl-dot" /></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="b2c-subtitle">
            Discover thoughtfully designed products<br />
            that make your daily life simpler, smarter and a little more fun.
          </p>

          {/* CTA Button */}
          <div className="b2c-cta-wrap">
            <a href="#products" onClick={scrollToProducts} className="b2c-btn">
              <span>EXPLORE PRODUCTS</span>
              <ArrowUpRight size={18} className="b2c-arrow" />
            </a>
          </div>
        </main>

        {/* ── Bottom Index Bar ── */}
        <footer className="b2c-footer">
          {/* Left: 01 ─── B2C LANDING */}
          <div className="b2c-footer-left">
            <span className="b2c-f-num">01</span>
            <span className="b2c-f-line" />
            <span className="b2c-f-label">B2C LANDING</span>
          </div>

          {/* Right: 01 EVERYDAY UTILITY / 02 THOUGHTFUL DESIGN / 03 BUILT FOR YOU */}
          <div className="b2c-footer-right">
            <div className="b2c-pillar-item">
              <span className="b2c-p-num">01</span>
              <span className="b2c-p-label">EVERYDAY UTILITY</span>
            </div>
            <div className="b2c-pillar-item">
              <span className="b2c-p-num">02</span>
              <span className="b2c-p-label">THOUGHTFUL DESIGN</span>
            </div>
            <div className="b2c-pillar-item">
              <span className="b2c-p-num">03</span>
              <span className="b2c-p-label">BUILT FOR YOU</span>
            </div>
          </div>
        </footer>

      </section>

      {/* ── Section 2: Products Showcase Section (Master Reference Image) ── */}
      <section id="products-section" className="b2c-products-section">
        <ProductsShowcase />
      </section>
    </div>
  );
};

export default Customers;
