import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LogOut,
  ExternalLink,
  Users,
  FolderGit2,
  Globe,
  Mail,
  ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './EmployeeDashboard.css';

export const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { employee, logout } = useAuth();

  const currentEmployee = employee || {
    name: 'Pavan Reddy',
    email: 'pavan.reddy@zuccano.com',
    role: 'CEO - Zuccano & Zfit',
    avatar: '/team-ayaan.jpg',
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="employee-dashboard-root">
      {/* ── Background Grid ── */}
      <div className="ed-grid-lines" aria-hidden="true">
        <div className="ed-grid-col" />
        <div className="ed-grid-col" />
        <div className="ed-grid-col" />
        <div className="ed-grid-col" />
      </div>

      {/* ── Top Header ── */}
      <header className="ed-header">
        <div className="ed-header-left">
          <Link to="/dashboard" className="ed-brand" title="Zuccano">
            <span className="ed-brand-name">zuccano</span>
            <span className="ed-brand-dot">.</span>
          </Link>
          <span className="ed-portal-tag">Employees Portal</span>
        </div>

        <div className="ed-header-right">
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

          <button
            type="button"
            className="ed-logout-btn"
            onClick={handleSignOut}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* ── Dashboard Content ── */}
      <main className="ed-main">
        <div className="ed-container">
          {/* Welcome Title */}
          <div className="ed-welcome-block">
            <h1 className="ed-title">
              Welcome back, {currentEmployee.name.split(' ')[0]}<span className="ed-title-dot">.</span>
            </h1>
            <p className="ed-subtitle">
              Zuccano company portal, active projects, and team directory.
            </p>
          </div>

          {/* Active Projects Cards */}
          <section className="ed-section">
            <h2 className="ed-section-heading">Company Projects</h2>

            <div className="ed-cards-grid">
              {/* Project 1: ZFIT */}
              <div className="ed-card">
                <div className="ed-card-top">
                  <span className="ed-card-badge">Wearable & App</span>
                  <a
                    href="https://github.com/Zuccan/Zfit"
                    target="_blank"
                    rel="noreferrer"
                    className="ed-card-link"
                  >
                    <span>Repository</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
                <h3 className="ed-card-title">ZFIT</h3>
                <p className="ed-card-desc">
                  Next-generation smart wearable and companion fitness platform.
                </p>
              </div>

              {/* Project 2: Zuccano Consumer */}
              <div className="ed-card">
                <div className="ed-card-top">
                  <span className="ed-card-badge">Consumer Hardware</span>
                  <a
                    href="https://zuccano.in/customers"
                    target="_blank"
                    rel="noreferrer"
                    className="ed-card-link"
                  >
                    <span>View Site</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
                <h3 className="ed-card-title">Zuccano B2C</h3>
                <p className="ed-card-desc">
                  Consumer electronics, everyday smart devices, and products showcase.
                </p>
              </div>

              {/* Project 3: Zuccano Business */}
              <div className="ed-card">
                <div className="ed-card-top">
                  <span className="ed-card-badge">Enterprise</span>
                  <a
                    href="https://zuccano.in/business"
                    target="_blank"
                    rel="noreferrer"
                    className="ed-card-link"
                  >
                    <span>View Site</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
                <h3 className="ed-card-title">Zuccano Business</h3>
                <p className="ed-card-desc">
                  Hardware and software solutions built for business and enterprise workflows.
                </p>
              </div>
            </div>
          </section>

          {/* Team Directory */}
          <section className="ed-section">
            <h2 className="ed-section-heading">Team Directory</h2>

            <div className="ed-team-card">
              <div className="ed-team-row ed-team-head">
                <span>Name</span>
                <span>Role</span>
                <span>Email</span>
              </div>

              <div className="ed-team-row">
                <div className="ed-team-user">
                  <img src="/team-ayaan.jpg" alt="Pavan" className="ed-team-avatar" />
                  <strong>Pavan Reddy</strong>
                </div>
                <span>CEO - Zuccano & Zfit</span>
                <span className="ed-team-email">pavan.reddy@zuccano.com</span>
              </div>

              <div className="ed-team-row">
                <div className="ed-team-user">
                  <img src="/team-sameer.jpg" alt="Kumar" className="ed-team-avatar" />
                  <strong>Kumar MS</strong>
                </div>
                <span>COO (Chief Operating Officer)</span>
                <span className="ed-team-email">kumar.ms@zuccano.com</span>
              </div>

              <div className="ed-team-row">
                <div className="ed-team-user">
                  <img src="/team-sara.jpg" alt="Sara" className="ed-team-avatar" />
                  <strong>Sara K.</strong>
                </div>
                <span>Lead Product Designer</span>
                <span className="ed-team-email">sara.k@zuccano.com</span>
              </div>
            </div>
          </section>

          {/* Quick Resources */}
          <section className="ed-section">
            <h2 className="ed-section-heading">Quick Resources</h2>
            <div className="ed-links-row">
              <a href="https://zuccano.in" target="_blank" rel="noreferrer" className="ed-link-pill">
                <Globe size={14} />
                <span>zuccano.in</span>
                <ExternalLink size={12} />
              </a>
              <a href="https://github.com/Zuccan" target="_blank" rel="noreferrer" className="ed-link-pill">
                <FolderGit2 size={14} />
                <span>GitHub Org</span>
                <ExternalLink size={12} />
              </a>
              <a href="mailto:contact@zuccano.com" className="ed-link-pill">
                <Mail size={14} />
                <span>Internal Email</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="ed-footer">
        <span>ZUCCANO INC. • EMPLOYEES PORTAL</span>
        <span>zuccano.me</span>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;
