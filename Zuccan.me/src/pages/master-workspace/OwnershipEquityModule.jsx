import React, { useState } from 'react';
import {
  PieChart,
  Shield,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  X,
  Lock,
  Calendar,
} from 'lucide-react';

import holdingStore from '../../lib/holdingStore';

export const OwnershipEquityModule = ({ data, holdingData, onRecordTransaction }) => {
  const currentData = data || holdingData || holdingStore.getData();
  const {
    identity = {},
    parentCapTable = [],
    subsidiaries = [],
    ownershipTransactions = [],
  } = currentData || {};
  const [showTransferModal, setShowTransferModal] = useState(false);

  const [txForm, setTxForm] = useState({
    entity: 'Zuccano Group Holdings',
    transferor: 'Zuccano Treasury',
    transferee: '',
    shares: 10000,
    parValue: '₹10 per share',
    resolutionRef: 'BR-2026-BOARD',
    authorizedBy: 'Board of Directors Resolution',
    supportingDocument: 'Share_Transfer_Deed_SH4.pdf',
  });

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!txForm.transferee || !txForm.shares) return;

    onRecordTransaction(txForm);
    setShowTransferModal(false);
    setTxForm({
      entity: 'Zuccano Group Holdings',
      transferor: 'Zuccano Treasury',
      transferee: '',
      shares: 10000,
      parValue: '₹10 per share',
      resolutionRef: 'BR-2026-BOARD',
      authorizedBy: 'Board of Directors Resolution',
      supportingDocument: 'Share_Transfer_Deed_SH4.pdf',
    });
  };

  return (
    <div className="holding-equity-view">
      {/* ── Header ── */}
      <div className="ceo-module-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#E3262E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Statutory Corporate Cap Table & Equity Ledger
            </span>
            <span style={{ color: '#D4D4D8' }}>•</span>
            <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 600 }}>
              Authorized Capital: {identity.currencySymbol}{(identity.authorizedCapital / 10000000).toFixed(2)} Cr
            </span>
          </div>
          <h1 className="ceo-module-title">Ownership & Equity Architecture</h1>
          <p className="ceo-module-desc">
            Definitive legal shareholding registry for Zuccano Group Holdings and operating subsidiaries. Direct editing is strictly prohibited; all equity changes require documented board resolutions.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          style={{ background: '#09090B' }}
          onClick={() => setShowTransferModal(true)}
        >
          <Lock size={13} />
          <span>Record Authorized Share Transfer</span>
        </button>
      </div>

      {/* ── Governance Warning: Ownership vs Roles Distinction ── */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E4E4E7',
          borderLeft: '4px solid #09090B',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginBottom: '1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <Shield size={18} style={{ color: '#09090B', marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
            <strong>Corporate Law Distinction:</strong> Shareholding, directorship, and executive roles are legally distinct.
            <br />
            • <strong>Naseer (51%)</strong> is the majority shareholder of Zuccano Holding. He does <em>NOT</em> personally own 51% of ZFIT; the 51% stake is owned by Zuccano itself.
            <br />
            • <strong>Pavan (40%)</strong> is a parent director/shareholder and independently acts as the appointed CEO of ZFIT.
            <br />
            • <strong>Remaining ZFIT Equity (49%)</strong> is unconfigured in the registry and must not be fabricated.
          </div>
        </div>
      </div>

      {/* ── SECTION 1: ZUCCANO PARENT HOLDING CAP TABLE ── */}
      <div className="cap-table-box">
        <div className="cap-table-header">
          <div className="ceo-table-title">
            <PieChart size={15} style={{ color: '#09090B' }} />
            <span>Zuccano Group Holdings — Master Cap Table</span>
            <span className="ceo-table-count">100.0% Allocated</span>
          </div>
          <span style={{ fontSize: '0.74rem', color: '#71717A' }}>
            Paid-Up Shares: <strong>{identity.totalShares.toLocaleString()} Equity Shares</strong>
          </span>
        </div>

        {/* Visual Cap Bar */}
        <div style={{ padding: '0 1.25rem' }}>
          <div className="cap-bar-wrapper">
            <div className="cap-bar-segment cap-bar-naseer" style={{ width: '51%' }} title="Naseer: 51%" />
            <div className="cap-bar-segment cap-bar-pavan" style={{ width: '40%' }} title="Pavan: 40%" />
            <div className="cap-bar-segment cap-bar-other" style={{ width: '9%' }} title="Other: 9%" />
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Shareholder Name</th>
              <th>Corporate Capacity</th>
              <th>Equity Stake (%)</th>
              <th>Shares Allocated</th>
              <th>Share Class</th>
              <th>Certificate #</th>
              <th>Authorized Signatory</th>
            </tr>
          </thead>
          <tbody>
            {parentCapTable.map((sh) => (
              <tr key={sh.id}>
                <td>
                  <strong style={{ color: '#09090B', fontSize: '0.88rem' }}>{sh.name}</strong>
                  <div style={{ fontSize: '0.68rem', color: '#71717A', maxWidth: '320px' }}>
                    {sh.notes}
                  </div>
                </td>
                <td>
                  <span className="badge-neutral">{sh.role}</span>
                </td>
                <td>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: sh.percentage === 51 ? '#09090B' : '#E3262E' }}>
                    {sh.percentage.toFixed(1)}%
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{sh.shares.toLocaleString()}</td>
                <td style={{ fontSize: '0.74rem', color: '#52525B' }}>{sh.shareClass}</td>
                <td style={{ fontSize: '0.72rem', color: '#71717A' }}>{sh.certificateNumber}</td>
                <td>
                  {sh.authorizedSignatory ? (
                    <span className="badge-active">✓ Board Signatory</span>
                  ) : (
                    <span className="badge-neutral">Non-Signatory</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── SECTION 2: SUBSIDIARY OWNERSHIP BREAKDOWN ── */}
      <div className="cap-table-box">
        <div className="cap-table-header">
          <div className="ceo-table-title">
            <Shield size={15} style={{ color: '#09090B' }} />
            <span>Subsidiary Equity & Ownership Holdings</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Subsidiary Entity</th>
              <th>Zuccano Holding Stake</th>
              <th>Legal Holding Entity</th>
              <th>Remaining Ownership Structure</th>
              <th>Cap Table Status</th>
            </tr>
          </thead>
          <tbody>
            {subsidiaries.map((sub) => (
              <tr key={sub.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{sub.name}</strong>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>CEO: {sub.ceoName}</div>
                </td>
                <td>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: sub.zuccanoOwnership === 51 ? '#E3262E' : '#16A34A' }}>
                    {sub.zuccanoOwnership}%
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>Zuccano Group Holdings Ltd.</span>
                  <div style={{ fontSize: '0.68rem', color: '#71717A' }}>
                    Corporate investment (not personal shareholding)
                  </div>
                </td>
                <td>
                  {sub.otherOwnershipConfigured ? (
                    <span style={{ color: '#52525B' }}>100% Wholly Owned by Zuccano</span>
                  ) : (
                    <div>
                      <strong style={{ color: '#D97706' }}>49% — Not Yet Configured</strong>
                      <div style={{ fontSize: '0.68rem', color: '#71717A' }}>
                        Awaiting subsidiary founder/board allocation
                      </div>
                    </div>
                  )}
                </td>
                <td>
                  <span className={sub.otherOwnershipConfigured ? 'badge-active' : 'badge-pending'}>
                    {sub.otherOwnershipConfigured ? 'Fully Reconciled' : 'Partial / Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── SECTION 3: OWNERSHIP TRANSACTION AUDIT LEDGER ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <span>Historical Ownership & Share Transfer Audit Trail</span>
            <span className="ceo-table-count">{ownershipTransactions.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Tx ID & Date</th>
              <th>Entity</th>
              <th>Transfer Type</th>
              <th>Transferor ➔ Transferee</th>
              <th>Shares & Par Value</th>
              <th>Board Resolution Ref</th>
              <th>Authorized By</th>
              <th>Supporting Instrument</th>
            </tr>
          </thead>
          <tbody>
            {ownershipTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>
                  <div style={{ fontWeight: 700 }}>{tx.id}</div>
                  <div style={{ fontSize: '0.68rem', color: '#71717A' }}>{tx.date}</div>
                </td>
                <td>{tx.entity}</td>
                <td>
                  <span className="badge-neutral">{tx.type}</span>
                </td>
                <td>
                  <div style={{ fontSize: '0.74rem' }}>{tx.transferor} ➔</div>
                  <div style={{ fontWeight: 600 }}>{tx.transferee}</div>
                </td>
                <td>
                  {tx.shares.toLocaleString()} Shares
                  <div style={{ fontSize: '0.68rem', color: '#71717A' }}>{tx.parValue}</div>
                </td>
                <td>
                  <span className="badge-active" style={{ fontSize: '0.68rem' }}>{tx.resolutionRef}</span>
                </td>
                <td>{tx.authorizedBy}</td>
                <td style={{ color: '#2563EB', fontSize: '0.72rem' }}>{tx.supportingDocument}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── RECORD SHARE TRANSACTION MODAL ── */}
      {showTransferModal && (
        <div className="holding-modal-overlay" onClick={() => setShowTransferModal(false)}>
          <div className="holding-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="holding-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                Record Authorized Share Transaction
              </h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setShowTransferModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleTransferSubmit}>
              <div className="holding-modal-body">
                <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', padding: '0.75rem', borderRadius: '6px', fontSize: '0.76rem', color: '#92400E' }}>
                  ⚠️ <strong>Statutory Requirement:</strong> Share transfers must be executed pursuant to a valid Board Resolution and verified under Form SH-4. Casual edits are prevented.
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Entity</label>
                  <select
                    className="ceo-form-select"
                    value={txForm.entity}
                    onChange={(e) => setTxForm({ ...txForm, entity: e.target.value })}
                  >
                    <option value="Zuccano Group Holdings">Zuccano Group Holdings Ltd.</option>
                    <option value="ZFIT Technologies">ZFIT Technologies Pvt Ltd.</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Transferor (Source)</label>
                    <input
                      type="text"
                      required
                      className="ceo-form-input"
                      value={txForm.transferor}
                      onChange={(e) => setTxForm({ ...txForm, transferor: e.target.value })}
                    />
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Transferee (Recipient)</label>
                    <input
                      type="text"
                      required
                      className="ceo-form-input"
                      placeholder="e.g. Employee Stock Trust"
                      value={txForm.transferee}
                      onChange={(e) => setTxForm({ ...txForm, transferee: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Number of Shares</label>
                    <input
                      type="number"
                      required
                      className="ceo-form-input"
                      value={txForm.shares}
                      onChange={(e) => setTxForm({ ...txForm, shares: Number(e.target.value) })}
                    />
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Board Resolution Ref #</label>
                    <input
                      type="text"
                      required
                      className="ceo-form-input"
                      value={txForm.resolutionRef}
                      onChange={(e) => setTxForm({ ...txForm, resolutionRef: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Supporting Deed Document Ref</label>
                  <input
                    type="text"
                    className="ceo-form-input"
                    value={txForm.supportingDocument}
                    onChange={(e) => setTxForm({ ...txForm, supportingDocument: e.target.value })}
                  />
                </div>
              </div>

              <div className="holding-modal-footer">
                <button
                  type="button"
                  className="ceo-action-btn-outline"
                  onClick={() => setShowTransferModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ceo-action-btn-red" style={{ background: '#09090B' }}>
                  Ratify Share Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnershipEquityModule;
