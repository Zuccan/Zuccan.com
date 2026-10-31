import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  ArrowRight,
  Activity,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import './ChooseProduct.css';

const PRODUCT_DATA = {
  zfit: {
    id: 'zfit',
    title: 'ZFIT',
    tagline: 'Smart Mirror & AI Virtual Fitting Ecosystem',
    description:
      'Manage real-time 3D clothing simulation, optical tracking algorithms, Smart Mirror OS OTA updates, and user styling telemetry.',
    activeSprint: 'Sprint 24 — Optical Tracking v2.6',
    teamOnline: 9,
    modules: ['Virtual Fitting AI', 'Smart Mirror OS', '3D Asset Pipeline', 'Styling Analytics'],
  },
  consumer: {
    id: 'consumer',
    title: 'Zuccano Consumer',
    tagline: 'Direct-to-Consumer Hardware & Smart Wearables',
    description:
      'Monitor companion mobile apps, firmware release cycles, smart wearable sensors, D2C customer fulfillment, and warranty lifecycle.',
    activeSprint: 'Sprint 18 — Smart Ring OS 1.9',
    teamOnline: 14,
    modules: ['Wearables Firmware', 'Mobile Companion App', 'D2C Supply Chain', 'Hardware Quality QA'],
  },
  business: {
    id: 'business',
    title: 'Zuccano Business',
    tagline: 'Enterprise IoT & Retail Automation Infrastructure',
    description:
      'Orchestrate multi-tenant B2B portals, in-store sensor nodes, retail client integrations, enterprise IAM, and cloud SLA performance.',
    activeSprint: 'Sprint 31 — Enterprise Gateway v3.2',
    teamOnline: 11,
    modules: ['B2B Client Portals', 'Store IoT Gateway', 'API Gateway & IAM', 'Fleet Health & SLAs'],
  },
};

