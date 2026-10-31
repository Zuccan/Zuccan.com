import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Crown,
  Shield,
  Layers,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  Mail,
  Phone,
  Calendar,
  Network,
  List,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const LeadershipModule = ({ data, onAppointLeadership, onRemoveLeadership }) => {
  const { leadership, departments } = data;
  const [viewMode, setViewMode] = useState('tree'); // 'tree' | 'table'
  const [showAppointModal, setShowAppointModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    roleType: 'CFO',
    designation: 'Chief Financial Officer (CFO)',
    department: departments[0]?.name || 'Executive Office',
    email: '',
    phone: '',
    reportingTo: 'Pavan Zuccano (CEO)',
    responsibilities: '',
  });

  const handleRoleTypeChange = (role) => {
    let designation = '';
    if (role === 'CFO') designation = 'Chief Financial Officer (CFO)';
    else if (role === 'CMO') designation = 'Chief Marketing Officer (CMO)';
    else if (role === 'Department Head') designation = `Head of ${formData.department}`;
    else if (role === 'VP') designation = 'Vice President of Engineering';
    else designation = 'Senior Director';

    setFormData({
      ...formData,
      roleType: role,
      designation,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onAppointLeadership({
      name: formData.name,
      roleType: formData.roleType,
      designation: formData.designation,
      department: formData.department,
      email: formData.email,
      phone: formData.phone || '+91 98450 00000',
      reportingTo: formData.reportingTo,
      responsibilities: formData.responsibilities || 'Oversees departmental initiatives and reports to Subsidiary CEO.',
    });

    setShowAppointModal(false);
    setFormData({
      name: '',
      roleType: 'CFO',
      designation: 'Chief Financial Officer (CFO)',
      department: departments[0]?.name || 'Executive Office',
      email: '',
      phone: '',
      reportingTo: 'Pavan Zuccano (CEO)',
      responsibilities: '',
    });
  };

  // Hierarchy Tree Nodes
  const ceoNode = leadership.find((m) => m.roleType === 'CEO') || leadership[0];
  const cLevelNodes = leadership.filter((m) => m.roleType === 'CFO' || m.roleType === 'CMO');
  const deptHeads = leadership.filter((m) => m.roleType === 'Department Head' || (m.roleType !== 'CEO' && m.roleType !== 'CFO' && m.roleType !== 'CMO'));

  return (
    <div className="ceo-leadership-view">
      {/* ── Top Header Bar ── */}
      <div className="ceo-module-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E3262E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Autonomous Executive Governance
            </span>
            <span style={{ color: '#D4D4D8' }}>•</span>
            <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 600 }}>
              ✓ Delegated Authority Active (No Parent Pre-Approval Required)
            </span>
          </div>
          <h1 className="ceo-module-title">Leadership & Governance Structure</h1>
          <p className="ceo-module-desc">
            As Subsidiary CEO, you possess full authority to independently appoint a CFO, CMO, and Department Heads, restructure executive teams, define mandates, and manage organizational hierarchy.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', background: '#F4F4F5', padding: '3px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: '4px',
                background: viewMode === 'tree' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'tree' ? '#09090B' : '#71717A',
                cursor: 'pointer',
                boxShadow: viewMode === 'tree' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
              onClick={() => setViewMode('tree')}
            >
              <Network size={13} />
              <span>Org Chart Tree</span>
            </button>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: '4px',
                background: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'table' ? '#09090B' : '#71717A',
                cursor: 'pointer',
                boxShadow: viewMode === 'table' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
              onClick={() => setViewMode('table')}
            >
              <List size={13} />
              <span>Directory Table</span>
            </button>
          </div>

          <button
            type="button"
            className="ceo-action-btn-red"
            onClick={() => setShowAppointModal(true)}
          >
            <UserPlus size={14} />
            <span>Appoint Leadership Member</span>
          </button>
        </div>
      </div>

      {/* ── Governance Authority Banner ── */}
      <div
        style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={18} style={{ color: '#09090B' }} />
          <div style={{ fontSize: '0.8rem', color: '#334155' }}>
            <strong>CEO Operational Charter:</strong> Subsidiary CEO appoints, promotes, and assigns responsibilities without requiring Zuccano parent board vote. Parent company receives quarterly governance audits.
          </div>
        </div>
        <span className="badge-active">Charter v2.4 Enforced</span>
      </div>

      {/* ── VIEW 1: ORGANIZATIONAL HIERARCHY TREE ── */}
      {viewMode === 'tree' && (
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '12px',
            padding: '2rem 1.5rem',
            overflowX: 'auto',
            marginBottom: '1.75rem',
          }}
        >
          {/* Level 1: CEO Node */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '320px',
                background: '#09090B',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                border: '2px solid #E3262E',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', fontWeight: 700, color: '#F87171', textTransform: 'uppercase', marginBottom: '4px' }}>
                <Crown size={12} />
                <span>Subsidiary Chief Executive</span>
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>{ceoNode?.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#A1A1AA', marginTop: '2px' }}>
                {ceoNode?.designation}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#71717A', marginTop: '6px', borderTop: '1px solid #27272A', paddingTop: '6px' }}>
                Reports to: Zuccano Parent Holding Board
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div style={{ width: '2px', height: '32px', background: '#CBD5E1' }} />

            {/* Level 2: C-Suite (CFO & CMO) */}
            <div style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
              {cLevelNodes.map((cMember) => (
                <div key={cMember.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '2px', height: '16px', background: '#CBD5E1' }} />
                  <div
                    style={{
                      width: '260px',
                      background: '#FFFFFF',
                      border: '1px solid #E4E4E7',
                      borderRadius: '8px',
                      padding: '0.85rem 1rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span className="badge-active">{cMember.roleType}</span>
                      <span style={{ fontSize: '0.68rem', color: '#71717A' }}>{cMember.department}</span>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#09090B' }}>{cMember.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#52525B' }}>{cMember.designation}</div>
                    <div style={{ fontSize: '0.68rem', color: '#71717A', marginTop: '6px', borderTop: '1px solid #F4F4F5', paddingTop: '4px' }}>
                      {cMember.email}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting Vertical Stem to Dept Heads */}
            <div style={{ width: '2px', height: '32px', background: '#CBD5E1' }} />

            {/* Level 3: Department Heads & VPs */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {deptHeads.map((dh) => (
                <div key={dh.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '2px', height: '16px', background: '#CBD5E1' }} />
                  <div
                    style={{
                      width: '240px',
                      background: '#FAFAFA',
                      border: '1px solid #E4E4E7',
                      borderRadius: '8px',
                      padding: '0.85rem 1rem',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span className="badge-neutral">{dh.roleType}</span>
                      <button
                        type="button"
                        style={{ border: 'none', background: 'none', color: '#A1A1AA', cursor: 'pointer', padding: '2px' }}
                        title="Deactivate role"
                        onClick={() => onRemoveLeadership(dh.id)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#09090B' }}>{dh.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#52525B', marginBottom: '4px' }}>{dh.designation}</div>
                    <div style={{ fontSize: '0.68rem', color: '#71717A' }}>Dept: {dh.department}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW 2: LEADERSHIP TABLE DIRECTORY ── */}
      {viewMode === 'table' && (
        <div className="ceo-table-container">
          <div className="ceo-table-header-bar">
            <div className="ceo-table-title">
              <Users size={15} style={{ color: '#09090B' }} />
              <span>Full Leadership Roster</span>
              <span className="ceo-table-count">{leadership.length}</span>
            </div>
          </div>

          <table className="ceo-table">
            <thead>
              <tr>
                <th>Executive</th>
                <th>Designation & Role</th>
                <th>Department</th>
                <th>Reporting Manager</th>
                <th>Authority / Appointed By</th>
                <th>Contact</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leadership.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '6px',
                          background: m.roleType === 'CEO' ? '#09090B' : '#E4E4E7',
                          color: m.roleType === 'CEO' ? '#FFFFFF' : '#09090B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                        }}
                      >
                        {m.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#09090B' }}>{m.name}</div>
                        <div style={{ fontSize: '0.68rem', color: '#71717A' }}>Joined {m.joinDate}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{m.designation}</div>
                    <span className={m.roleType === 'CEO' ? 'badge-active' : 'badge-neutral'}>{m.roleType}</span>
                  </td>
                  <td>{m.department}</td>
                  <td style={{ color: '#52525B' }}>{m.reportingTo}</td>
                  <td>
                    <span style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: 600 }}>
                      {m.appointedBy}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.74rem' }}>{m.email}</div>
                    <div style={{ fontSize: '0.7rem', color: '#71717A' }}>{m.phone}</div>
                  </td>
                  <td>
                    <span className="badge-active">{m.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {m.roleType !== 'CEO' ? (
                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#DC2626',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                        title="Deactivate Leadership Member"
                        onClick={() => onRemoveLeadership(m.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: '#A1A1AA' }}>Parent Mandate</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── APPOINT LEADERSHIP MODAL ── */}
      {showAppointModal && (
        <div className="ceo-modal-overlay" onClick={() => setShowAppointModal(false)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Appoint Subsidiary Leadership Member</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setShowAppointModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ceo-modal-body">
                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', fontSize: '0.76rem', color: '#334155' }}>
                  ℹ️ <strong>CEO Authority:</strong> This appointment will be enacted immediately in the subsidiary registry under your delegated executive authority.
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Leadership Tier / Role Category</label>
                  <select
                    className="ceo-form-select"
                    value={formData.roleType}
                    onChange={(e) => handleRoleTypeChange(e.target.value)}
                  >
                    <option value="CFO">Chief Financial Officer (CFO)</option>
                    <option value="CMO">Chief Marketing Officer (CMO)</option>
                    <option value="Department Head">Department Head</option>
                    <option value="VP">Vice President (VP)</option>
                    <option value="Senior Director">Senior Director</option>
                  </select>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. Ramesh V. Raman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Official Designation Title</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Assigned Department</label>
                  <select
                    className="ceo-form-select"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>{d.name} ({d.code})</option>
                    ))}
                    <option value="Executive Office">Executive Office</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Corporate Email</label>
                    <input
                      type="email"
                      required
                      className="ceo-form-input"
                      placeholder="executive@zfit.zuccano.me"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Phone Number</label>
                    <input
                      type="text"
                      className="ceo-form-input"
                      placeholder="+91 98450 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Reporting Manager</label>
                  <input
                    type="text"
                    className="ceo-form-input"
                    value={formData.reportingTo}
                    onChange={(e) => setFormData({ ...formData, reportingTo: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Key Executive Mandate & Responsibilities</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="Define core operational objectives and departmental oversight responsibilities..."
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  />
                </div>
              </div>

              <div className="ceo-modal-footer">
                <button
                  type="button"
                  className="ceo-action-btn-outline"
                  onClick={() => setShowAppointModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ceo-action-btn-red">
                  Enact Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipModule;
