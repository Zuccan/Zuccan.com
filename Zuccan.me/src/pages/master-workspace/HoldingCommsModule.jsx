import React, { useState } from 'react';
import holdingStore from '../../lib/holdingStore';

export default function HoldingCommsModule({ holdingData }) {
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('ALL');
  const [newComm, setNewComm] = useState({
    target: 'All Subsidiaries',
    subject: '',
    sender: 'Zuccano Group Holdings Board',
    content: '',
    category: 'Corporate Notice',
  });

  const commsList = holdingData.communications || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!newComm.subject || !newComm.content) return;
    holdingStore.sendCommunication(newComm);
    setShowDispatchModal(false);
    setNewComm({
      target: 'All Subsidiaries',
      subject: '',
      sender: 'Zuccano Group Holdings Board',
      content: '',
      category: 'Corporate Notice',
    });
  };

  const filteredComms = commsList.filter((c) => {
    if (selectedRecipient === 'ALL') return true;
    return c.target.toLowerCase().includes(selectedRecipient.toLowerCase());
  });

  return (
    <div className="mw-module-stack">
      {/* Header */}
      <div className="mw-section-header">
        <div>
          <span className="mw-section-eyebrow">Holding-to-Subsidiary Channels</span>
          <h2 className="mw-section-title">Corporate Communication Center</h2>
          <p className="mw-section-subtitle">
            Formal communication bridge between parent holding directors and subsidiary CEOs for statutory notices, governance mandates, and strategic guidance.
          </p>
        </div>
        <button
          className="mw-btn mw-btn-primary"
          onClick={() => setShowDispatchModal(true)}
        >
          <span>+ Dispatch Executive Directive</span>
        </button>
      </div>

      {/* Recipient Filter */}
      <div className="mw-filter-bar">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`mw-btn ${selectedRecipient === 'ALL' ? 'mw-btn-primary' : 'mw-btn-outline'}`}
            onClick={() => setSelectedRecipient('ALL')}
          >
            All Executive Dispatches ({commsList.length})
          </button>
          <button
            className={`mw-btn ${selectedRecipient === 'ZFIT' ? 'mw-btn-primary' : 'mw-btn-outline'}`}
            onClick={() => setSelectedRecipient('ZFIT')}
          >
            ZFIT Technologies (Pavan Zuccano, CEO)
          </button>
          <button
            className={`mw-btn ${selectedRecipient === 'Consumer' ? 'mw-btn-primary' : 'mw-btn-outline'}`}
            onClick={() => setSelectedRecipient('Consumer')}
          >
            Consumer Technologies (Rohan Verma, CEO)
          </button>
          <button
            className={`mw-btn ${selectedRecipient === 'Business' ? 'mw-btn-primary' : 'mw-btn-outline'}`}
            onClick={() => setSelectedRecipient('Business')}
          >
            Business IoT (Kavita Rao, CEO)
          </button>
        </div>
      </div>

      {/* Communications Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredComms.length === 0 ? (
          <div className="mw-panel" style={{ textAlign: 'center', padding: '40px', color: '#71717A' }}>
            No executive communications found for this recipient filter.
          </div>
        ) : (
          filteredComms.map((comm) => (
            <div key={comm.id} className="mw-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="mw-badge mw-badge-neutral">{comm.target}</span>
                    <span className="mw-badge mw-badge-outline">{comm.date}</span>
                    {comm.category && <span className="mw-badge mw-badge-outline">{comm.category}</span>}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#09090B' }}>
                    {comm.subject}
                  </h3>
                </div>
                <div style={{ fontSize: '12px', color: '#71717A', textAlign: 'right' }}>
                  Dispatched by: <strong style={{ color: '#09090B' }}>{comm.sender}</strong>
                </div>
              </div>

              <div
                style={{
                  fontSize: '14px',
                  color: '#27272A',
                  lineHeight: 1.6,
                  padding: '16px',
                  background: '#FAFAFA',
                  border: '1px solid #E4E4E7',
                  borderRadius: '4px',
                  whiteSpace: 'pre-line',
                }}
              >
                {comm.content}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '12px', color: '#71717A' }}>
                <span>Certified Parent Holding Transmission • Authenticated via RoC Signatory</span>
                <span style={{ color: '#09090B', fontWeight: 500 }}>Status: Delivered to CEO Workspace</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="mw-modal-backdrop" onClick={() => setShowDispatchModal(false)}>
          <div className="mw-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mw-modal-header">
              <h3 className="mw-modal-title">Dispatch Executive Communication</h3>
              <button className="mw-btn mw-btn-ghost" onClick={() => setShowDispatchModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSend} className="mw-modal-body">
              <div className="mw-form-group">
                <label className="mw-label">Target Recipient</label>
                <select
                  className="mw-input"
                  value={newComm.target}
                  onChange={(e) => setNewComm({ ...newComm, target: e.target.value })}
                >
                  <option value="All Subsidiaries">All Operating Subsidiaries</option>
                  <option value="ZFIT Technologies">ZFIT Technologies (Pavan Zuccano, CEO)</option>
                  <option value="Zuccano Consumer Technologies">Consumer Technologies (Rohan Verma, CEO)</option>
                  <option value="Zuccano Business & Enterprise IoT">Business IoT (Kavita Rao, CEO)</option>
                </select>
              </div>

              <div className="mw-form-group">
                <label className="mw-label">Communication Subject / Directive</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Financial Close Protocol & Board Audit Deadline"
                  className="mw-input"
                  value={newComm.subject}
                  onChange={(e) => setNewComm({ ...newComm, subject: e.target.value })}
                />
              </div>

              <div className="mw-form-grid">
                <div className="mw-form-group">
                  <label className="mw-label">Sender Authority</label>
                  <input
                    type="text"
                    required
                    className="mw-input"
                    value={newComm.sender}
                    onChange={(e) => setNewComm({ ...newComm, sender: e.target.value })}
                  />
                </div>
                <div className="mw-form-group">
                  <label className="mw-label">Category</label>
                  <select
                    className="mw-input"
                    value={newComm.category}
                    onChange={(e) => setNewComm({ ...newComm, category: e.target.value })}
                  >
                    <option value="Corporate Notice">Corporate Notice</option>
                    <option value="Statutory Mandate">Statutory Mandate</option>
                    <option value="Board Resolution Directive">Board Resolution Directive</option>
                    <option value="Financial Reconciliation">Financial Reconciliation</option>
                  </select>
                </div>
              </div>

              <div className="mw-form-group">
                <label className="mw-label">Formal Directive Content</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Enter the official communication, directives, statutory timelines or requirements..."
                  className="mw-input"
                  style={{ resize: 'vertical' }}
                  value={newComm.content}
                  onChange={(e) => setNewComm({ ...newComm, content: e.target.value })}
                />
              </div>

              <div className="mw-modal-footer">
                <button
                  type="button"
                  className="mw-btn mw-btn-ghost"
                  onClick={() => setShowDispatchModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="mw-btn mw-btn-primary">
                  Transmit Executive Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