export const ChooseProduct = () => {
  const navigate = useNavigate();
  // By default, let's keep all cards cleanly collapsed like the reference image, or expand upon click
  const [expandedProduct, setExpandedProduct] = useState(null);

  const storedUser = localStorage.getItem('zuccano_user');
  const user = storedUser
    ? JSON.parse(storedUser)
    : { role: 'Employee', email: 'employee@zuccano.me' };

  const handleCardClick = (productId) => {
    setExpandedProduct((prev) => (prev === productId ? null : productId));
  };

  const handleOpenWorkspace = (productId, e) => {
    e.stopPropagation();
    localStorage.setItem('zuccano_active_product', productId);
    alert(`Launching ${PRODUCT_DATA[productId]?.title} Employee Workspace!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('zuccano_user');
    navigate('/login');
  };

  return (
    <div className="choose-product-page">
      {/* ── Minimalist Top Bar ── */}
      <header className="choose-top-bar">
        <div className="top-bar-inner">
          <div
            className="brand-badge-col"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <span className="brand-name">zuccano</span>
            <span className="brand-dot">.</span>
            <span className="brand-subtag">Internal Portal</span>
          </div>

          <div className="user-profile-tray">
            <div className="user-info-pill">
              <span className="user-role-badge">{user.role || 'Employee'}</span>
              <span className="user-email-text">{user.email || 'employee@zuccano.me'}</span>
            </div>
            <button
              type="button"
              className="logout-action-btn"
              onClick={handleLogout}
              title="Sign out"
            >
              <LogOut size={14} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Container ── */}
      <main className="choose-product-container">
        {/* Title & Overline (Exact 10000% Match to Reference) */}
        <div className="choose-header-block">
          <span className="overline-text">OUR PRODUCTS</span>
          <h1 className="main-heading">
            Choose your product<span className="heading-dot">.</span>
          </h1>
        </div>

        {/* ── Product Cards Grid ── */}
        <div className="products-grid-row">
          
          {/* ════ CARD 1: ZFIT. ════ */}
          <div
            id="card-zfit"
            className={`product-card ${
              expandedProduct === 'zfit' ? 'card-expanded card-selected' : ''
            }`}
            onClick={() => handleCardClick('zfit')}
          >
            {/* Top Indicator */}
            <div className="card-top-pill">
              {expandedProduct === 'zfit' ? (
                <span className="collapse-tag">
                  <span>Collapse</span>
                  <ChevronUp size={13} />
                </span>
              ) : (
                <span className="expand-tag">Click to expand</span>
              )}
            </div>

            {/* Icon Tile with Red Halo Glow */}
            <div className="icon-tile zfit-icon-tile">
              <svg
                className="zfit-mark-svg"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="20" r="2.8" fill="#ffffff" />
                <path
                  d="M17 17.5C15.5 19 15.5 21 17 22.5M31 17.5C32.5 19 32.5 21 31 22.5"
                  stroke="#ffffff"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <path
                  d="M16 35C16 30 19 28 21.5 28C24 28 24 31 24 31C24 31 24 28 26.5 28C29 28 32 30 32 35"
                  stroke="#ffffff"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="product-title">
              ZFIT<span className="product-dot">.</span>
            </h2>

            {/* Expand / Collapse Indicator Button */}
            <button
              type="button"
              className="card-expand-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick('zfit');
              }}
            >
              <span>{expandedProduct === 'zfit' ? 'Close Details' : 'View Details & Workspace'}</span>
              {expandedProduct === 'zfit' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* Expanded Content Drawer */}
            {expandedProduct === 'zfit' && (
              <div className="expanded-details-pane" onClick={(e) => e.stopPropagation()}>
                <span className="details-tagline">{PRODUCT_DATA.zfit.tagline}</span>
                <p className="details-paragraph">{PRODUCT_DATA.zfit.description}</p>

                <div className="quick-stats-badge-row">
                  <div className="mini-stat-pill">
                    <span className="stat-pulse-green" />
                    <span>{PRODUCT_DATA.zfit.teamOnline} Team Online</span>
                  </div>
                  <div className="mini-stat-pill">
                    <Activity size={12} className="stat-icon-blue" />
                    <span>{PRODUCT_DATA.zfit.activeSprint}</span>
                  </div>
                </div>

                <div className="modules-chips-row">
                  {PRODUCT_DATA.zfit.modules.map((m) => (
                    <span key={m} className="module-chip">
                      {m}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="open-workspace-btn"
                  onClick={(e) => handleOpenWorkspace('zfit', e)}
                >
                  <span>Open ZFIT Workspace</span>
                  <ArrowRight size={16} className="btn-arrow-icon" />
                </button>
              </div>
            )}
          </div>

          {/* ════ CARD 2: Zuccano Consumer. ════ */}
          <div
            id="card-consumer"
            className={`product-card ${
              expandedProduct === 'consumer' ? 'card-expanded card-selected' : ''
            }`}
            onClick={() => handleCardClick('consumer')}
          >
            {/* Top Indicator */}
            <div className="card-top-pill">
              {expandedProduct === 'consumer' ? (
                <span className="collapse-tag">
                  <span>Collapse</span>
                  <ChevronUp size={13} />
                </span>
              ) : (
                <span className="expand-tag">Click to expand</span>
              )}
            </div>

            {/* Icon Tile */}
            <div className="icon-tile consumer-icon-tile">
              <svg
                className="consumer-bag-svg"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 18H34L32 36H16L14 18Z"
                  stroke="#000000"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 22V15C20 12.7909 21.7909 11 24 11C26.2091 11 28 12.7909 28 15V22"
                  stroke="#000000"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="product-title">
              Zuccano Consumer<span className="product-dot">.</span>
            </h2>

            {/* Expand / Collapse Indicator Button */}
            <button
              type="button"
              className="card-expand-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick('consumer');
              }}
            >
              <span>{expandedProduct === 'consumer' ? 'Close Details' : 'View Details & Workspace'}</span>
              {expandedProduct === 'consumer' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* Expanded Content Drawer */}
            {expandedProduct === 'consumer' && (
              <div className="expanded-details-pane" onClick={(e) => e.stopPropagation()}>
                <span className="details-tagline">{PRODUCT_DATA.consumer.tagline}</span>
                <p className="details-paragraph">{PRODUCT_DATA.consumer.description}</p>

                <div className="quick-stats-badge-row">
                  <div className="mini-stat-pill">
                    <span className="stat-pulse-green" />
                    <span>{PRODUCT_DATA.consumer.teamOnline} Team Online</span>
                  </div>
                  <div className="mini-stat-pill">
                    <Activity size={12} className="stat-icon-blue" />
                    <span>{PRODUCT_DATA.consumer.activeSprint}</span>
                  </div>
                </div>

                <div className="modules-chips-row">
                  {PRODUCT_DATA.consumer.modules.map((m) => (
                    <span key={m} className="module-chip">
                      {m}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="open-workspace-btn"
                  onClick={(e) => handleOpenWorkspace('consumer', e)}
                >
                  <span>Open Consumer Workspace</span>
                  <ArrowRight size={16} className="btn-arrow-icon" />
                </button>
              </div>
            )}
          </div>

          {/* ════ CARD 3: Zuccano Business. ════ */}
          <div
            id="card-business"
            className={`product-card ${
              expandedProduct === 'business' ? 'card-expanded card-selected' : ''
            }`}
            onClick={() => handleCardClick('business')}
          >
            {/* Top Indicator */}
            <div className="card-top-pill">
              {expandedProduct === 'business' ? (
                <span className="collapse-tag">
                  <span>Collapse</span>
                  <ChevronUp size={13} />
                </span>
              ) : (
                <span className="expand-tag">Click to expand</span>
              )}
            </div>

            {/* Icon Tile */}
            <div className="icon-tile business-icon-tile">
              <svg
                className="business-bldg-svg"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 36V14C14 12.8954 14.8954 12 16 12H28C29.1046 12 30 12.8954 30 14V36"
                  stroke="#000000"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <path
                  d="M30 22H34C34.5523 22 35 22.4477 35 23V36"
                  stroke="#000000"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <path
                  d="M11 36H37"
                  stroke="#000000"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <rect x="19" y="17" width="2" height="3" rx="0.5" fill="#000000" />
                <rect x="23" y="17" width="2" height="3" rx="0.5" fill="#000000" />
                <rect x="19" y="23" width="2" height="3" rx="0.5" fill="#000000" />
                <rect x="23" y="23" width="2" height="3" rx="0.5" fill="#000000" />
                <rect x="19" y="29" width="2" height="3" rx="0.5" fill="#000000" />
                <rect x="23" y="29" width="2" height="3" rx="0.5" fill="#000000" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="product-title">
              Zuccano Business<span className="product-dot">.</span>
            </h2>

            {/* Expand / Collapse Indicator Button */}
            <button
              type="button"
              className="card-expand-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick('business');
              }}
            >
              <span>{expandedProduct === 'business' ? 'Close Details' : 'View Details & Workspace'}</span>
              {expandedProduct === 'business' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* Expanded Content Drawer */}
            {expandedProduct === 'business' && (
              <div className="expanded-details-pane" onClick={(e) => e.stopPropagation()}>
                <span className="details-tagline">{PRODUCT_DATA.business.tagline}</span>
                <p className="details-paragraph">{PRODUCT_DATA.business.description}</p>

                <div className="quick-stats-badge-row">
                  <div className="mini-stat-pill">
                    <span className="stat-pulse-green" />
                    <span>{PRODUCT_DATA.business.teamOnline} Team Online</span>
                  </div>
                  <div className="mini-stat-pill">
                    <Activity size={12} className="stat-icon-blue" />
                    <span>{PRODUCT_DATA.business.activeSprint}</span>
                  </div>
                </div>

                <div className="modules-chips-row">
                  {PRODUCT_DATA.business.modules.map((m) => (
                    <span key={m} className="module-chip">
                      {m}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="open-workspace-btn"
                  onClick={(e) => handleOpenWorkspace('business', e)}
                >
                  <span>Open Business Workspace</span>
                  <ArrowRight size={16} className="btn-arrow-icon" />
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ChooseProduct;
