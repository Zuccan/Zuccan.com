import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';
import './ProductsShowcase.css';

// ── 4 Full Product Definitions ──
const productsData = [
  {
    id: 'focusos',
    index: '01',
    name: 'FocusOS',
    tagline: 'Distraction-free productivity for a better you.',
    description: 'Distraction-free productivity\nfor a better you.',
    iconType: 'focusos',
    ctaText: 'Explore',
    features: [
      {
        id: 'focus',
        title: 'Focus',
        desc: 'Block distractions effortlessly.',
        icon: 'target'
      },
      {
        id: 'organise',
        title: 'Organise',
        desc: 'Keep everything in one place.',
        icon: 'checkbox'
      },
      {
        id: 'track',
        title: 'Track',
        desc: 'See real progress.',
        icon: 'barchart'
      },
      {
        id: 'stay-consistent',
        title: 'Stay consistent',
        desc: 'Small steps. Big results.',
        icon: 'sparkle'
      }
    ]
  },
  {
    id: 'studybuddy',
    index: '02',
    name: 'StudyBuddy',
    tagline: 'Smarter learning. Everyday.',
    description: 'Smarter learning.\nEveryday.',
    iconType: 'studybuddy',
    ctaText: 'Explore',
    features: [
      {
        id: 'notes',
        title: 'Smart Notes',
        desc: 'AI-assisted summaries & highlights.',
        icon: 'checkbox'
      },
      {
        id: 'cards',
        title: 'Spaced Recall',
        desc: 'Retain key ideas with active recall.',
        icon: 'target'
      },
      {
        id: 'sprints',
        title: 'Focus Sprints',
        desc: 'Interval-based deep study sessions.',
        icon: 'barchart'
      },
      {
        id: 'progress',
        title: 'Milestones',
        desc: 'Track mastery across subjects.',
        icon: 'sparkle'
      }
    ]
  },
  {
    id: 'timeflow',
    index: '03',
    name: 'TimeFlow',
    tagline: 'Master every hour with intelligent scheduling.',
    description: 'Master every hour\nwith intelligent scheduling.',
    iconType: 'timeflow',
    ctaText: 'Explore',
    features: [
      {
        id: 'sync',
        title: 'Calendar Sync',
        desc: 'Unified view across all platforms.',
        icon: 'checkbox'
      },
      {
        id: 'buffer',
        title: 'Smart Buffers',
        desc: 'Automatic breathing room between tasks.',
        icon: 'target'
      },
      {
        id: 'analytics',
        title: 'Energy Insights',
        desc: 'Schedule demanding work at peak hours.',
        icon: 'barchart'
      },
      {
        id: 'balance',
        title: 'Life Balance',
        desc: 'Gentle nudges to rest and disconnect.',
        icon: 'sparkle'
      }
    ]
  },
  {
    id: 'mediahub',
    index: '04',
    name: 'MediaHub',
    tagline: 'Your personal media cloud. Access anytime, anywhere.',
    description: 'Your personal media cloud.\nAccess anytime, anywhere.',
    iconType: 'mediahub',
    ctaText: 'Explore',
    features: [
      {
        id: 'vault',
        title: 'Private Cloud',
        desc: 'Encrypted storage for high-res assets.',
        icon: 'target'
      },
      {
        id: 'streaming',
        title: 'Lossless Stream',
        desc: 'Instant playback across all devices.',
        icon: 'checkbox'
      },
      {
        id: 'curate',
        title: 'Smart Curation',
        desc: 'Organized automatically by collection.',
        icon: 'barchart'
      },
      {
        id: 'share',
        title: 'Time-locked Links',
        desc: 'Safe sharing with expiration controls.',
        icon: 'sparkle'
      }
    ]
  }
];

// ── SVG Icon Renderers ──
const FeatureIcon = ({ type }) => {
  if (type === 'target') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="#111111" />
      </svg>
    );
  }
  if (type === 'checkbox') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <polyline points="9 11 12 14 20 6" />
      </svg>
    );
  }
  if (type === 'barchart') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }
  // sparkle / star
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
    </svg>
  );
};

