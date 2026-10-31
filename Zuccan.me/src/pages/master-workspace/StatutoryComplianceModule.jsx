import React, { useState } from 'react';
import holdingStore from '../../lib/holdingStore';

export default function StatutoryComplianceModule({ holdingData }) {
  const [activeTab, setActiveTab] = useState('calendar');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    authority: 'Ministry of Corporate Affairs (MCA)',
    dueDate: '',
    responsibleOfficer: 'Company Secretary & Legal Counsel',
    status: 'Scheduled',
    notes: '',
  });

  const complianceList = holdingData.complianceCalendar || [];

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.dueDate) return;
    holdingStore.addComplianceEvent(newEvent);
    setShowScheduleModal(false);
    setNewEvent({
      title: '',
      authority: 'Ministry of Corporate Affairs (MCA)',
      dueDate: '',
      responsibleOfficer: 'Company Secretary & Legal Counsel',
      status: 'Scheduled',
      notes: '',
    });
  };

  const handleStatusChange = (id, newStatus) => {
    holdingStore.updateComplianceStatus(id, newStatus);
  };

  return (
    <div className="mw-module-stack">
      {/* Header */}
      <div className="mw-section-header">
        <div>
          <span className="mw-section-eyebrow">MCA, RoC & Corporate Governance</span>
          <h2 className="mw-section-title">Statutory Governance & Compliance Center</h2>
          <p className="mw-section-subtitle">
            Parent-level regulatory docket tracking RoC filings, statutory resolutions, Board of Directors sessions, and legal governance mandates.
          </p>
        </div>
        <button
          className="mw-btn mw-btn-primary"
          onClick={() => setShowScheduleModal(true)}
        >
          <span>+ Schedule Statutory Action</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="mw-tab-bar">
        <button
          className={`mw-tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Statutory Deadlines & RoC Filings ({complianceList.length})
        </button>
        <button
          className={`mw-tab-btn ${activeTab === 'board' ? 'active' : ''}`}
          onClick={() => setActiveTab('board')}
        >
          Board Meeting Agendas & Minutes
        </button>
        <button
          className={`mw-tab-btn ${activeTab === 'corporate-actions' ? 'active' : ''}`}
          onClick={() => setActiveTab('corporate-actions')}
        >
          Corporate Action History
        </button>
      </div>

      {activeTab === 'calendar' && (
        <div className="mw-panel">
          <div className="mw-panel-header">
            <div>
              <h3 className="mw-panel-title">Statutory Regulatory Calendar</h3>
              <p className="mw-panel-desc">
                Mandatory filings under Companies Act, 2013 and MCA guidelines. Each action requires authenticated legal sign-off.
              </p>
            </div>
            <span className="mw-badge mw-badge-neutral">MCA Strict Timeline</span>
          </div>

          <div className="mw-table-wrap">
            <table className="mw-table">
              <thead>
                <tr>
                  <th>Compliance Obligation</th>
                  <th>Regulatory Authority</th>
                  <th>Statutory Due Date</th>
                  <th>Responsible Officer</th>
                  <th>Filing Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complianceList.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="mw-row-primary">{item.title}</div>
                      <div className="mw-row-secondary">ID: {item.id}</div>
                    </td>
                    <td>{item.authority}</td>
                    <td>
                      <span className="mw-badge mw-badge-outline" style={{ fontWeight: 600 }}>
                        {item.dueDate}
                      </span>
                    </td>
                    <td>{item.responsibleOfficer}</td>
                    <td>
                      <span
                        className={`mw-badge ${
                          item.status === 'Filed / Compliant' || item.status === 'Completed'
                            ? 'mw-badge-success'
                            : item.status === 'In Audit Preparation' || item.status === 'Drafting'
                            ? 'mw-badge-warning'
                            : 'mw-badge-neutral'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <select
                        className="mw-input"
                        style={{ width: 'auto', display: 'inline-block', padding: '4px 8px', fontSize: '12px' }}
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="On Track">On Track</option>
                        <option value="Drafting">Drafting</option>
                        <option value="In Audit Preparation">In Audit Preparation</option>
                        <option value="Filed / Compliant">Filed / Compliant</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'board' && (
        <div className="mw-panel">
          <div className="mw-panel-header">
            <div>
              <h3 className="mw-panel-title">Zuccano Group Holdings — Board Minutes & Sittings</h3>
              <p className="mw-panel-desc">
                Record of formal parent holding board sessions, quorum verification, and resolutions passed under Section 173 of Companies Act.
              </p>
            </div>
            <span className="mw-badge mw-badge-outline">Quorum: Naseer (51%), Pavan (40%)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div style={{ border: '1px solid #E4E4E7', padding: '16px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>
                    Q2 FY26-27 Formal Board Meeting — BR-2026-08 Ratification
                  </h4>
                  <div style={{ fontSize: '12px', color: '#71717A', marginTop: '4px' }}>
                    Convened: 10 August 2026 • Registered Office, Outer Ring Road, Bengaluru
                  </div>
                </div>
                <span className="mw-badge mw-badge-success">Minutes Signed & Sealed</span>
              </div>
              <p style={{ fontSize: '13px', color: '#3F3F46', lineHeight: 1.5, margin: '8px 0' }}>
                Agenda items reviewed: Ratification of delegated senior executive appointments to subsidiary CEOs (CFO, CMO, Heads of Dept); review of optical hardware prototype timelines for ZFIT; treasury liquidity allocation for global trademark portfolios. Quorum satisfied with Naseer (Founding Director) and Pavan (Executive Director) present.
              </p>
              <div style={{ fontSize: '12px', color: '#09090B', fontWeight: 500 }}>
                Resolution Ref: <code>BR-2026-08</code> • Signatories: Naseer & Pavan
              </div>
            </div>

            <div style={{ border: '1px solid #E4E4E7', padding: '16px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>
                    Extraordinary Board Session — ZFIT Series Seed Capital Allocation
                  </h4>
                  <div style={{ fontSize: '12px', color: '#71717A', marginTop: '4px' }}>
                    Convened: 15 January 2025 • Virtual Quorum (Certified)
                  </div>
                </div>
                <span className="mw-badge mw-badge-success">Minutes Signed & Sealed</span>
              </div>
              <p style={{ fontSize: '13px', color: '#3F3F46', lineHeight: 1.5, margin: '8px 0' }}>
                Agenda items reviewed: Formal approval to execute ₹4.50 Cr equity capital infusion into ZFIT Technologies Private Limited in exchange for 51.0% equity stake held directly by Zuccano Group Holdings. Confirmation that Naseer does not personally own the stake.
              </p>
              <div style={{ fontSize: '12px', color: '#09090B', fontWeight: 500 }}>
                Resolution Ref: <code>BR-2025-01</code> • Signatories: Naseer & Pavan
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'corporate-actions' && (
        <div className="mw-panel">
          <div className="mw-panel-header">
            <div>
              <h3 className="mw-panel-title">Statutory Corporate Action Log</h3>
              <p className="mw-panel-desc">
                Historical legal actions including share allotments, charter amendments, and registered office notifications.
              </p>
            </div>
          </div>

          <div className="mw-table-wrap">
            <table className="mw-table">
              <thead>
                <tr>
                  <th>Action Date</th>
                  <th>Corporate Action</th>
                  <th>Statutory Authority</th>
                  <th>Legal Reference</th>
                  <th>Outcome</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12 Jan 2025</td>
                  <td>
                    <strong>Incorporation of Zuccano Group Holdings Pvt Ltd</strong>
                    <div className="mw-row-secondary">Authorized capital: ₹10,00,00,000</div>
                  </td>
                  <td>Registrar of Companies, Karnataka</td>
                  <td><code>CIN: U72900KA2025PTC184920</code></td>
                  <td><span className="mw-badge mw-badge-success">Incorporated</span></td>
                </tr>
                <tr>
                  <td>15 Jan 2025</td>
                  <td>
                    <strong>Execution of 51% ZFIT Holding Agreement</strong>
                    <div className="mw-row-secondary">Capital injection of ₹4,50,00,000</div>
                  </td>
                  <td>Ministry of Corporate Affairs</td>
                  <td><code>BR-2025-01</code></td>
                  <td><span className="mw-badge mw-badge-success">Registered</span></td>
                </tr>
                <tr>
                  <td>10 Feb 2025</td>
                  <td>
                    <strong>Establishment of Consumer & Business IoT Subsidiaries</strong>
                    <div className="mw-row-secondary">100% direct parent holding</div>
                  </td>
                  <td>Registrar of Companies, Karnataka</td>
                  <td><code>BR-2025-04</code></td>
                  <td><span className="mw-badge mw-badge-success">Incorporated</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="mw-modal-backdrop" onClick={() => setShowScheduleModal(false)}>
          <div className="mw-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mw-modal-header">
              <h3 className="mw-modal-title">Schedule Statutory Obligation</h3>
              <button className="mw-btn mw-btn-ghost" onClick={() => setShowScheduleModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className="mw-modal-body">
              <div className="mw-form-group">
                <label className="mw-label">Statutory Compliance Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Secretarial Audit Report (Form MR-3)"
                  className="mw-input"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>

              <div className="mw-form-grid">
                <div className="mw-form-group">
                  <label className="mw-label">Regulatory Authority</label>
                  <input
                    type="text"
                    required
                    className="mw-input"
                    value={newEvent.authority}
                    onChange={(e) => setNewEvent({ ...newEvent, authority: e.target.value })}
                  />
                </div>
                <div className="mw-form-group">
                  <label className="mw-label">Statutory Due Date</label>
                  <input
                    type="date"
                    required
                    className="mw-input"
                    value={newEvent.dueDate}
                    onChange={(e) => setNewEvent({ ...newEvent, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="mw-form-grid">
                <div className="mw-form-group">
                  <label className="mw-label">Responsible Officer / Firm</label>
                  <input
                    type="text"
                    required
                    className="mw-input"
                    value={newEvent.responsibleOfficer}
                    onChange={(e) => setNewEvent({ ...newEvent, responsibleOfficer: e.target.value })}
                  />
                </div>
                <div className="mw-form-group">
                  <label className="mw-label">Initial Status</label>
                  <select
                    className="mw-input"
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Drafting">Drafting</option>
                    <option value="In Audit Preparation">In Audit Preparation</option>
                    <option value="On Track">On Track</option>
                  </select>
                </div>
              </div>

              <div className="mw-modal-footer">
                <button
                  type="button"
                  className="mw-btn mw-btn-ghost"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="mw-btn mw-btn-primary">
                  Record Filing Obligation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
