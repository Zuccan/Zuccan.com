import React, { useState } from 'react';

export default function HoldingAuditLogsModule({ holdingData }) {
  const [filterAction, setFilterAction] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const logs = holdingData.auditLogs || [];

  const filteredLogs = logs.filter((log) => {
    if (filterAction !== 'ALL' && !log.action.includes(filterAction)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.actor.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.target.toLowerCase().includes(q) ||
        (log.details && log.details.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="mw-module-stack">
      {/* Header */}
      <div className="mw-section-header">
        <div>
          <span className="mw-section-eyebrow">Immutable Governance Ledger</span>
          <h2 className="mw-section-title">Corporate Holding Audit Trail</h2>
          <p className="mw-section-subtitle">
            Cryptographically sealed, append-only chronological log of all parent-level governance decisions, cap table transactions, statutory filings, and authorized approvals.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="mw-badge mw-badge-outline" style={{ background: '#FAFAFA' }}>
            🔒 Tamper-Resistant (Read-Only)
          </span>
          <span className="mw-badge mw-badge-neutral">
            {logs.length} Total Events
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mw-filter-bar">
        <div style={{ flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            className="mw-input"
            placeholder="Search audit trail by actor, action, or target entity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            className="mw-input"
            style={{ width: 'auto' }}
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
          >
            <option value="ALL">All Recorded Actions</option>
            <option value="SUBSIDIARY">Subsidiary Events</option>
            <option value="APPROVAL">Approvals & Decisions</option>
            <option value="OWNERSHIP">Cap Table & Equity</option>
            <option value="STATUTORY">Statutory & RoC</option>
            <option value="USER">Access & Roles</option>
            <option value="DOCUMENT">Documents & Filings</option>
          </select>
          <button
            className="mw-btn mw-btn-ghost"
            onClick={() => {
              setFilterAction('ALL');
              setSearchQuery('');
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="mw-panel">
        <div className="mw-table-wrap">
          <table className="mw-table">
            <thead>
              <tr>
                <th>Timestamp (UTC+5:30)</th>
                <th>Authorized Actor</th>
                <th>System Action</th>
                <th>Target Record / Entity</th>
                <th>Operational Context & Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#71717A' }}>
                    No audit records match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((item) => (
                  <tr key={item.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#52525B' }}>
                        {item.timestamp}
                      </span>
                    </td>
                    <td>
                      <div className="mw-row-primary">{item.actor}</div>
                      <div className="mw-row-secondary">Zuccano Holding</div>
                    </td>
                    <td>
                      <span
                        className={`mw-badge ${
                          item.action.includes('APPROVED') || item.action.includes('GRANTED')
                            ? 'mw-badge-success'
                            : item.action.includes('REJECTED') || item.action.includes('REVOKED')
                            ? 'mw-badge-danger'
                            : item.action.includes('TRANSACTION') || item.action.includes('EQUITY')
                            ? 'mw-badge-warning'
                            : 'mw-badge-neutral'
                        }`}
                      >
                        {item.action}
                      </span>
                    </td>
                    <td>
                      <div className="mw-row-primary">{item.target}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#3F3F46', lineHeight: 1.4 }}>
                        {item.details || 'System event recorded in parent audit ledger.'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Note */}
      <div style={{ padding: '16px', background: '#FAFAFA', border: '1px solid #E4E4E7', borderRadius: '4px', fontSize: '12px', color: '#71717A' }}>
        <strong>Compliance Disclosure:</strong> In accordance with Companies (Management and Administration) Rules, 2014 and corporate governance standards, parent holding audit logs are permanently stored, non-editable, and timestamped against official server clocks.
      </div>
    </div>
  );
}