// ── App Icon Renderers ──
const ProductAppIcon = ({ type, isNeighbor = false }) => {
  const size = isNeighbor ? 76 : 108;

  if (type === 'focusos') {
    return (
      <div className={`p-app-icon p-icon-focusos ${isNeighbor ? 'neighbor-icon' : ''}`}>
        <svg width={size} height={size} viewBox="0 0 108 108" fill="none">
          <rect width="108" height="108" rx="26" fill="#141416" />
          {/* Target concentric symbol matching reference */}
          <circle cx="54" cy="54" r="23" stroke="#FFFFFF" strokeWidth="4.2" />
          <circle cx="54" cy="54" r="11" stroke="#FFFFFF" strokeWidth="4.2" />
          <circle cx="54" cy="54" r="3.2" fill="#FFFFFF" />
          {/* Subtle bottom marker tick */}
          <line x1="54" y1="67" x2="54" y2="70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (type === 'mediahub') {
    return (
      <div className={`p-app-icon p-icon-white ${isNeighbor ? 'neighbor-icon' : ''}`}>
        <svg width={size} height={size} viewBox="0 0 76 76" fill="none">
          <rect width="76" height="76" rx="20" fill="#FFFFFF" />
          {/* Stylized Modern M Glyph */}
          <path
            d="M24 53V27L38 41L52 27V53"
            stroke="#222224"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (type === 'studybuddy') {
    return (
      <div className={`p-app-icon p-icon-white ${isNeighbor ? 'neighbor-icon' : ''}`}>
        <svg width={size} height={size} viewBox="0 0 76 76" fill="none">
          <rect width="76" height="76" rx="20" fill="#FFFFFF" />
          {/* Open Book Glyph matching reference */}
          <path
            d="M24 29C28 27.5 34 27.5 38 30.5V52C34 49 28 49 24 50.5V29Z"
            stroke="#222224"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M52 29C48 27.5 42 27.5 38 30.5V52C42 49 48 49 52 50.5V29Z"
            stroke="#222224"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // timeflow / fallback
  return (
    <div className={`p-app-icon p-icon-white ${isNeighbor ? 'neighbor-icon' : ''}`}>
      <svg width={size} height={size} viewBox="0 0 76 76" fill="none">
        <rect width="76" height="76" rx="20" fill="#FFFFFF" />
        <circle cx="38" cy="38" r="16" stroke="#222224" strokeWidth="4" />
        <polyline points="38 27 38 38 46 38" stroke="#222224" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const ProductsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setMobileMenuOpen } = useNavigation();

  const total = productsData.length;
  const currentProduct = productsData[activeIndex];

  // Left neighbor is the previous product in circular loop
  const leftNeighborIndex = (activeIndex - 1 + total) % total;
  const leftProduct = productsData[leftNeighborIndex];

  // Right neighbor is the next product in circular loop
  const rightNeighborIndex = (activeIndex + 1) % total;
  const rightProduct = productsData[rightNeighborIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="ps-root">
      {/* ── Background Subtle Architectural Grid Lines ── */}
      <div className="ps-grid-lines" aria-hidden="true">
        <div className="ps-grid-line line-1" />
        <div className="ps-grid-line line-2" />
        <div className="ps-grid-line line-3" />
        <div className="ps-grid-line line-4" />
        <div className="ps-grid-line line-5" />
      </div>

      {/* ── Top Header Bar ── */}
      <header className="ps-header">
        {/* Left: Brand Wordmark with signature red dot */}
        <div className="ps-brand-wrap">
          <a href="/customers" className="ps-brand-link">
            <span className="ps-brand-text">zuccano</span>
            <span className="ps-brand-dot">.</span>
          </a>
        </div>

        {/* Center: Navigation Links with active underline on Products */}
        <nav className="ps-nav-links" aria-label="Main Navigation">
          <a href="/products" className="ps-nav-link active">
            <span>Products</span>
            <span className="ps-nav-underline" />
          </a>
          <a href="/#about" className="ps-nav-link">
            <span>About</span>
          </a>
          <a href="/#support" className="ps-nav-link">
            <span>Support</span>
          </a>
        </nav>

        {/* Right: Circular Black Hamburger Menu Button */}
        <div className="ps-menu-wrap">
          <button
            type="button"
            className="ps-menu-circle-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Drawer"
          >
            <span className="ps-menu-bar" />
            <span className="ps-menu-bar" />
            <span className="ps-menu-bar" />
          </button>
        </div>
      </header>

      {/* ── Left Vertical Index Rail ── */}
      <aside className="ps-index-rail" aria-label="Section Index">
        <div className="ps-rail-top">
          <span className="ps-rail-major">01</span>
          <span className="ps-rail-divider" />
          <span className="ps-rail-minor">01</span>
        </div>

        <div className="ps-rail-bottom">
          <span className="ps-rail-tag">IDEAS</span>
          <span className="ps-rail-tag">PRODUCTS</span>
          <span className="ps-rail-tag">PEOPLE</span>
        </div>
      </aside>

      {/* ── Main Section Container ── */}
      <main className="ps-main-content">
        {/* ── Section Introduction Heading & Supporting Description ── */}
        <section className="ps-intro-area">
          <div className="ps-intro-left">
            <p className="ps-intro-eyebrow">OUR PRODUCTS</p>
            <h1 className="ps-intro-heading">
              Products<span className="ps-heading-dot">.</span>
            </h1>
          </div>

          <div className="ps-intro-right">
            <p className="ps-intro-copy">
              Thoughtfully designed products<br />
              that make your daily life simpler,<br />
              smarter and a little more fun.
            </p>
          </div>
        </section>

        {/* ── Product Carousel Showcase Area ── */}
        <section className="ps-carousel-stage">
          {/* Left Neighboring Card (Partially Visible, 3D Tilted) */}
          <div
            className="ps-neighbor-card ps-neighbor-left"
            onClick={handlePrev}
            role="button"
            tabIndex={0}
            aria-label={`Switch to previous product: ${leftProduct.name}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePrev(); }}
          >
            <div className="ps-neighbor-inner">
              <ProductAppIcon type={leftProduct.iconType} isNeighbor />
              <h3 className="ps-neighbor-title">
                {leftProduct.name}<span className="ps-accent-dot">.</span>
              </h3>
              <p className="ps-neighbor-desc">
                {leftProduct.description}
              </p>
              <div className="ps-neighbor-arrow-wrap">
                <ArrowRight size={18} className="ps-neighbor-arrow" />
              </div>
            </div>
          </div>

          {/* Central Dominant Product Card (FocusOS) */}
          <article className="ps-active-card">
            {/* Small Top-Left Index */}
            <span className="ps-card-index">{currentProduct.index}</span>

            <div className="ps-card-columns">
              {/* Left Column: Product Identity */}
              <div className="ps-col-identity">
                <div className="ps-identity-top">
                  <ProductAppIcon type={currentProduct.iconType} />
                  
                  <h2 className="ps-product-title">
                    {currentProduct.name}<span className="ps-accent-dot">.</span>
                  </h2>

                  <p className="ps-product-desc">
                    {currentProduct.description}
                  </p>
                </div>

                <div className="ps-identity-cta">
                  <a href={`#${currentProduct.id}`} className="ps-cta-btn">
                    <span>{currentProduct.ctaText}</span>
                    <ArrowUpRight size={16} className="ps-cta-arrow" />
                  </a>
                </div>
              </div>

              {/* Thin Vertical Column Divider */}
              <div className="ps-col-divider" />

              {/* Right Column: 4 Feature Rows */}
              <div className="ps-col-features">
                {currentProduct.features.map((feat) => (
                  <div key={feat.id} className="ps-feature-row">
                    <div className="ps-feature-icon-box">
                      <FeatureIcon type={feat.icon} />
                    </div>
                    <div className="ps-feature-text">
                      <h4 className="ps-feature-title">{feat.title}</h4>
                      <p className="ps-feature-desc">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Right Neighboring Card (Partially Visible, 3D Tilted) */}
          <div
            className="ps-neighbor-card ps-neighbor-right"
            onClick={handleNext}
            role="button"
            tabIndex={0}
            aria-label={`Switch to next product: ${rightProduct.name}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNext(); }}
          >
            <div className="ps-neighbor-inner">
              <ProductAppIcon type={rightProduct.iconType} isNeighbor />
              <h3 className="ps-neighbor-title">
                {rightProduct.name}<span className="ps-accent-dot">.</span>
              </h3>
              <p className="ps-neighbor-desc">
                {rightProduct.description}
              </p>
              <div className="ps-neighbor-arrow-wrap">
                <ArrowRight size={18} className="ps-neighbor-arrow" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom Controls: Horizontal Pagination & Arrows ── */}
        <section className="ps-bottom-bar">
          {/* 4 Pagination Indicators Centered Below Card */}
          <div className="ps-pagination" role="tablist" aria-label="Product Showcase Pagination">
            {productsData.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                className={`ps-page-pill ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to product ${idx + 1}: ${prod.name}`}
                aria-selected={idx === activeIndex}
              />
            ))}
          </div>

          {/* Previous & Next Minimal Arrow Controls */}
          <div className="ps-controls-arrows">
            <button
              type="button"
              className="ps-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous Product"
            >
              <ArrowLeft size={20} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="ps-arrow-btn"
              onClick={handleNext}
              aria-label="Next Product"
            >
              <ArrowRight size={20} strokeWidth={1.8} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductsShowcase;
