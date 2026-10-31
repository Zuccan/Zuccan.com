import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Plus,
  Crown,
  Users,
  Shield,
  ExternalLink,
  ArrowRight,
  FileText,
  Clock,
  PieChart,
  Edit,
  X,
  CheckCircle2,
} from 'lucide-react';

import holdingStore from '../../lib/holdingStore';

export const SubsidiaryDirectoryModule = ({
  data,
  holdingData,
  onCreateSubsidiary,
  onUpdateSubsidiary,
  selectedSubsidiaryId,
  onSelectSubsidiary,
}) => {
  const navigate = useNavigate();
  const currentData = data || holdingData || holdingStore.getData();
  const { subsidiaries = [], parentApprovals = [] } = currentData || {};

  const [activeSubId, setActiveSubId] = useState(selectedSubsidiaryId || subsidiaries[0]?.id || 'zfit');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newSub, setNewSub] = useState({
    name: '',
    shortName: '',
    cin: '',
    ceoName: '',
    ceoEmail: '',
    zuccanoOwnership: 100,
    fiscalBudget: 20000000,
    tagline: '',
    description: '',
  });

  const selectedSub = subsidiaries.find((s) => s.id === activeSubId) || subsidiaries[0];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newSub.name || !newSub.shortName || !newSub.ceoName) return;

    onCreateSubsidiary({
      name: newSub.name,
      shortName: newSub.shortName,
      cin: newSub.cin || `U72900KA2026PTC${Math.floor(100000 + Math.random() * 900000)}`,
      ceoName: newSub.ceoName,
      ceoEmail: newSub.ceoEmail || `ceo.${newSub.shortName.toLowerCase()}@zuccano.me`,
      zuccanoOwnership: Number(newSub.zuccanoOwnership),
      otherOwnershipConfigured: Number(newSub.zuccanoOwnership) === 100,
      otherOwnershipNotes: Number(newSub.zuccanoOwnership) === 100 ? 'Wholly owned subsidiary' : 'Remaining equity held by local founders/unconfigured.',
      fiscalBudget: Number(newSub.fiscalBudget),
      tagline: newSub.tagline || 'Subsidiary of Zuccano Group Holdings.',
      description: newSub.description || 'Autonomous operating company within Zuccano corporate ecosystem.',
    });

    setShowCreateModal(false);
    setNewSub({
      name: '',
      shortName: '',
      cin: '',
      ceoName: '',
      ceoEmail: '',
      zuccanoOwnership: 100,
      fiscalBudget: 20000000,
      tagline: '',
      description: '',
    });
  };

  const subApprovals = parentApprovals.filter(
    (a) => a.requestingCompany.toLowerCase().includes(selectedSub.shortName.toLowerCase())
  );

  return (
    <div className="holding-subsidiaries-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Corporate Subsidiaries & Companies Directory</h1>
          <p className="ceo-module-desc">
            Central registry of all corporate entities governed under Zuccano Holding Group. Inspect subsidiary cap tables, appointed CEOs, incorporation charters, and submitted governance disclosures.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          style={{ background: '#E3262E' }}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={14} />
          <span>Incorporate New Subsidiary</span>
        </button>
      </div>

      {/* ── Subsidiary Selector Tabs ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
        {subsidiaries.map((sub) => (
          <button
            key={sub.id}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: activeSubId === sub.id ? '#09090B' : '#E4E4E7',
              background: activeSubId === sub.id ? '#09090B' : '#FFFFFF',
              color: activeSubId === sub.id ? '#FFFFFF' : '#09090B',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeSubId === sub.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            }}
            onClick={() => setActiveSubId(sub.id)}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                background: activeSubId === sub.id ? '#FFFFFF' : '#09090B',
                color: activeSubId === sub.id ? '#09090B' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.68rem',
              }}
            >
              {sub.shortName.slice(0, 2)}
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.84rem' }}>{sub.shortName}</span>
            <span
              style={{
                fontSize: '0.68rem',
                padding: '1px 5px',
                borderRadius: '4px',
                background: activeSubId === sub.id ? '#27272A' : '#F4F4F5',
                color: activeSubId === sub.id ? '#E4E4E7' : '#52525B',
              }}
            >
              {sub.zuccanoOwnership}% Stake
            </span>
          </button>
        ))}
      </div>

      {/* ── Active Subsidiary Profile Dossier ── */}
      {selectedSub && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Identity & CEO Card */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4E4E7',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: '#09090B',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.25rem',
                  }}
                >
                  {selectedSub.shortName.slice(0, 2)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#09090B' }}>
                      {selectedSub.name}
                    </h2>
                    <span className="badge-active">{selectedSub.status}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
                    CIN: <strong>{selectedSub.cin}</strong> • Incorporated: {selectedSub.incorporationDate}
                  </div>
                </div>
              </div>

              {/* Action: Open Management Workspace */}
              <button
                type="button"
                className="ceo-action-btn-red"
                onClick={() => navigate(`/workspace/${selectedSub.id}`)}
              >
                <span>Open {selectedSub.shortName} Workspace</span>
                <ExternalLink size={13} />
              </button>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
              {selectedSub.description}
            </p>

            {/* Core Parameters Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', borderTop: '1px solid #F4F4F5', paddingTop: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#71717A', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  Appointed Subsidiary CEO
                </span>
                <strong style={{ fontSize: '0.92rem', color: '#09090B', display: 'block' }}>
                  {selectedSub.ceoName}
                </strong>
                <span style={{ fontSize: '0.72rem', color: '#52525B' }}>{selectedSub.ceoEmail}</span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: '#71717A', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  Zuccano Holding Stake
                </span>
                <strong style={{ fontSize: '1.15rem', color: '#E3262E' }}>
                  {selectedSub.zuccanoOwnership}% Equity
                </strong>
                <span style={{ fontSize: '0.7rem', color: '#71717A', display: 'block' }}>
                  {selectedSub.id === 'zfit' ? 'Owned by Zuccano (Not personal)' : 'Wholly owned by Parent'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: '#71717A', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  Other Ownership Structure
                </span>
                <strong style={{ fontSize: '0.86rem', color: '#09090B', display: 'block' }}>
                  {selectedSub.otherOwnershipConfigured ? '100% Parent Owned' : '49% Unconfigured in Registry'}
                </strong>
                <span style={{ fontSize: '0.7rem', color: '#71717A', display: 'block' }}>
                  {selectedSub.otherOwnershipNotes}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: '#71717A', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  Subsidiary Headcount
                </span>
                <strong style={{ fontSize: '0.92rem', color: '#09090B', display: 'block' }}>
                  {selectedSub.headcount} Engineers & Staff
                </strong>
                <span style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: 600 }}>Autonomous Internal Hiring</span>
              </div>
            </div>
          </div>

          {/* Submitted Governance Reports & Parent Approvals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
            {/* Latest Report from Subsidiary */}
            <div className="ceo-table-container">
              <div className="ceo-table-header-bar">
                <div className="ceo-table-title">
                  <FileText size={15} style={{ color: '#09090B' }} />
                  <span>Latest Report Transmitted by {selectedSub.shortName} CEO</span>
                </div>
              </div>

              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge-active">Board Certified</span>
                  <span style={{ fontSize: '0.72rem', color: '#71717A' }}>Transmitted on {selectedSub.lastReportDate}</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', margin: '0 0 8px' }}>
                  {selectedSub.lastReportTitle}
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.5, margin: '0 0 1rem' }}>
                  Breakthrough optical tracking latency below 16ms achieved on Rockchip silicon. Capex utilization in bounds at 63%. Requesting board sign-off for international patent filing.
                </p>
                <div style={{ borderTop: '1px solid #F4F4F5', paddingTop: '0.75rem', fontSize: '0.74rem', color: '#71717A' }}>
                  Signatory: <strong>{selectedSub.ceoName} (CEO)</strong>
                </div>
              </div>
            </div>

            {/* Parent-Level Approvals for this Subsidiary */}
            <div className="ceo-table-container">
              <div className="ceo-table-header-bar">
                <div className="ceo-table-title">
                  <Shield size={15} style={{ color: '#09090B' }} />
                  <span>Parent-Level Decisions & Requests</span>
                  <span className="ceo-table-count">{subApprovals.length}</span>
                </div>
              </div>

              <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {subApprovals.map((appr) => (
                  <div
                    key={appr.id}
                    style={{
                      border: '1px solid #E4E4E7',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      background: '#FAFAFA',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span className={appr.status === 'Approved' ? 'badge-active' : 'badge-review'}>
                        {appr.status}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#71717A' }}>{appr.date}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#09090B' }}>
                      {appr.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── INCORPORATE SUBSIDIARY MODAL ── */}
      {showCreateModal && (
        <div className="holding-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="holding-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="holding-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Incorporate New Subsidiary Entity</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="holding-modal-body">
                <div className="ceo-form-group">
                  <label className="ceo-form-label">Legal Entity Name</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. Zuccano Robotics & Automation Private Limited"
                    value={newSub.name}
                    onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Short Acronym / Code</label>
                    <input
                      type="text"
                      required
                      className="ceo-form-input"
                      placeholder="e.g. ROBOTICS"
                      value={newSub.shortName}
                      onChange={(e) => setNewSub({ ...newSub, shortName: e.target.value })}
                    />
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Zuccano Holding Ownership (%)</label>
                    <input
                      type="number"
                      required
                      className="ceo-form-input"
                      placeholder="e.g. 51 or 100"
                      value={newSub.zuccanoOwnership}
                      onChange={(e) => setNewSub({ ...newSub, zuccanoOwnership: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Appointed Subsidiary CEO</label>
                    <input
                      type="text"
                      required
                      className="ceo-form-input"
                      placeholder="e.g. Anand K. Varma"
                      value={newSub.ceoName}
                      onChange={(e) => setNewSub({ ...newSub, ceoName: e.target.value })}
                    />
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">CEO Corporate Email</label>
                    <input
                      type="email"
                      required
                      className="ceo-form-input"
                      placeholder="ceo.robotics@zuccano.me"
                      value={newSub.ceoEmail}
                      onChange={(e) => setNewSub({ ...newSub, ceoEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Authorized Seed Budget (₹)</label>
                  <input
                    type="number"
                    className="ceo-form-input"
                    value={newSub.fiscalBudget}
                    onChange={(e) => setNewSub({ ...newSub, fiscalBudget: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Subsidiary Mission & Scope</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="Define core industry focus and operational charter..."
                    value={newSub.description}
                    onChange={(e) => setNewSub({ ...newSub, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="holding-modal-footer">
                <button
                  type="button"
                  className="ceo-action-btn-outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ceo-action-btn-red" style={{ background: '#E3262E' }}>
                  Register Subsidiary Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubsidiaryDirectoryModule;
