import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Server,
  Layers,
  Key,
  Shield,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  Cpu,
  Activity,
  CheckCircle,
  Clock,
  ArrowUpRight,
  GitBranch,
  Terminal,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './EmployeeDashboard.css';

export const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { employee, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'team' | 'infra'

  const currentEmployee = employee || {
    name: 'Pavan Reddy',
    email: 'pavan.reddy@zuccano.com',
    role: 'CEO - Zuccano & Zfit',
    department: 'Executive Leadership',
    avatar: '/team-ayaan.jpg',
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="employee-dashboard-root">
      {/* ── Background Architectural Grid Lines ── */}
      <div className="ed-grid-lines" aria-hidden="true">
        <div className="ed-grid-col" />
        <div className="ed-grid-col" />
        <div className="ed-grid-col" />
        <div className="ed-grid-col" />
      </div>

      {/* ── Top Navigation Bar ── */}
      <header className="ed-header">
        <div className="ed-header-left">
          <Link to="/dashboard" className="ed-brand">
            <span className="ed-brand-name">zuccano</span>
            <span className="ed-brand-dot">.</span>
          </Link>
          <div className="ed-portal-pill">
            <span className="ed-pill-dot" />
            <span>ZUCCANO.ME // WORKSPACE</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="ed-search-bar">
          <Search size={14} className="ed-search-icon" />
          <input
            type="text"
            placeholder="Search internal projects, hardware docs, APIs... (Press ⌘K)"
            className="ed-search-input"
          />
        </div>

        {/* Header Right Profile & Actions */}
        <div className="ed-header-right">
          <div className="ed-status-badge" title="Systems 100% Operational">
            <span className="ed-status-dot" />
            <span>INFRA: OK</span>
          </div>

          {/* User Profile Pill */}
          <div className="ed-user-profile">
            <img
              src={currentEmployee.avatar || '/team-ayaan.jpg'}
              alt={currentEmployee.name}
              className="ed-user-avatar"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="ed-user-info">
              <span className="ed-user-name">{currentEmployee.name}</span>
              <span className="ed-user-role">{currentEmployee.role}</span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            className="ed-logout-btn"
            onClick={handleSignOut}
            title="Sign out of Zuccano Workspace"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* ── Main Dashboard Workspace ── */}
      <div className="ed-body-layout">
        {/* Sidebar Navigation */}
        <aside className="ed-sidebar">
          <nav className="ed-nav-menu">
            <button
              type="button"
              className={`ed-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard size={16} />
              <span>Workspace Overview</span>
            </button>

            <button
              type="button"
              className={`ed-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Layers size={16} />
              <span>Active Projects (3)</span>
            </button>

            <button
              type="button"
              className={`ed-nav-item ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              <Users size={16} />
              <span>Team Directory</span>
            </button>

            <button
              type="button"
              className={`ed-nav-item ${activeTab === 'infra' ? 'active' : ''}`}
              onClick={() => setActiveTab('infra')}
            >
              <Server size={16} />
              <span>Infrastructure & APIs</span>
            </button>
          </nav>

          <div className="ed-sidebar-footer">
            <div className="ed-version-card">
              <span className="ed-v-label">INTERNAL ENVIRONMENT</span>
              <span className="ed-v-num">PROD-ASIA-SOUTH1</span>
              <span className="ed-v-domain">HOST: zuccano.me</span>
            </div>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="ed-main-content">
          {/* Welcome Eyebrow & Hero Header */}
          <div className="ed-hero-banner">
            <div className="ed-hero-eyebrow">
              <span className="ed-eyebrow-num">01</span>
              <span className="ed-eyebrow-line" />
              <span>INTERNAL EXECUTIVE PORTAL</span>
            </div>
            <h1 className="ed-hero-title">
              WELCOME BACK, {currentEmployee.name.split(' ')[0].toUpperCase()}
              <span className="ed-hero-dot">.</span>
            </h1>
            <p className="ed-hero-subtitle">
              All production clusters are online. Real-time telemetry, hardware pipelines, and employee directories are synchronized.
            </p>
          </div>

          {/* Metric KPI Cards */}
          <div className="ed-kpi-grid">
            <div className="ed-kpi-card">
              <div className="ed-kpi-top">
                <span className="ed-kpi-label">DEPLOYED HARDWARE & PLATFORMS</span>
                <Cpu size={16} className="ed-kpi-icon" />
              </div>
              <div className="ed-kpi-val">3 Active</div>
              <span className="ed-kpi-sub">ZFIT Wearables • B2C Hardware • Enterprise</span>
            </div>

            <div className="ed-kpi-card">
              <div className="ed-kpi-top">
                <span className="ed-kpi-label">GLOBAL UPTIME</span>
                <Activity size={16} className="ed-kpi-icon ed-icon-green" />
              </div>
              <div className="ed-kpi-val">99.98%</div>
              <span className="ed-kpi-sub">BOM1 Edge Region • 0 Incidents</span>
            </div>

            <div className="ed-kpi-card">
              <div className="ed-kpi-top">
                <span className="ed-kpi-label">ACTIVE PERSONNEL</span>
                <Users size={16} className="ed-kpi-icon" />
              </div>
              <div className="ed-kpi-val">14 Core</div>
              <span className="ed-kpi-sub">Design, Hardware, Embedded, Cloud</span>
            </div>

            <div className="ed-kpi-card">
              <div className="ed-kpi-top">
                <span className="ed-kpi-label">SECURITY PROTOCOL</span>
                <Shield size={16} className="ed-kpi-icon ed-icon-red" />
              </div>
              <div className="ed-kpi-val">mTLS / 2FA</div>
              <span className="ed-kpi-sub">Hardware Token Enforced</span>
            </div>
          </div>

          {/* Projects & Workspaces Section */}
          <section className="ed-section">
            <div className="ed-section-header">
              <h2 className="ed-section-title">ACTIVE WORKSPACES</h2>
              <span className="ed-section-tag">PRODUCTION</span>
            </div>

            <div className="ed-projects-grid">
              {/* Project 1: ZFIT */}
              <div className="ed-project-card">
                <div className="ed-p-header">
                  <div className="ed-p-badge">FLAGSHIP WEARABLE</div>
                  <span className="ed-p-status online">DEPLOYED</span>
                </div>
                <h3 className="ed-p-title">ZFIT — Next-Gen AI Wearable</h3>
                <p className="ed-p-desc">
                  Interactive multi-avatar studio, Bluetooth Low Energy sync, biometric health processing engine.
                </p>
                <div className="ed-p-footer">
                  <span className="ed-p-meta">Stack: React + Tailwind + Vite</span>
                  <a
                    href="https://zuccano.in"
                    target="_blank"
                    rel="noreferrer"
                    className="ed-p-link"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Project 2: Zuccano Consumer */}
              <div className="ed-project-card">
                <div className="ed-p-header">
                  <div className="ed-p-badge">CONSUMER PORTAL</div>
                  <span className="ed-p-status online">LIVE</span>
                </div>
                <h3 className="ed-p-title">Zuccano B2C & Hardware Catalog</h3>
                <p className="ed-p-desc">
                  Pixel-perfect products showcase, GSAP & Framer Motion kinetic scroll carousel, mobile safety gate.
                </p>
                <div className="ed-p-footer">
                  <span className="ed-p-meta">Domain: zuccano.in</span>
                  <a
                    href="https://zuccano.in/customers"
                    target="_blank"
                    rel="noreferrer"
                    className="ed-p-link"
                  >
                    <span>View Site</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Project 3: Internal Cloud Gateway */}
              <div className="ed-project-card">
                <div className="ed-p-header">
                  <div className="ed-p-badge">INTERNAL INFRA</div>
                  <span className="ed-p-status online">STANDBY</span>
                </div>
                <h3 className="ed-p-title">Zuccano Cloud API & Vault</h3>
                <p className="ed-p-desc">
                  Employee authentication hub, single sign-on microservices, telemetry collector.
                </p>
                <div className="ed-p-footer">
                  <span className="ed-p-meta">Domain: zuccano.me</span>
                  <span className="ed-p-badge-sub">Internal Only</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Team Feed */}
          <section className="ed-section">
            <div className="ed-section-header">
              <h2 className="ed-section-title">EXECUTIVE & TEAM DIRECTORY</h2>
              <span className="ed-section-tag">LEADERSHIP</span>
            </div>

            <div className="ed-team-table">
              <div className="ed-tt-row ed-tt-head">
                <span>MEMBER</span>
                <span>ROLE</span>
                <span>DEPARTMENT</span>
                <span>ACCESS LEVEL</span>
                <span>STATUS</span>
              </div>

              <div className="ed-tt-row">
                <div className="ed-tt-user">
                  <img src="/team-ayaan.jpg" alt="Pavan" className="ed-tt-avatar" />
                  <strong>Pavan Reddy</strong>
                </div>
                <span>CEO - Zuccano & Zfit</span>
                <span>Executive</span>
                <span className="ed-tt-badge root">Root / Admin</span>
                <span className="ed-tt-status"><span className="ed-tt-dot" /> Active</span>
              </div>

              <div className="ed-tt-row">
                <div className="ed-tt-user">
                  <img src="/team-sameer.jpg" alt="Kumar" className="ed-tt-avatar" />
                  <strong>Kumar MS</strong>
                </div>
                <span>COO (Chief Operating Officer)</span>
                <span>Operations</span>
                <span className="ed-tt-badge admin">Tier 1 Admin</span>
                <span className="ed-tt-status"><span className="ed-tt-dot" /> Active</span>
              </div>

              <div className="ed-tt-row">
                <div className="ed-tt-user">
                  <img src="/team-sara.jpg" alt="Sara" className="ed-tt-avatar" />
                  <strong>Sara K.</strong>
                </div>
                <span>Lead Product Designer</span>
                <span>Design & Hardware</span>
                <span className="ed-tt-badge dev">Engineering</span>
                <span className="ed-tt-status"><span className="ed-tt-dot" /> Active</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="ed-footer">
        <div className="ed-footer-left">
          <span className="ed-f-num">01</span>
          <span className="ed-f-line" />
          <span>ZUCCANO INC. INTERNAL SYSTEMS • ALL SESSIONS RECORDED</span>
        </div>
        <div className="ed-footer-right">
          <span>HOST: <strong>ZUCCANO.ME</strong></span>
          <span className="ed-f-dot">•</span>
          <span>EST. 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;
