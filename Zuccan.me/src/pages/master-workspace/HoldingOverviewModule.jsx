import React from 'react';
import {
  Building2,
  PieChart,
  Shield,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Users,
  Briefcase,
} from 'lucide-react';

import holdingStore from '../../lib/holdingStore';

export const HoldingOverviewModule = ({ data, holdingData, onNavigate, onSelectSubsidiary }) => {
  const currentData = data || holdingData || holdingStore.getData();
  const {
    identity = {},
    subsidiaries = [],
    parentCapTable = [],
    parentApprovals = [],
    complianceCalendar = [],
  } = currentData || {};

  const pendingApprovals = (parentApprovals || []).filter(
    (a) => a.status === 'Pending' || a.status === 'Under Review'
  );

  return (
    <div className="holding-overview-view">
      {/* ── Header ── */}
      <div className="ceo-module-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#E3262E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Holding Company Operating Headquarters
            </span>
            <span style={{ color: '#D4D4D8' }}>•</span>
            <span style={{ fontSize: '0.72rem', color: '#71717A' }}>
              CIN: {identity.cin}
            </span>
          </div>
          <h1 className="ceo-module-title">{identity.legalName}</h1>
          <p className="ceo-module-desc">
            Central parent-company management platform. Oversee corporate subsidiaries, maintain cap tables and equity records, review subsidiary governance disclosures, and manage board-level approvals.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="ceo-action-btn-outline"
            onClick={() => onNavigate('ownership')}
          >
            <PieChart size={14} />
            <span>View Cap Tables</span>
          </button>
          <button
            type="button"
            className="ceo-action-btn-red"
            style={{ background: '#E3262E' }}
            onClick={() => onNavigate('subsidiaries')}
          >
            <Building2 size={14} />
            <span>Manage Subsidiaries</span>
          </button>
        </div>
      </div>

      {/* ── Metrics Grid ── */}
      <div className="ceo-metrics-row">
        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Operating Subsidiaries</div>
          <div className="ceo-metric-value">{subsidiaries.length} Entities</div>
          <div className="ceo-metric-subtext">
            <span>ZFIT (51%), Consumer (100%), Business (100%)</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Total Capital Deployed</div>
          <div className="ceo-metric-value">₹11.50 Cr</div>
          <div className="ceo-metric-subtext">
            <span>Liquid Holding Reserves: ₹3.50 Cr</span>
          </div>
        </div>

        <div className="ceo-metric-card" style={{ borderColor: pendingApprovals.length > 0 ? '#FEE2E2' : '#E4E4E7' }}>
          <div className="ceo-metric-label" style={{ color: pendingApprovals.length > 0 ? '#E3262E' : '#71717A' }}>
            Board Approvals Pending
          </div>
          <div className="ceo-metric-value" style={{ color: pendingApprovals.length > 0 ? '#E3262E' : '#09090B' }}>
            {pendingApprovals.length} Requests
          </div>
          <div className="ceo-metric-subtext">
            <span>Matters reserved for Parent Holding Board</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Next Statutory Filing</div>
          <div className="ceo-metric-value" style={{ fontSize: '1.25rem' }}>
            20 Nov 2026
          </div>
          <div className="ceo-metric-subtext">
            <span>Form AOC-4 Financials to RoC</span>
          </div>
        </div>
      </div>

      {/* ── Central Subsidiaries Directory Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Building2 size={15} style={{ color: '#09090B' }} />
            <span>Zuccano Subsidiary Corporate Directory</span>
            <span className="ceo-table-count">{subsidiaries.length}</span>
          </div>
          <button
            type="button"
            className="ceo-action-btn-outline"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
            onClick={() => onNavigate('subsidiaries')}
          >
            Create New Subsidiary
          </button>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Subsidiary Entity</th>
              <th>Chief Executive Officer</th>
              <th>Zuccano Ownership Stake</th>
              <th>Other Ownership</th>
              <th>Headcount</th>
              <th>Status</th>
              <th>Latest Submitted Report</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subsidiaries.map((sub) => (
              <tr key={sub.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: '#09090B',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.72rem',
                      }}
                    >
                      {sub.shortName.slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#09090B' }}>{sub.name}</div>
                      <div style={{ fontSize: '0.68rem', color: '#71717A' }}>CIN: {sub.cin}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{sub.ceoName}</div>
                  <div style={{ fontSize: '0.68rem', color: '#71717A' }}>{sub.ceoEmail}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 800, color: sub.zuccanoOwnership === 51 ? '#E3262E' : '#09090B', fontSize: '0.88rem' }}>
                      {sub.zuccanoOwnership}%
                    </span>
                    <span className="badge-neutral" style={{ fontSize: '0.65rem' }}>Parent Stake</span>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#71717A', marginTop: '2px' }}>
                    Held by Zuccano Group Holdings
                  </div>
                </td>
                <td>
                  {sub.otherOwnershipConfigured ? (
                    <span style={{ fontSize: '0.72rem', color: '#52525B' }}>Wholly Owned</span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#D97706', fontStyle: 'italic' }}>
                      49% Unconfigured
                    </span>
                  )}
                </td>
                <td>{sub.headcount} Team</td>
                <td>
                  <span className="badge-active">{sub.status}</span>
                </td>
                <td>
                  <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#09090B' }}>
                    {sub.lastReportTitle}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#71717A' }}>
                    Dated: {sub.lastReportDate}
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    style={{
                      background: '#F4F4F5',
                      border: '1px solid #E4E4E7',
                      color: '#09090B',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (onSelectSubsidiary) onSelectSubsidiary(sub.id);
                      onNavigate('subsidiaries');
                    }}
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Bottom Split: Pending Approvals & Statutory Deadlines ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Pending Parent Decisions */}
        <div className="ceo-table-container">
          <div className="ceo-table-header-bar">
            <div className="ceo-table-title">
              <AlertTriangle size={15} style={{ color: '#E3262E' }} />
              <span>Matters Requiring Parent Board Authorization</span>
              <span className="ceo-table-count">{pendingApprovals.length}</span>
            </div>
            <button
              type="button"
              className="ceo-action-btn-outline"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
              onClick={() => onNavigate('approvals')}
            >
              Approval Center
            </button>
          </div>

          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {pendingApprovals.map((appr) => (
              <div
                key={appr.id}
                style={{
                  border: '1px solid #E4E4E7',
                  borderRadius: '6px',
                  padding: '0.85rem 1rem',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span className="badge-review">{appr.status}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#09090B' }}>{appr.title}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A' }}>
                    {appr.requestingCompany} • Requested by {appr.requestedBy} • {appr.date}
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    background: '#09090B',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => onNavigate('approvals')}
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Governance Calendar */}
        <div className="ceo-table-container">
          <div className="ceo-table-header-bar">
            <div className="ceo-table-title">
              <Clock size={15} style={{ color: '#09090B' }} />
              <span>Upcoming Statutory Compliance</span>
              <span className="ceo-table-count">{complianceCalendar.length}</span>
            </div>
          </div>

          <div style={{ padding: '0.5rem 0' }}>
            {complianceCalendar.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1.15rem',
                  borderBottom: '1px solid #F4F4F5',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#09090B' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>
                    {item.authority} • Due: <strong>{item.dueDate}</strong>
                  </div>
                </div>
                <span className="badge-neutral">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingOverviewModule;
