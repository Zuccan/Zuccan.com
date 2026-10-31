import React from 'react';
import {
  Users,
  Briefcase,
  Layers,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Shield,
  FileText,
  DollarSign,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const OverviewModule = ({ data, onNavigate, onApproveLeave, onApproveExpense }) => {
  const { identity, leadership, departments, projects, tasks, leaveRequests, expenses, zuccanoReports, auditLogs } = data;

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending');
  const pendingExpenses = expenses.filter((e) => e.status === 'Pending Approval');
  const pendingTasks = tasks.filter((t) => t.status === 'Under Review');

  const totalPending = pendingLeaves.length + pendingExpenses.length + pendingTasks.length;

  return (
    <div className="ceo-overview-view">
      {/* ── Top Executive Banner ── */}
      <div className="ceo-module-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E3262E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Autonomous Subsidiary Operating System
            </span>
            <span style={{ color: '#D4D4D8' }}>•</span>
            <span style={{ fontSize: '0.72rem', color: '#71717A' }}>
              Holding: {identity.parentCompany}
            </span>
          </div>
          <h1 className="ceo-module-title">
            {identity.name} Executive Pulse
          </h1>
          <p className="ceo-module-desc">
            Autonomous subsidiary operations overview. Review leadership appointments, active deliverables, pending operational approvals, and report directly to Zuccano.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="ceo-action-btn-outline"
            onClick={() => onNavigate('report-to-zuccano')}
          >
            <FileText size={14} />
            <span>Report to Zuccano</span>
          </button>
          <button
            type="button"
            className="ceo-action-btn-red"
            onClick={() => onNavigate('leadership')}
          >
            <Users size={14} />
            <span>Manage Leadership</span>
          </button>
        </div>
      </div>

      {/* ── Executive Metrics (Clean, Dense, Actionable) ── */}
      <div className="ceo-metrics-row">
        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Total Subsidiary Headcount</div>
          <div className="ceo-metric-value">{identity.totalHeadcount}</div>
          <div className="ceo-metric-subtext">
            <span style={{ color: '#16A34A', fontWeight: 600 }}>100% autonomous</span> across {departments.length} departments
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Active Projects & Sprints</div>
          <div className="ceo-metric-value">{projects.length}</div>
          <div className="ceo-metric-subtext">
            <span>{tasks.filter((t) => t.status === 'Completed').length} tasks delivered this month</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Fiscal Budget Utilization</div>
          <div className="ceo-metric-value">
            {identity.currencySymbol}{(identity.utilizedBudget / 10000000).toFixed(2)} Cr
          </div>
          <div className="ceo-metric-subtext">
            <span>of {identity.currencySymbol}{(identity.fiscalBudget / 10000000).toFixed(2)} Cr authorized (63% burn)</span>
          </div>
        </div>

        <div className="ceo-metric-card" style={{ borderColor: totalPending > 0 ? '#FEE2E2' : '#E4E4E7' }}>
          <div className="ceo-metric-label" style={{ color: totalPending > 0 ? '#E3262E' : '#71717A' }}>
            Action Required
          </div>
          <div className="ceo-metric-value" style={{ color: totalPending > 0 ? '#E3262E' : '#09090B' }}>
            {totalPending}
          </div>
          <div className="ceo-metric-subtext">
            <span>{pendingExpenses.length} capex, {pendingLeaves.length} leaves, {pendingTasks.length} task reviews</span>
          </div>
        </div>
      </div>

      {/* ── Two Column Executive Layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
        {/* Left Column: Items Requiring CEO Attention & Pending Approvals */}
        <div className="ceo-table-container">
          <div className="ceo-table-header-bar">
            <div className="ceo-table-title">
              <AlertTriangle size={15} style={{ color: '#E3262E' }} />
              <span>Items Requiring Executive Review</span>
              <span className="ceo-table-count">{totalPending}</span>
            </div>
            <button
              type="button"
              className="ceo-action-btn-outline"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
              onClick={() => onNavigate('finance')}
            >
              View All Approvals
            </button>
          </div>

          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Pending Expenses */}
            {pendingExpenses.map((exp) => (
              <div
                key={exp.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  border: '1px solid #E4E4E7',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span className="badge-pending">Capex Approval</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#09090B' }}>{exp.title}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A' }}>
                    {exp.department} • Submitted by {exp.submittedBy} • {identity.currencySymbol}{exp.amount.toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    style={{
                      background: '#16A34A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => onApproveExpense(exp.id, true)}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    style={{
                      background: '#F4F4F5',
                      color: '#52525B',
                      border: '1px solid #E4E4E7',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => onApproveExpense(exp.id, false)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {/* Pending Leaves */}
            {pendingLeaves.map((lev) => (
              <div
                key={lev.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  border: '1px solid #E4E4E7',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span className="badge-review">Leave Request</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#09090B' }}>{lev.employeeName}</span>
                    <span style={{ fontSize: '0.72rem', color: '#71717A' }}>({lev.type})</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A' }}>
                    {lev.department} • {lev.days} days ({lev.startDate} to {lev.endDate}) • "{lev.reason}"
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    style={{
                      background: '#16A34A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => onApproveLeave(lev.id, true)}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    style={{
                      background: '#F4F4F5',
                      color: '#52525B',
                      border: '1px solid #E4E4E7',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => onApproveLeave(lev.id, false)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {totalPending === 0 && (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: '#71717A', fontSize: '0.82rem' }}>
                <CheckCircle2 size={32} style={{ color: '#16A34A', margin: '0 auto 8px', display: 'block' }} />
                All pending items resolved. Executive queue is clean!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Leadership Team Summary */}
        <div className="ceo-table-container">
          <div className="ceo-table-header-bar">
            <div className="ceo-table-title">
              <Users size={15} style={{ color: '#09090B' }} />
              <span>Executive Leadership Team</span>
              <span className="ceo-table-count">{leadership.length}</span>
            </div>
            <button
              type="button"
              className="ceo-action-btn-outline"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
              onClick={() => onNavigate('leadership')}
            >
              Org Chart
            </button>
          </div>

          <div style={{ padding: '0.5rem 0' }}>
            {leadership.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1.15rem',
                  borderBottom: '1px solid #F4F4F5',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '6px',
                      background: lead.roleType === 'CEO' ? '#09090B' : '#F4F4F5',
                      color: lead.roleType === 'CEO' ? '#FFFFFF' : '#09090B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {lead.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#09090B' }}>
                      {lead.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#71717A' }}>
                      {lead.designation} • {lead.department}
                    </div>
                  </div>
                </div>

                <span className={lead.roleType === 'CEO' ? 'badge-active' : 'badge-neutral'}>
                  {lead.roleType}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Section: Active Projects Table & Recent Audit Logs ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Briefcase size={15} style={{ color: '#09090B' }} />
            <span>Core Active Subsidiary Projects</span>
            <span className="ceo-table-count">{projects.length}</span>
          </div>
          <button
            type="button"
            className="ceo-action-btn-outline"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
            onClick={() => onNavigate('projects')}
          >
            Manage All Projects
          </button>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Project Name & Code</th>
              <th>Department</th>
              <th>Project Manager</th>
              <th>Priority</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Target Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id}>
                <td>
                  <div style={{ fontWeight: 700, color: '#09090B' }}>{proj.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>{proj.code}</div>
                </td>
                <td>{proj.department}</td>
                <td>{proj.manager}</td>
                <td>
                  <span className={`priority-${proj.priority.toLowerCase()}`}>
                    {proj.priority}
                  </span>
                </td>
                <td style={{ width: '140px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '6px', background: '#E4E4E7', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${proj.progress}%`, height: '100%', background: proj.progress > 70 ? '#16A34A' : '#E3262E' }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>{proj.progress}%</span>
                  </div>
                </td>
                <td>
                  <span className={proj.status === 'In Progress' ? 'badge-active' : 'badge-review'}>
                    {proj.status}
                  </span>
                </td>
                <td style={{ color: '#71717A' }}>{proj.targetDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewModule;
