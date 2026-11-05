import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  FileText,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Lock,
  ArrowRight,
  User,
  Building,
  Calendar,
  Check,
  Eye,
  Settings,
} from 'lucide-react';
import agreementStore, { AGREEMENT_SECTIONS, AGREEMENT_VERSIONS } from '../../lib/agreementStore';
import authService from '../../lib/authService';
import OwnershipTable from './OwnershipTable';
import SignaturePad from './SignaturePad';
import AdminAgreementManager from './AdminAgreementManager';
import './FounderAgreement.css';

export const FounderAgreementPortal = () => {
  // Current logged in user or default demo profile
  const currentUser = authService.getCurrentUser() || {
    id: 'founder_demo_01',
    fullName: 'Pavan Zuccano',
    email: 'pavan.ceo@zfit.zuccano.me',
    role: 'CEO & Co-Founding Shareholder',
    product: 'zfit',
  };

  const userId = currentUser.id || 'default_founder';
  const [userProgress, setUserProgress] = useState(() => agreementStore.getUserProgress(userId));
  const [activeSectionId, setActiveSectionId] = useState('sec-01');
  const [showPlainLanguage, setShowPlainLanguage] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Form State for Final Acceptance
  const [signerForm, setSignerForm] = useState({
    fullName: currentUser.fullName || 'Pavan Zuccano',
    email: currentUser.email || 'pavan.ceo@zfit.zuccano.me',
    assignedProduct: currentUser.product === 'zfit' ? 'ZFIT Technologies' : 'Zuccano Group Holdings',
    governmentId: 'AAAPZ9845K',
    signatureData: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [currentHashPreview, setCurrentHashPreview] = useState('Calculating SHA-256...');

  // Scroll spy & section active sync
  useEffect(() => {
    agreementStore.markSectionOpened(userId, activeSectionId);
    setUserProgress(agreementStore.getUserProgress(userId));
  }, [activeSectionId, userId]);

  // Compute live hash preview
  useEffect(() => {
    const calcHash = async () => {
      const rep = JSON.stringify({
        version: 'v2026.1-STABLE',
        sections: AGREEMENT_SECTIONS.length,
        signer: signerForm.fullName,
        email: signerForm.email,
        assignedProduct: signerForm.assignedProduct,
      });
      const hash = await agreementStore.computeDocumentHash(rep);
      setCurrentHashPreview(`sha256:${hash.substring(0, 32)}...`);
    };
    calcHash();
  }, [signerForm.fullName, signerForm.email, signerForm.assignedProduct]);

  // Completion calculation
  const totalSections = AGREEMENT_SECTIONS.length;
  const acknowledgedCount = userProgress.acknowledgedSections.length;
  const progressPercent = Math.round((acknowledgedCount / totalSections) * 100);

  // Affirmations check
  const allAffirmationsChecked = Object.values(userProgress.affirmations).every(Boolean);
  const allSectionsAcknowledged = acknowledgedCount === totalSections;
  const canSubmit = allSectionsAcknowledged && allAffirmationsChecked && Boolean(signerForm.signatureData);

  // Handle Section Acknowledgment Toggle
  const handleToggleAcknowledge = (sectionId) => {
    const updated = agreementStore.toggleSectionAcknowledgement(userId, sectionId);
    setUserProgress(updated);
  };

  // Handle Affirmation Toggle
  const handleAffirmationChange = (key) => {
    const updatedAffirmations = {
      ...userProgress.affirmations,
      [key]: !userProgress.affirmations[key],
    };
    const updated = agreementStore.updateAffirmations(userId, updatedAffirmations);
    setUserProgress(updated);
  };

  // Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!canSubmit) {
      if (!allSectionsAcknowledged) {
        setSubmitError(`Please review and acknowledge all 15 sections (${acknowledgedCount}/${totalSections} acknowledged).`);
      } else if (!allAffirmationsChecked) {
        setSubmitError('Please review and check all 7 legal affirmations.');
      } else if (!signerForm.signatureData) {
        setSubmitError('Please draw or type your digital signature.');
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const record = await agreementStore.submitAgreementAcceptance({
        userId,
        fullName: signerForm.fullName,
        email: signerForm.email,
        assignedProduct: signerForm.assignedProduct,
        governmentId: signerForm.governmentId,
        signatureType: 'DIGITAL_CANVAS',
        signatureData: signerForm.signatureData,
        version: 'v2026.1-STABLE',
      });

      setUserProgress(agreementStore.getUserProgress(userId));
      // Scroll to certificate
      const certEl = document.getElementById('execution-certificate-anchor');
      if (certEl) certEl.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err.message || 'Execution submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const activeSection = AGREEMENT_SECTIONS.find((s) => s.id === activeSectionId) || AGREEMENT_SECTIONS[0];

  return (
    <div className="zuccano-agreement-portal">
      {/* 1. Portal Masthead */}
      <header className="portal-masthead">
        <div className="masthead-inner">
          <div className="masthead-brand">
            <a href="/" className="brand-mark">
              ZUCCANO<span className="brand-mark-dot">.</span>
            </a>
            <div className="brand-divider" />
            <span className="doc-type-label">Corporate Governance & Founder Policy</span>
          </div>

          <div className="masthead-actions">
            <button
              type="button"
              className={`action-btn-clean ${showPlainLanguage ? 'active font-bold text-black' : ''}`}
              onClick={() => setShowPlainLanguage(!showPlainLanguage)}
              title="Toggle plain language summaries"
            >
              <HelpCircle size={14} />
              <span>{showPlainLanguage ? 'Hide Plain Explanations' : 'Show Plain Explanations'}</span>
            </button>

            <button
              type="button"
              className="action-btn-clean"
              onClick={handlePrint}
              title="Print official agreement or save to PDF"
            >
              <Printer size={14} />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              className="admin-mode-pill"
              onClick={() => setShowAdminModal(true)}
              title="Open Zuccano Board Administration"
            >
              <Settings size={13} />
              <span>Board Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Page Introduction & Hero */}
      <section className="doc-intro-hero">
        <div className="hero-wrapper">
          <div className="doc-pre-title">ZUCCANO GROUP HOLDINGS PRIVATE LIMITED</div>
          <h1 className="doc-main-title">FOUNDER AGREEMENT & GOVERNANCE POLICY</h1>
          <p className="doc-quote">"Building together requires clarity."</p>

          <p className="doc-supporting-text">
            This agreement establishes the principles, rights, responsibilities, and governance rules applicable to founders participating in Zuccano and its product companies. Please review every section carefully before submitting your acknowledgement.
          </p>

          {/* Metadata Strip */}
          <div className="doc-metadata-grid">
            <div className="metadata-item">
              <span className="meta-label">Agreement Version</span>
              <span className="meta-value font-mono">v2026.1-STABLE</span>
            </div>

            <div className="metadata-item">
              <span className="meta-label">Publication Date</span>
              <span className="meta-value">01 November 2026</span>
            </div>

            <div className="metadata-item">
              <span className="meta-label">Assigned Entity</span>
              <span className="meta-value font-semibold">{signerForm.assignedProduct}</span>
            </div>

            <div className="metadata-item">
              <span className="meta-label">Founder Identity</span>
              <span className="meta-value">{signerForm.fullName}</span>
            </div>

            <div className="metadata-item">
              <span className="meta-label">Agreement Status</span>
              <span
                className={`status-badge ${
                  userProgress.status === 'EXECUTED'
                    ? 'executed'
                    : userProgress.status === 'IN_REVIEW'
                    ? 'in-review'
                    : 'pending'
                }`}
              >
                {userProgress.status === 'EXECUTED'
                  ? 'Signed & Executed'
                  : userProgress.status === 'IN_REVIEW'
                  ? 'In Review'
                  : 'Pending Review'}
              </span>
            </div>

            <div className="metadata-item progress-container">
              <div className="flex justify-between items-center text-xs">
                <span className="meta-label">Review Progress</span>
                <span className="font-mono font-bold text-neutral-800">
                  {acknowledgedCount} of {totalSections} ({progressPercent}%)
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main 2-Column Body Layout */}
      <div className="portal-body">
        {/* Left: Persistent Sidebar Navigation */}
        <aside className="portal-sidebar">
          <div className="sidebar-header">
            <h3>Table of Contents</h3>
            <span className="sidebar-completion-stat">
              {acknowledgedCount}/{totalSections}
            </span>
          </div>

          <ul className="sidebar-nav-list">
            {AGREEMENT_SECTIONS.map((sec) => {
              const isAcknowledged = userProgress.acknowledgedSections.includes(sec.id);
              const isActive = activeSectionId === sec.id;

              return (
                <li key={sec.id}>
                  <button
                    type="button"
                    className={`nav-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSectionId(sec.id);
                      const el = document.getElementById(sec.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="nav-item-left">
                      <span className="nav-number">{sec.number}</span>
                      <span className="nav-title">{sec.title}</span>
                    </div>

                    <span
                      className={`nav-status-indicator ${
                        isAcknowledged ? 'acknowledged' : 'pending'
                      }`}
                    >
                      {isAcknowledged ? '✓' : '○'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-500 font-mono">
            <div>Jurisdiction: Bengaluru, India</div>
            <div>Governing: Companies Act, 2013</div>
          </div>
        </aside>

        {/* Right: Editorial Document Reading Pane */}
        <main className="portal-document-pane">
          {AGREEMENT_SECTIONS.map((sec) => {
            const isAcknowledged = userProgress.acknowledgedSections.includes(sec.id);

            return (
              <article key={sec.id} id={sec.id} className="document-section-card">
                <div className="section-top-indicator">
                  <span className="section-number-tag">
                    SECTION {sec.number} • GOVERNANCE CHARTER
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold ${
                      isAcknowledged ? 'text-green-700' : 'text-neutral-400'
                    }`}
                  >
                    {isAcknowledged ? 'Acknowledged' : 'Pending Review'}
                  </span>
                </div>

                <h2 className="section-heading">{sec.title}</h2>
                <p className="section-summary-lead">{sec.summary}</p>

                {/* Optional Plain Language Explainer */}
                {showPlainLanguage && sec.plainLanguage && (
                  <div className="plain-language-box">
                    <div className="explainer-header">
                      <HelpCircle size={14} />
                      <span>Plain-Language Summary (Informational)</span>
                    </div>
                    <p className="explainer-body">{sec.plainLanguage}</p>
                  </div>
                )}

                {/* Section Specific Custom Insert (Section 03 Ownership Transparency) */}
                {sec.id === 'sec-03' && <OwnershipTable />}

                {/* Legal Clauses List */}
                <div className="clauses-container">
                  {sec.clauses.map((clause) => (
                    <div
                      key={clause.ref}
                      className={`legal-clause-block ${clause.highlight ? 'highlighted' : ''}`}
                    >
                      <div className="clause-header">
                        <span className="clause-ref">[{clause.ref}]</span>
                        <h3 className="clause-title">{clause.title}</h3>
                      </div>
                      <p className="clause-body">{clause.text}</p>
                    </div>
                  ))}
                </div>

                {sec.specificNotes && (
                  <div className="section-specific-note">
                    <strong>Applicability Note:</strong> {sec.specificNotes}
                  </div>
                )}

                {/* Section Review Acknowledgement Bar */}
                <div className="section-acknowledgement-bar">
                  <label className="ack-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isAcknowledged}
                      onChange={() => handleToggleAcknowledge(sec.id)}
                    />
                    <span>I have reviewed and acknowledge Section {sec.number}: {sec.title}</span>
                  </label>

                  <span className={`ack-status-tag ${isAcknowledged ? 'verified' : ''}`}>
                    {isAcknowledged ? 'Status: Verified' : 'Status: Unverified'}
                  </span>
                </div>
              </article>
            );
          })}

          {/* =================================================================
              SECTION 15 EXECUTION BLOCK / CERTIFICATE OF EXECUTION
             ================================================================= */}
          <div id="execution-certificate-anchor">
            {userProgress.status === 'EXECUTED' && userProgress.submissionRecord ? (
              /* Already Executed Certificate View */
              <div className="executed-certificate-container">
                <div className="cert-header">
                  <span className="cert-badge">Tamper-Evident Corporate Instrument</span>
                  <h2 className="cert-title">CERTIFICATE OF FOUNDER AGREEMENT EXECUTION</h2>
                  <p className="text-xs text-neutral-500 font-mono mt-1">
                    Registered in the Zuccano Board Depository under MCA & IT Act, 2000
                  </p>
                </div>

                <div className="cert-grid">
                  <div>
                    <div className="cert-item-label">Audit Event ID</div>
                    <div className="cert-item-value font-mono text-red-800">
                      {userProgress.submissionRecord.auditEventId}
                    </div>
                  </div>

                  <div>
                    <div className="cert-item-label">Execution Timestamp</div>
                    <div className="cert-item-value">
                      {userProgress.submissionRecord.timestampIST}
                    </div>
                  </div>

                  <div>
                    <div className="cert-item-label">Executing Founder</div>
                    <div className="cert-item-value">{userProgress.submissionRecord.fullName}</div>
                    <div className="text-xs text-neutral-500 font-mono">
                      {userProgress.submissionRecord.email}
                    </div>
                  </div>

                  <div>
                    <div className="cert-item-label">Assigned Subsidiary</div>
                    <div className="cert-item-value">
                      {userProgress.submissionRecord.assignedProduct}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="cert-item-label">SHA-256 Document Fingerprint</div>
                    <div className="cert-item-mono">
                      {userProgress.submissionRecord.documentHash}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="cert-item-label">Affirmations Verified</div>
                    <div className="text-xs text-neutral-700 grid grid-cols-2 gap-1 font-mono">
                      <span>✓ Complete Agreement Reviewed</span>
                      <span>✓ Ownership & Equity Understood</span>
                      <span>✓ Fiduciary Roles Accepted</span>
                      <span>✓ IP Ownership Assigned</span>
                      <span>✓ Confidentiality Undertaken</span>
                      <span>✓ Dispute Resolution Bound</span>
                      <span>✓ Independent Advice Confirmed</span>
                    </div>
                  </div>
                </div>

                <div className="cert-signature-box">
                  <div>
                    <div className="cert-item-label">Electronic Signature Record</div>
                    <img
                      src={userProgress.submissionRecord.signatureData}
                      alt="Signer Digital Signature"
                      className="sig-image-render"
                    />
                    <div className="text-xs text-neutral-500 font-mono mt-1">
                      Signer: {userProgress.submissionRecord.fullName}
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="action-btn-clean"
                      onClick={handlePrint}
                    >
                      <Download size={14} />
                      <span>Download Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Pending Final Execution Screen */
              <div className="final-execution-card">
                <h2 className="execution-title">Final Agreement Review & Electronic Execution</h2>
                <p className="execution-desc">
                  To complete your formal onboarding, confirm every statutory affirmation below, verify your identity details, provide your digital signature, and submit your acceptance.
                </p>

                {/* The 7 Mandatory Legal Affirmations */}
                <div className="affirmations-list">
                  <label
                    className={`affirmation-item ${
                      userProgress.affirmations.reviewedComplete ? 'checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={userProgress.affirmations.reviewedComplete}
                      onChange={() => handleAffirmationChange('reviewedComplete')}
                    />
                    <span className="affirmation-text">
                      1. I have reviewed the complete agreement, comprising all 15 individually navigable sections.
                    </span>
                  </label>

                  <label
                    className={`affirmation-item ${
                      userProgress.affirmations.ownershipUnderstood ? 'checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={userProgress.affirmations.ownershipUnderstood}
                      onChange={() => handleAffirmationChange('ownershipUnderstood')}
                    />
                    <span className="affirmation-text">
                      2. I understand the ownership and equity terms applicable to me, including parent holding cap tables and subsidiary architecture.
                    </span>
                  </label>

                  <label
                    className={`affirmation-item ${
                      userProgress.affirmations.responsibilitiesUnderstood ? 'checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={userProgress.affirmations.responsibilitiesUnderstood}
                      onChange={() => handleAffirmationChange('responsibilitiesUnderstood')}
                    />
                    <span className="affirmation-text">
                      3. I understand my responsibilities, fiduciary duty of care under Section 166 of the Companies Act, and operational decision-making authority.
                    </span>
                  </label>

                  <label
                    className={`affirmation-item ${
                      userProgress.affirmations.ipProvisionsUnderstood ? 'checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={userProgress.affirmations.ipProvisionsUnderstood}
                      onChange={() => handleAffirmationChange('ipProvisionsUnderstood')}
                    />
                    <span className="affirmation-text">
                      4. I understand and irrevocably agree to the intellectual property provisions and comprehensive invention assignment to Zuccano.
                    </span>
                  </label>

                  <label
                    className={`affirmation-item ${
                      userProgress.affirmations.confidentialityUnderstood ? 'checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={userProgress.affirmations.confidentialityUnderstood}
                      onChange={() => handleAffirmationChange('confidentialityUnderstood')}
                    />
                    <span className="affirmation-text">
                      5. I understand the confidentiality, non-disclosure, and DPDP Act, 2023 data compliance obligations.
                    </span>
                  </label>

                  <label
                    className={`affirmation-item ${
                      userProgress.affirmations.exitDisputeUnderstood ? 'checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={userProgress.affirmations.exitDisputeUnderstood}
                      onChange={() => handleAffirmationChange('exitDisputeUnderstood')}
                    />
                    <span className="affirmation-text">
                      6. I understand the exit provisions (Good/Bad Leaver distinctions) and mandatory 30-day mediation / Bengaluru arbitration procedures.
                    </span>
                  </label>

                  <label
                    className={`affirmation-item ${
                      userProgress.affirmations.independentAdviceConfirmed ? 'checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={userProgress.affirmations.independentAdviceConfirmed}
                      onChange={() => handleAffirmationChange('independentAdviceConfirmed')}
                    />
                    <span className="affirmation-text">
                      7. I have had the full opportunity to ask questions, examine records, and obtain independent legal and financial advice before executing.
                    </span>
                  </label>
                </div>

                {/* Identity Collection Form */}
                <div className="signer-identity-grid">
                  <div className="input-field-group">
                    <label>Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={signerForm.fullName}
                      onChange={(e) => setSignerForm({ ...signerForm, fullName: e.target.value })}
                      placeholder="e.g., Pavan Zuccano"
                    />
                  </div>

                  <div className="input-field-group">
                    <label>Assigned Product / Subsidiary</label>
                    <select
                      value={signerForm.assignedProduct}
                      onChange={(e) =>
                        setSignerForm({ ...signerForm, assignedProduct: e.target.value })
                      }
                    >
                      <option value="ZFIT Technologies">ZFIT Technologies</option>
                      <option value="Zuccano Group Holdings">Zuccano Group Holdings Private Limited</option>
                      <option value="Zuccano Retail Ventures">Zuccano Retail Ventures</option>
                      <option value="Zuccano Media Lab">Zuccano Media Lab</option>
                    </select>
                  </div>

                  <div className="input-field-group">
                    <label>Official Corporate Email</label>
                    <input
                      type="email"
                      required
                      value={signerForm.email}
                      onChange={(e) => setSignerForm({ ...signerForm, email: e.target.value })}
                    />
                  </div>

                  <div className="input-field-group">
                    <label>Government Identification (PAN / DIN)</label>
                    <input
                      type="text"
                      value={signerForm.governmentId}
                      onChange={(e) => setSignerForm({ ...signerForm, governmentId: e.target.value })}
                      placeholder="e.g. AAAPZ9845K"
                    />
                  </div>
                </div>

                {/* Signature Pad */}
                <SignaturePad
                  defaultValue={signerForm.signatureData}
                  onSignatureChange={(sig) => setSignerForm({ ...signerForm, signatureData: sig })}
                />

                {/* Document Integrity Hash Preview */}
                <div className="crypto-hash-preview">
                  <div className="hash-label-group">
                    <span className="hash-title">Cryptographic Document Fingerprint</span>
                    <span className="hash-value">{currentHashPreview}</span>
                  </div>
                  <div className="text-xs font-mono text-neutral-500">
                    SHA-256 Validated
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="button"
                  className="final-submit-btn"
                  disabled={!canSubmit || isSubmitting}
                  onClick={handleSubmit}
                >
                  <Lock size={16} />
                  <span>
                    {isSubmitting
                      ? 'Cryptographically Executing & Archiving...'
                      : 'Execute & Formally Submit Founder Acceptance'}
                  </span>
                </button>

                {!canSubmit && (
                  <p className="submit-lock-notice">
                    {!allSectionsAcknowledged
                      ? `⚠️ Please acknowledge all 15 sections (${acknowledgedCount}/15 acknowledged).`
                      : !allAffirmationsChecked
                      ? '⚠️ Please review and check all 7 legal affirmations.'
                      : !signerForm.signatureData
                      ? '⚠️ Please draw or type your digital signature above.'
                      : ''}
                  </p>
                )}

                {submitError && (
                  <p className="text-red-700 text-sm font-semibold text-center mt-3">
                    {submitError}
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Admin Management Modal */}
      <AdminAgreementManager
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
    </div>
  );
};

export default FounderAgreementPortal;
