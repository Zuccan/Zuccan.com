import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
  MessageSquare,
  X,
} from 'lucide-react';

import holdingStore from '../../lib/holdingStore';

export const ParentApprovalsModule = ({ data, holdingData, onUpdateApprovalStatus }) => {
  const currentData = data || holdingData || holdingStore.getData();
  const { parentApprovals = [], identity = {} } = currentData || {};
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [reviewComment, setReviewComment] = useState('');

  const filteredApprovals = (parentApprovals || []).filter(
    (a) => statusFilter === 'All' || a.status === statusFilter
  );

  const handleDecision = (approvalId, newStatus) => {
    onUpdateApprovalStatus(approvalId, newStatus, reviewComment || `Board of Directors ratifies status: ${newStatus}`);
    setSelectedApproval(null);
    setReviewComment('');
  };

  return (
    <div className="holding-approvals-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Parent Holding Board Approvals Queue</h1>
          <p className="ceo-module-desc">
            Governance decision center. Review and ratify matters strictly reserved for Zuccano Parent Holding Board authorization: international IP filings, intercompany capital disbursements, subsidiary incorporations, and cap table modifications.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-active">Board Quorum Active</span>
        </div>
      </div>

      {/* ── Status Tabs ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        {['All', 'Pending', 'Under Review', 'Approved', 'Rejected'].map((status) => (
          <button
            key={status}
            type="button"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.74rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: '1px solid',
              borderColor: statusFilter === status ? '#09090B' : '#E4E4E7',
              background: statusFilter === status ? '#09090B' : '#FFFFFF',
              color: statusFilter === status ? '#FFFFFF' : '#52525B',
              cursor: 'pointer',
            }}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ── Approvals Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Shield size={15} style={{ color: '#09090B' }} />
            <span>Reserved Board Decision Matters</span>
            <span className="ceo-table-count">{filteredApprovals.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Governance Matter / Request</th>
              <th>Requesting Entity</th>
              <th>Requested By</th>
              <th>Date</th>
              <th>Financial Impact</th>
              <th>Supporting Instrument</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Board Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApprovals.map((appr) => (
              <tr key={appr.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{appr.title}</strong>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>
                    Category: {appr.category}
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{appr.requestingCompany}</span>
                </td>
                <td style={{ fontSize: '0.74rem', color: '#52525B' }}>{appr.requestedBy}</td>
                <td style={{ fontSize: '0.72rem', color: '#71717A' }}>{appr.date}</td>
                <td>
                  {appr.financialImpact > 0 ? (
                    <strong style={{ color: '#09090B' }}>
                      {identity.currencySymbol}{(appr.financialImpact / 100000).toFixed(1)} Lakhs
                    </strong>
                  ) : (
                    <span style={{ color: '#71717A' }}>—</span>
                  )}
                </td>
                <td style={{ color: '#2563EB', fontSize: '0.72rem' }}>
                  {appr.supportingDocument}
                </td>
                <td>
                  {appr.status === 'Approved' && <span className="badge-active">Approved</span>}
                  {appr.status === 'Under Review' && <span className="badge-review">Under Review</span>}
                  {appr.status === 'Pending' && <span className="badge-pending">Pending</span>}
                  {appr.status === 'Rejected' && <span className="badge-rejected">Rejected</span>}
                </td>
                <td style={{ textAlign: 'right' }}>
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
                    onClick={() => setSelectedApproval(appr)}
                  >
                    Examine Matter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── EXAMINE MATTER MODAL ── */}
      {selectedApproval && (
        <div className="holding-modal-overlay" onClick={() => setSelectedApproval(null)}>
          <div className="holding-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="holding-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                Parent Board Decision Dossier
              </h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setSelectedApproval(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="holding-modal-body">
              <div>
                <span className="badge-review" style={{ marginBottom: '4px' }}>{selectedApproval.status}</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', margin: '4px 0' }}>
                  {selectedApproval.title}
                </h4>
                <div style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  Entity: <strong>{selectedApproval.requestingCompany}</strong> • Submitted: {selectedApproval.date} by {selectedApproval.requestedBy}
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '6px', fontSize: '0.8rem', lineHeight: 1.5 }}>
                <strong style={{ display: 'block', color: '#09090B', marginBottom: '4px' }}>Matter Description:</strong>
                {selectedApproval.description}
                {selectedApproval.financialImpact > 0 && (
                  <div style={{ marginTop: '8px', color: '#09090B', fontWeight: 600 }}>
                    Financial Disbursement: {identity.currencySymbol}{(selectedApproval.financialImpact / 100000).toFixed(1)} Lakhs
                  </div>
                )}
              </div>

              {selectedApproval.reviewHistory && selectedApproval.reviewHistory.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#71717A', textTransform: 'uppercase' }}>
                    Prior Review History:
                  </span>
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {selectedApproval.reviewHistory.map((h, i) => (
                      <div key={i} style={{ fontSize: '0.74rem', color: '#52525B', background: '#FAFAFA', padding: '4px 8px', borderRadius: '4px' }}>
                        <strong>{h.reviewer}</strong> ({h.date}): {h.comment}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="ceo-form-group">
                <label className="ceo-form-label">Board Decision Minute / Rationale:</label>
                <textarea
                  className="ceo-form-textarea"
                  placeholder="Record formal board rationale or instructions for subsidiary execution..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>
            </div>

            <div className="holding-modal-footer">
              <button
                type="button"
                style={{
                  background: '#FEE2E2',
                  color: '#DC2626',
                  border: '1px solid #FECACA',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={() => handleDecision(selectedApproval.id, 'Rejected')}
              >
                Reject Matter
              </button>

              <button
                type="button"
                style={{
                  background: '#FFFBEB',
                  color: '#D97706',
                  border: '1px solid #FEF3C7',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={() => handleDecision(selectedApproval.id, 'More Information Required')}
              >
                Request Clarification
              </button>

              <button
                type="button"
                className="ceo-action-btn-red"
                style={{ background: '#16A34A' }}
                onClick={() => handleDecision(selectedApproval.id, 'Approved')}
              >
                Ratify & Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentApprovalsModule;
