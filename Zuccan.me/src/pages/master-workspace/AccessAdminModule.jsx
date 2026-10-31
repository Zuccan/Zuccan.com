import React, { useState } from 'react';
import holdingStore from '../../lib/holdingStore';

export default function AccessAdminModule({ holdingData }) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    systemRole: 'Parent Executive',
    ownershipStake: '0%',
  });

  const users = holdingData.workspaceUsers || [];

  const handleInvite = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    holdingStore.inviteWorkspaceUser(newUser);
    setShowInviteModal(false);
    setNewUser({
      name: '',
      email: '',
      role: '',
      systemRole: 'Parent Executive',
      ownershipStake: '0%',
    });
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    holdingStore.updateUserStatus(userId, nextStatus);
  };

  return (
    <div className="mw-module-stack">
      {/* Header */}
      <div className="mw-section-header">
        <div>
          <span className="mw-section-eyebrow">Enterprise Identity & Security Isolation</span>
          <h2 className="mw-section-title">Access & Role Administration</h2>
          <p className="mw-section-subtitle">
            Strict separation between legal shareholding, directorship, and system technical privileges. Equity percentage does not automatically confer technical administrative access.
          </p>
        </div>
        <button
          className="mw-btn mw-btn-primary"
          onClick={() => setShowInviteModal(true)}
        >
          <span>+ Provision Authorized User</span>
        </button>
      </div>

      {/* Role Architecture Reference */}
      <div className="mw-grid-3">
        <div className="mw-kpi-card">
          <div className="mw-kpi-label">Parent Workspace Admin</div>
          <div className="mw-kpi-sub" style={{ marginTop: '4px', lineHeight: 1.4 }}>
            Technical role provisioning, access revocation, security audit review, and system configuration.
          </div>
        </div>
        <div className="mw-kpi-card">
          <div className="mw-kpi-label">Parent Executive & Officers</div>
          <div className="mw-kpi-sub" style={{ marginTop: '4px', lineHeight: 1.4 }}>
            Operational authorizations, reviewing subsidiary disclosures, and ratifying reserved board decisions.
          </div>
        </div>
        <div className="mw-kpi-card">
          <div className="mw-kpi-label">Parent Governance & Finance</div>
          <div className="mw-kpi-sub" style={{ marginTop: '4px', lineHeight: 1.4 }}>
            Dedicated officers for RoC statutory filings, secretarial audits, and parent treasury ledgers.
          </div>
        </div>
      </div>

      {/* Authorized Users Table */}
      <div className="mw-panel">
        <div className="mw-panel-header">
          <div>
            <h3 className="mw-panel-title">Active Parent Workspace Personnel</h3>
            <p className="mw-panel-desc">
              All accounts require multi-factor authentication and are bound to organizational tenant isolation.
            </p>
          </div>
          <span className="mw-badge mw-badge-neutral">{users.length} Authorized Accounts</span>
        </div>

        <div className="mw-table-wrap">
          <table className="mw-table">
            <thead>
              <tr>
                <th>Personnel</th>
                <th>Corporate Designation</th>
                <th>System Technical Role</th>
                <th>Equity In Holding</th>
                <th>Account Status</th>
                <th>Last Active</th>
                <th style={{ textAlign: 'right' }}>Security Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="mw-row-primary">{u.name}</div>
                    <div className="mw-row-secondary">{u.email}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#18181B' }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className="mw-badge mw-badge-neutral">{u.systemRole}</span>
                  </td>
                  <td>
                    <span className="mw-badge mw-badge-outline">{u.ownershipStake || '0%'}</span>
                  </td>
                  <td>
                    <span
                      className={`mw-badge ${
                        u.status === 'Active' ? 'mw-badge-success' : 'mw-badge-danger'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: '#71717A' }}>{u.lastLogin}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="mw-btn mw-btn-outline"
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                      onClick={() => handleToggleStatus(u.id, u.status)}
                    >
                      {u.status === 'Active' ? 'Suspend Access' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Architecture Principle */}
      <div style={{ padding: '16px', background: '#FAFAFA', border: '1px solid #E4E4E7', borderRadius: '4px', fontSize: '12px', color: '#71717A' }}>
        <strong>Security Architecture Note:</strong> Subsidiary CEOs (e.g. Pavan at ZFIT) hold independent operational workspaces. Access between parent holding oversight and subsidiary management is cryptographically separated through RBAC authorization tokens.
      </div>

      {/* Provision Modal */}
      {showInviteModal && (
        <div className="mw-modal-backdrop" onClick={() => setShowInviteModal(false)}>
          <div className="mw-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mw-modal-header">
              <h3 className="mw-modal-title">Provision Parent Workspace Access</h3>
              <button className="mw-btn mw-btn-ghost" onClick={() => setShowInviteModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleInvite} className="mw-modal-body">
              <div className="mw-form-grid">
                <div className="mw-form-group">
                  <label className="mw-label">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    className="mw-input"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="mw-form-group">
                  <label className="mw-label">Corporate Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ananya.sen@zuccano.me"
                    className="mw-input"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="mw-form-grid">
                <div className="mw-form-group">
                  <label className="mw-label">Corporate Governance Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Head of Statutory Compliance"
                    className="mw-input"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  />
                </div>
                <div className="mw-form-group">
                  <label className="mw-label">System Technical Role</label>
                  <select
                    className="mw-input"
                    value={newUser.systemRole}
                    onChange={(e) => setNewUser({ ...newUser, systemRole: e.target.value })}
                  >
                    <option value="Parent Executive">Parent Executive / Authorized Officer</option>
                    <option value="Parent Shareholder">Parent Shareholder (Read-Only Equity)</option>
                    <option value="Parent Finance Officer">Parent Finance Officer</option>
                    <option value="Parent Governance Officer">Parent Governance Officer</option>
                    <option value="Parent Workspace Administrator">Parent Workspace Administrator</option>
                  </select>
                </div>
              </div>

              <div className="mw-form-group">
                <label className="mw-label">Shareholding Equity (If applicable)</label>
                <input
                  type="text"
                  placeholder="e.g. 0% (Non-shareholder)"
                  className="mw-input"
                  value={newUser.ownershipStake}
                  onChange={(e) => setNewUser({ ...newUser, ownershipStake: e.target.value })}
                />
              </div>

              <div className="mw-modal-footer">
                <button
                  type="button"
                  className="mw-btn mw-btn-ghost"
                  onClick={() => setShowInviteModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="mw-btn mw-btn-primary">
                  Issue Credentials & Access Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
