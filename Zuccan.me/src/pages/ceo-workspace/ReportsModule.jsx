import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Download, CheckCircle2 } from 'lucide-react';

export const ReportsModule = ({ data }) => {
  const { identity, departments, projects, tasks, employees } = data;

  return (
    <div className="ceo-reports-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Operational Reports & Analytics</h1>
          <p className="ceo-module-desc">
            Consolidated operational summaries. Review sprint velocity, organizational headcount distributions, departmental budget utilization, and deliverable metrics.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-outline"
          onClick={() => alert('Exporting full subsidiary operational ledger (CSV/PDF)...')}
        >
          <Download size={14} />
          <span>Export Subsidiary Ledger</span>
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="ceo-metrics-row">
        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Headcount Efficiency</div>
          <div className="ceo-metric-value">{identity.totalHeadcount} Members</div>
          <div className="ceo-metric-subtext">
            <span>₹{(identity.utilizedBudget / identity.totalHeadcount / 100000).toFixed(1)}L spend per member</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Project Delivery Rate</div>
          <div className="ceo-metric-value" style={{ color: '#16A34A' }}>
            {Math.round((tasks.filter((t) => t.status === 'Completed').length / tasks.length) * 100)}%
          </div>
          <div className="ceo-metric-subtext">
            <span>{tasks.filter((t) => t.status === 'Completed').length} of {tasks.length} total tasks delivered</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Audit Logs Recorded</div>
          <div className="ceo-metric-value">{data.auditLogs.length} Actions</div>
          <div className="ceo-metric-subtext">
            <span>100% immutable action traceability</span>
          </div>
        </div>
      </div>

      {/* ── Department Breakdown ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <BarChart3 size={15} style={{ color: '#09090B' }} />
            <span>Departmental Workload & Budget Efficiency</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Head of Department</th>
              <th>Headcount</th>
              <th>Active Sprints</th>
              <th>Allocated Budget</th>
              <th>Spend</th>
              <th>Efficiency Rating</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{d.name}</strong>
                </td>
                <td>{d.headName}</td>
                <td>{d.memberCount} engineers</td>
                <td>{d.activeProjects} projects</td>
                <td>{identity.currencySymbol}{(d.allocatedBudget / 100000).toFixed(1)}L</td>
                <td>{identity.currencySymbol}{(d.utilizedBudget / 100000).toFixed(1)}L</td>
                <td>
                  <span className="badge-active">Optimal (A+)</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Immutable Audit Log Trace ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <span>Executive Audit Log (Security & Governance Trail)</span>
            <span className="ceo-table-count">{data.auditLogs.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Action Enacted</th>
              <th>Target Record</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.auditLogs.map((log) => (
              <tr key={log.id}>
                <td style={{ color: '#71717A', fontSize: '0.74rem' }}>{log.timestamp}</td>
                <td style={{ fontWeight: 600 }}>{log.actor}</td>
                <td>
                  <span className="badge-neutral" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ fontWeight: 600, color: '#09090B' }}>{log.target}</td>
                <td style={{ color: '#52525B', fontSize: '0.74rem' }}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsModule;
