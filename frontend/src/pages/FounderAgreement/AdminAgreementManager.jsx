import React, { useState } from 'react';
import {
  Shield,
  FileCheck,
  Clock,
  Download,
  AlertTriangle,
  Lock,
  Plus,
  Eye,
  CheckCircle2,
  X,
} from 'lucide-react';
import agreementStore, { AGREEMENT_VERSIONS } from '../../lib/agreementStore';

export const AdminAgreementManager = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('SUBMISSIONS'); // 'SUBMISSIONS' | 'VERSIONS' | 'DRAFTS'
  const submissions = agreementStore.getAllSubmissions();
  const [selectedSub, setSelectedSub] = useState(null);

  if (!isOpen) return null;

  const handleDownloadProof = (sub) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(sub, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `ZUCCANO_EXECUTION_PROOF_${sub.auditEventId}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="admin-portal-modal">
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-100 border border-neutral-300 rounded">
              <Shield size={20} className="text-red-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-900 font-serif">
                Corporate Governance & Founder Agreement Administration
              </h2>
              <p className="text-xs text-neutral-500 font-mono">
                Zuccano Parent Holding Board Depository • Audit & Version Control
              </p>
            </div>
          </div>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 border-b border-neutral-200 pb-3 mb-5">
          <button
            type="button"
            className={`action-btn-clean ${activeTab === 'SUBMISSIONS' ? 'active font-bold text-black border-black' : ''}`}
            onClick={() => setActiveTab('SUBMISSIONS')}
          >
            <FileCheck size={14} />
            <span>Executed Submissions ({submissions.length})</span>
          </button>
          <button
            type="button"
            className={`action-btn-clean ${activeTab === 'VERSIONS' ? 'active font-bold text-black border-black' : ''}`}
            onClick={() => setActiveTab('VERSIONS')}
          >
            <Lock size={14} />
            <span>Published Versions ({AGREEMENT_VERSIONS.length})</span>
          </button>
          <button
            type="button"
            className={`action-btn-clean ${activeTab === 'DRAFTS' ? 'active font-bold text-black border-black' : ''}`}
            onClick={() => setActiveTab('DRAFTS')}
          >
            <Clock size={14} />
            <span>Draft Revisions (0)</span>
          </button>
        </div>

        {/* 1. Submissions Tab */}
        {activeTab === 'SUBMISSIONS' && (
          <div>
            <div className="bg-amber-50 border border-amber-200 p-3 mb-4 rounded text-xs text-amber-900 flex items-center justify-between">
              <span>
                <strong>Immutable Record Guarantee:</strong> Executed agreements are cryptographically hashed and cannot be modified by any administrator under MCA compliance rules.
              </span>
              <span className="font-mono text-xs">Section 14 Compliance Active</span>
            </div>

            <div className="editorial-table-container">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>Audit ID</th>
                    <th>Founder Name</th>
                    <th>Entity</th>
                    <th>Version</th>
                    <th>Execution Timestamp</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.auditEventId}>
                      <td className="font-mono text-xs font-bold text-neutral-800">
                        {sub.auditEventId}
                      </td>
                      <td>
                        <strong>{sub.fullName}</strong>
                        <div className="text-xs text-neutral-500 font-mono">{sub.email}</div>
                      </td>
                      <td>{sub.assignedProduct}</td>
                      <td className="font-mono text-xs">{sub.version}</td>
                      <td className="text-xs text-neutral-600">{sub.timestampIST || sub.timestamp}</td>
                      <td>
                        <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-xs bg-green-50 px-2 py-0.5 rounded border border-green-200">
                          <CheckCircle2 size={12} /> Executed & Locked
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="action-btn-clean text-xs"
                            onClick={() => setSelectedSub(sub)}
                          >
                            <Eye size={12} />
                            <span>Inspect</span>
                          </button>
                          <button
                            type="button"
                            className="action-btn-clean text-xs"
                            onClick={() => handleDownloadProof(sub)}
                          >
                            <Download size={12} />
                            <span>Proof</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inspect Modal if clicked */}
            {selectedSub && (
              <div className="mt-4 p-4 border border-neutral-300 bg-neutral-50 rounded">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-sm uppercase tracking-wide">
                    Execution Audit Dossier — {selectedSub.auditEventId}
                  </h4>
                  <button
                    type="button"
                    className="text-xs text-neutral-500 underline"
                    onClick={() => setSelectedSub(null)}
                  >
                    Close Dossier
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-3 font-mono">
                  <div>
                    <span className="text-neutral-500 block">Cryptographic Hash:</span>
                    <span className="text-neutral-800 break-all">{selectedSub.documentHash}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Governing Jurisdictions:</span>
                    <span>{selectedSub.governingLaw}</span>
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500 text-xs block mb-1">Affirmations Verified:</span>
                  <div className="grid grid-cols-2 gap-1 text-xs text-green-800">
                    <div>✓ Complete Agreement Read</div>
                    <div>✓ Ownership & Cap Table Understood</div>
                    <div>✓ Fiduciary Responsibilities Confirmed</div>
                    <div>✓ IP Assignment Accepted</div>
                    <div>✓ Confidentiality Undertaken</div>
                    <div>✓ Exit & Dispute Protocols Agreed</div>
                    <div>✓ Independent Counsel Opportunity</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Versions Tab */}
        {activeTab === 'VERSIONS' && (
          <div>
            <div className="editorial-table-container">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>Version Number</th>
                    <th>Effective Date</th>
                    <th>Status</th>
                    <th>Legal Review & Approval</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {AGREEMENT_VERSIONS.map((v) => (
                    <tr key={v.version}>
                      <td className="font-mono font-bold text-neutral-900">{v.version}</td>
                      <td>{v.releaseDate}</td>
                      <td>
                        <span
                          className={`status-badge ${v.status === 'ACTIVE_APPROVED' ? 'executed' : 'pending'}`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td>
                        <div className="text-xs font-semibold text-neutral-800">{v.approvedBy}</div>
                        <div className="text-xs text-neutral-500">{v.legalReviewStatus}</div>
                      </td>
                      <td className="text-xs text-neutral-600">{v.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Drafts Tab */}
        {activeTab === 'DRAFTS' && (
          <div className="p-8 text-center border border-dashed border-neutral-300 rounded bg-neutral-50">
            <Lock size={32} className="mx-auto text-neutral-400 mb-2" />
            <h4 className="font-bold text-sm uppercase text-neutral-700">No Draft Revisions in Circulation</h4>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 mb-4">
              All active founders are governed under approved production version <code>v2026.1-STABLE</code>. 
              Draft modifications require formal Parent Board resolution.
            </p>
            <button
              type="button"
              className="action-btn-clean mx-auto"
              onClick={() => alert('Draft creation protocol requires Parent Board Chairman authorization.')}
            >
              <Plus size={13} />
              <span>Initiate Board Revision Resolution</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAgreementManager;
