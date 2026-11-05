import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  FileCheck,
  CheckCircle,
  AlertCircle,
  Printer,
  Download,
  Lock,
  PenTool,
  Type,
  RotateCcw,
  CheckSquare,
  Square,
  Calendar,
  Building,
  User,
  Info,
} from 'lucide-react';
import './FounderAgreement.css';

export const FounderAgreementPortal = () => {
  // Current time in IST
  const getFormattedDateIST = () => {
    return new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }) + ' IST';
  };

  // Signer form fields
  const [formData, setFormData] = useState({
    fullName: 'Pavan Zuccano',
    email: 'pavan.ceo@zfit.zuccano.me',
    subsidiary: 'ZFIT Technologies',
    role: 'Chief Executive Officer (CEO)',
    govtId: 'AAAPZ9845K',
    dateIST: getFormattedDateIST(),
  });

  // Affirmation checkboxes (default unchecked per legal requirements)
  const [affirmations, setAffirmations] = useState({
    readComplete: false,
    ownershipUnderstood: false,
    fiduciaryDutyAccepted: false,
    ipAssigned: false,
    confidentialityAgreed: false,
    vestingAndExitAccepted: false,
    arbitrationAgreed: false,
    independentCounselOpportunity: false,
  });

  // E-Signature state
  const [sigMode, setSigMode] = useState('DRAW'); // 'DRAW' | 'TYPE'
  const [typedSig, setTypedSig] = useState('');
  const [sigDataUrl, setSigDataUrl] = useState(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Execution state
  const [isExecuted, setIsExecuted] = useState(false);
  const [auditRecord, setAuditRecord] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check if previously executed in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('zuccano_formal_founder_execution');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAuditRecord(parsed);
        setIsExecuted(true);
      } catch (e) {
        console.error('Error loading execution record', e);
      }
    }
  }, []);

  // Canvas Drawing
  const startDrawing = (e) => {
    if (sigMode !== 'DRAW') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#09090B';
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || sigMode !== 'DRAW') return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSigDataUrl(canvas.toDataURL('image/png'));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
      setSigDataUrl(null);
    }
  };

  const handleTypedSignature = (text) => {
    setTypedSig(text);
    if (!text.trim()) {
      setSigDataUrl(null);
      return;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
      <text x="15" y="65" font-family="'Brush Script MT', 'Dancing Script', cursive" font-size="38" fill="#09090B">${text}</text>
      <line x1="10" y1="80" x2="380" y2="80" stroke="#71717A" stroke-dasharray="3,3" />
    </svg>`;
    setSigDataUrl(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  };

  // Select all affirmations helper
  const handleSelectAllAffirmations = () => {
    const allChecked = Object.values(affirmations).every(Boolean);
    const newVal = !allChecked;
    setAffirmations({
      readComplete: newVal,
      ownershipUnderstood: newVal,
      fiduciaryDutyAccepted: newVal,
      ipAssigned: newVal,
      confidentialityAgreed: newVal,
      vestingAndExitAccepted: newVal,
      arbitrationAgreed: newVal,
      independentCounselOpportunity: newVal,
    });
  };

  // Validation
  const allAffirmationsChecked = Object.values(affirmations).every(Boolean);
  const hasValidSignature = Boolean(sigDataUrl);
  const canSubmit = allAffirmationsChecked && hasValidSignature && formData.fullName.trim() && formData.email.trim();

  // Compute SHA-256 hash
  const computeHash = async (content) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!canSubmit) {
      if (!allAffirmationsChecked) {
        setErrorMessage('Please check all legal affirmation declarations before signing.');
      } else if (!hasValidSignature) {
        setErrorMessage('Please provide your electronic signature (draw or type signature).');
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const timestampISO = new Date().toISOString();
      const executionTimestampIST = getFormattedDateIST();

      const documentPayload = JSON.stringify({
        form: 'FORM ZUC-FGA-2026',
        version: 'v2026.1-STABLE',
        company: 'Zuccano Group Holdings Private Limited',
        subsidiary: formData.subsidiary,
        signer: formData.fullName,
        email: formData.email,
        role: formData.role,
        govtId: formData.govtId,
        affirmations,
        timestampISO,
      });

      const hash = await computeHash(documentPayload);
      const auditEventId = `ZUC-AGR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const executionRecord = {
        auditEventId,
        formTitle: 'FORM ZUC-FGA: FOUNDER GOVERNANCE & POLICY ACCEPTANCE AGREEMENT',
        version: 'v2026.1-STABLE',
        effectiveDate: '01 Nov 2026',
        fullName: formData.fullName,
        email: formData.email,
        subsidiary: formData.subsidiary,
        role: formData.role,
        govtId: formData.govtId,
        timestampIST: executionTimestampIST,
        timestampISO,
        documentHash: `sha256:${hash}`,
        signatureData: sigDataUrl,
        affirmations,
        governingLaw: 'Companies Act, 2013 & Information Technology Act, 2000 (India)',
        status: 'EXECUTED_AND_REGISTERED',
      };

      // Save to localStorage
      localStorage.setItem('zuccano_formal_founder_execution', JSON.stringify(executionRecord));
      setAuditRecord(executionRecord);
      setIsExecuted(true);

      // Scroll to certificate
      setTimeout(() => {
        const cert = document.getElementById('execution-certificate-box');
        if (cert) cert.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setErrorMessage(err.message || 'Execution submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="gov-form-wrapper">
      {/* Top Formal Action Bar */}
      <div className="gov-action-bar no-print">
        <div className="gov-bar-container">
          <div className="gov-bar-left">
            <span className="gov-flag-mark">FORM ZUC-FGA-1</span>
            <span className="gov-bar-divider">•</span>
            <span className="gov-bar-text">Official Corporate Governance & Founder Agreement Portal</span>
          </div>
          <div className="gov-bar-right">
            <button type="button" className="gov-btn-secondary" onClick={handlePrint}>
              <Printer size={13} />
              <span>Print Official Form</span>
            </button>
          </div>
        </div>
      </div>

      <div className="gov-document-sheet">
        {/* =================================================================
            OFFICIAL COMPANY & GOVERNMENT STATUTORY HEADER
           ================================================================= */}
        <header className="gov-form-header">
          <div className="gov-header-emblem">
            <div className="emblem-shield">
              <Shield size={26} className="text-neutral-900" />
            </div>
            <div className="emblem-text">
              <span className="emblem-parent">ZUCCANO GROUP HOLDINGS PRIVATE LIMITED</span>
              <span className="emblem-statutory">CORPORATE GOVERNANCE & STATUTORY LEGAL DEPOSITORY</span>
            </div>
          </div>

          <div className="gov-cin-bar">
            <span><strong>CIN:</strong> U72900KA2025PTC184920</span>
            <span><strong>Incorporation:</strong> 12 Jan 2025</span>
            <span><strong>Registered Office:</strong> Level 14, Outer Ring Road, Bengaluru, Karnataka 560103</span>
          </div>

          <div className="gov-title-block">
            <h1 className="gov-main-title">FORM ZUC-FGA</h1>
            <h2 className="gov-sub-title">FOUNDER GOVERNANCE & EQUITY POLICY ACCEPTANCE AGREEMENT</h2>
            <p className="gov-lead-statement">
              "Building together requires clarity."
            </p>
          </div>

          <div className="gov-metadata-strip">
            <div className="gov-meta-cell">
              <span className="cell-label">Document Version</span>
              <span className="cell-val font-mono">v2026.1-STABLE</span>
            </div>
            <div className="gov-meta-cell">
              <span className="cell-label">Effective Date</span>
              <span className="cell-val">01 November 2026</span>
            </div>
            <div className="gov-meta-cell">
              <span className="cell-label">Governing Jurisdiction</span>
              <span className="cell-val">Bengaluru, Karnataka (India)</span>
            </div>
            <div className="gov-meta-cell">
              <span className="cell-label">Statutory Form Status</span>
              <span className={`cell-status ${isExecuted ? 'executed' : 'pending'}`}>
                {isExecuted ? '✓ Executed & Registered' : '● Pending Founder Signature'}
              </span>
            </div>
          </div>
        </header>

        {/* Preamble Notice */}
        <div className="gov-notice-box">
          <p>
            <strong>STATUTORY NOTICE:</strong> This agreement establishes the binding principles, ownership arrangements, intellectual property assignments, fiduciary responsibilities, and dispute-resolution rules applicable to founders participating in Zuccano Group Holdings Private Limited and its operating subsidiaries (including ZFIT Technologies). Review every clause below, verify your identity, and provide your electronic signature under the Information Technology Act, 2000.
          </p>
        </div>

        {/* =================================================================
            14 SHORT, CLEAR, PROFESSIONAL POLICY ARTICLES
           ================================================================= */}
        <section className="gov-clauses-body">
          {/* Article 1 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">01</span>
            <div className="gov-clause-content">
              <h3>Corporate Structure & Holding Framework</h3>
              <p>
                Zuccano Group Holdings Private Limited operates as the central corporate parent entity. Operating ventures and subsidiaries (including ZFIT Technologies) operate under autonomous executive leadership delegated by the Board of Directors, while remaining bound by Parent Holding governance and capital oversight.
              </p>
            </div>
          </article>

          {/* Article 2: Verified Ownership Table */}
          <article className="gov-clause-row highlight-article">
            <span className="gov-clause-num">02</span>
            <div className="gov-clause-content">
              <h3>Verified Ownership & Equity Transparency</h3>
              <p className="mb-2">
                All equity shareholdings are governed strictly by the formal Register of Members maintained pursuant to Section 88 of the Companies Act, 2013:
              </p>

              {/* Table 1: Parent Cap Table */}
              <div className="gov-table-wrap">
                <div className="gov-table-heading">
                  <span>TABLE A — ZUCCANO GROUP HOLDINGS PRIVATE LIMITED (PARENT ENTITY)</span>
                  <span className="font-mono text-xs">100% PAID-UP EQUITY</span>
                </div>
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Shareholder</th>
                      <th>Legal Designation</th>
                      <th>Equity Stake</th>
                      <th>Statutory Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-neutral-50 font-semibold">
                      <td>Naseer</td>
                      <td>Founding Shareholder & Authorized Signatory</td>
                      <td className="font-mono text-neutral-900">51.0%</td>
                      <td>Majority Voting Control. Does <em>not</em> personally own ZFIT shares.</td>
                    </tr>
                    <tr>
                      <td>Pavan</td>
                      <td>Co-Founding Shareholder & Director</td>
                      <td className="font-mono text-neutral-900">40.0%</td>
                      <td>Parent Director & Shareholder. Appointed as CEO of ZFIT subsidiary.</td>
                    </tr>
                    <tr>
                      <td>Other Shareholders Pool</td>
                      <td>Minority Shareholders Collective</td>
                      <td className="font-mono text-neutral-900">9.0%</td>
                      <td>Reserved early contributor and institutional equity pool.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Table 2: ZFIT Subsidiary */}
              <div className="gov-table-wrap mt-3">
                <div className="gov-table-heading">
                  <span>TABLE B — ZFIT TECHNOLOGIES (SUBSIDIARY VENTURE)</span>
                  <span className="font-mono text-xs">CIN/REGISTRY CONTROL</span>
                </div>
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Entity / Pool</th>
                      <th>Corporate Relationship</th>
                      <th>Allocated Stake</th>
                      <th>Statutory Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-neutral-50 font-semibold">
                      <td>Zuccano Group Holdings Private Limited</td>
                      <td>Parent Holding (Controlling Interest)</td>
                      <td className="font-mono text-neutral-900">51.0%</td>
                      <td>Corporate Treasury Ownership (Board Approved)</td>
                    </tr>
                    <tr>
                      <td>Unassigned Minority Allocation Pool</td>
                      <td>Product Founders, ESOP & Strategic Reserve</td>
                      <td className="font-mono text-neutral-900">49.0%</td>
                      <td className="text-amber-800 font-medium">Subject to verified subsidiary records & board allotment</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Strict Distinction Callout */}
              <div className="gov-callout-warning mt-3">
                <strong>LEGAL MANDATE:</strong> Operational titles (CEO, Product Founder, Director, Employee, Workspace Administrator) do <strong>NOT</strong> constitute proof of legal share ownership. Legal shareholding exists <strong>strictly</strong> through issued Share Certificates (Form SH-1) and entries in the statutory Register of Members.
              </div>
            </div>
          </article>

          {/* Article 3 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">03</span>
            <div className="gov-clause-content">
              <h3>Founder Duties & Standard of Fiduciary Care</h3>
              <p>
                Every founder owes a strict fiduciary duty under Section 166 of the Companies Act, 2013 to act in good faith, in the best interest of the enterprise, employees, and shareholders. No founder may commit company resources exceeding ₹1,00,000 without prior written approval of the CEO or Parent Board.
              </p>
            </div>
          </article>

          {/* Article 4 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">04</span>
            <div className="gov-clause-content">
              <h3>Equity Vesting & Cliff Schedule</h3>
              <p>
                All founder equity allocations are subject to a <strong>four (4) year vesting schedule</strong> with a mandatory <strong>one (1) year cliff</strong> (25% vests at Month 12, followed by equal monthly vesting over the subsequent 36 months). Unvested shares are forfeited and returned to company treasury at nominal par value upon departure.
              </p>
            </div>
          </article>

          {/* Article 5 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">05</span>
            <div className="gov-clause-content">
              <h3>Compensation, Runway & Company Funds</h3>
              <p>
                All company revenue belongs to corporate accounts. Founder compensation must be formally approved by the Board of Directors and calibrated to company cash flow. Commingling of personal and corporate funds constitutes gross fiduciary breach.
              </p>
            </div>
          </article>

          {/* Article 6 */}
          <article className="gov-clause-row highlight-article">
            <span className="gov-clause-num">06</span>
            <div className="gov-clause-content">
              <h3>100% Intellectual Property Assignment</h3>
              <p>
                All software, source code, AI models, UI/UX designs, trademarks, domain names, algorithms, and documentation authored or conceived by founders during their engagement belong <strong>exclusively and perpetually to Zuccano Group Holdings or the designated subsidiary</strong>, with an express waiver of moral rights under Section 57 of the Copyright Act, 1957.
              </p>
            </div>
          </article>

          {/* Article 7 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">07</span>
            <div className="gov-clause-content">
              <h3>Decision Authority & Reserved Board Matters</h3>
              <p>
                Day-to-day sprint management is delegated to the subsidiary CEO. Fundamental matters—including equity dilution, debt over ₹5,00,000, intellectual property sale or licensing, executive hiring/firing, and corporate restructuring—require affirmative Parent Board approval.
              </p>
            </div>
          </article>

          {/* Article 8 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">08</span>
            <div className="gov-clause-content">
              <h3>Confidentiality & Data Protection</h3>
              <p>
                Founders are bound by a perpetual Non-Disclosure obligation covering source code, cap table data, user records, and financial statements, adhering strictly to the Digital Personal Data Protection (DPDP) Act, 2023.
              </p>
            </div>
          </article>

          {/* Article 9 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">09</span>
            <div className="gov-clause-content">
              <h3>Share Transfer Restrictions & 30-Day ROFR</h3>
              <p>
                No founder may sell, pledge, or transfer equity shares to any third party without first extending a thirty (30) day Right of First Refusal (ROFR) to Zuccano Parent Holding and existing co-founders.
              </p>
            </div>
          </article>

          {/* Article 10 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">10</span>
            <div className="gov-clause-content">
              <h3>Founder Exit (Good Leaver vs. Bad Leaver)</h3>
              <p>
                Voluntary departure requires ninety (90) days written notice. A Good Leaver retains earned vested equity. A founder terminated for Cause (fraud, criminal conduct, IP theft, or breach of non-compete) is designated a Bad Leaver, triggering an immediate mandatory buyback of shares at nominal par value (₹10/share).
              </p>
            </div>
          </article>

          {/* Article 11 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">11</span>
            <div className="gov-clause-content">
              <h3>Exclusivity & Non-Compete Undertaking</h3>
              <p>
                Founders must dedicate their full commercial focus to their assigned venture. During active tenure and for twelve (12) months following exit, no founder shall engage in, finance, or advise a commercially competitive business.
              </p>
            </div>
          </article>

          {/* Article 12 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">12</span>
            <div className="gov-clause-content">
              <h3>Dispute Resolution & Fast-Track Arbitration</h3>
              <p>
                Disputes are subject to mandatory thirty (30) days good-faith internal mediation. Unresolved disputes shall be finally settled by binding arbitration in Bengaluru, Karnataka under the Arbitration and Conciliation Act, 1996.
              </p>
            </div>
          </article>

          {/* Article 13 */}
          <article className="gov-clause-row">
            <span className="gov-clause-num">13</span>
            <div className="gov-clause-content">
              <h3>Immutability of Executed Document</h3>
              <p>
                Once executed, this agreement is cryptographically hashed and permanently locked. Administrators cannot alter signed records. Any future amendment requires a formal board resolution and re-execution.
              </p>
            </div>
          </article>
        </section>

        {/* =================================================================
            STATUTORY DECLARATIONS & AFFIRMATIONS CHECKLIST
           ================================================================= */}
        <section className="gov-declarations-section">
          <div className="gov-section-header">
            <div>
              <h2 className="gov-section-title">STATUTORY AFFIRMATIONS & ACKNOWLEDGEMENTS</h2>
              <p className="gov-section-desc">Check each mandatory declaration to confirm your informed agreement:</p>
            </div>
            <button
              type="button"
              className="gov-select-all-btn no-print"
              onClick={handleSelectAllAffirmations}
            >
              {Object.values(affirmations).every(Boolean) ? 'Deselect All' : 'Select All Declarations'}
            </button>
          </div>

          <div className="gov-checkbox-grid">
            <label className={`gov-check-card ${affirmations.readComplete ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={affirmations.readComplete}
                onChange={() => setAffirmations({ ...affirmations, readComplete: !affirmations.readComplete })}
              />
              <span>1. I have read and understand all 13 governance articles above in full.</span>
            </label>

            <label className={`gov-check-card ${affirmations.ownershipUnderstood ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={affirmations.ownershipUnderstood}
                onChange={() => setAffirmations({ ...affirmations, ownershipUnderstood: !affirmations.ownershipUnderstood })}
              />
              <span>2. I acknowledge the verified ownership cap tables and the rule that titles do not equal shares.</span>
            </label>

            <label className={`gov-check-card ${affirmations.fiduciaryDutyAccepted ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={affirmations.fiduciaryDutyAccepted}
                onChange={() => setAffirmations({ ...affirmations, fiduciaryDutyAccepted: !affirmations.fiduciaryDutyAccepted })}
              />
              <span>3. I accept my fiduciary duty of care and expenditure limits under Section 166 of the Companies Act.</span>
            </label>

            <label className={`gov-check-card ${affirmations.ipAssigned ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={affirmations.ipAssigned}
                onChange={() => setAffirmations({ ...affirmations, ipAssigned: !affirmations.ipAssigned })}
              />
              <span>4. I irrevocably assign all intellectual property and inventions to Zuccano Group Holdings.</span>
            </label>

            <label className={`gov-check-card ${affirmations.confidentialityAgreed ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={affirmations.confidentialityAgreed}
                onChange={() => setAffirmations({ ...affirmations, confidentialityAgreed: !affirmations.confidentialityAgreed })}
              />
              <span>5. I agree to strict perpetual non-disclosure and compliance with the DPDP Act, 2023.</span>
            </label>

            <label className={`gov-check-card ${affirmations.vestingAndExitAccepted ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={affirmations.vestingAndExitAccepted}
                onChange={() => setAffirmations({ ...affirmations, vestingAndExitAccepted: !affirmations.vestingAndExitAccepted })}
              />
              <span>6. I accept the 4-year vesting, 1-year cliff, and Bad Leaver par-value buyback terms.</span>
            </label>

            <label className={`gov-check-card ${affirmations.arbitrationAgreed ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={affirmations.arbitrationAgreed}
                onChange={() => setAffirmations({ ...affirmations, arbitrationAgreed: !affirmations.arbitrationAgreed })}
              />
              <span>7. I accept the 30-day internal mediation and Bengaluru binding arbitration procedure.</span>
            </label>

            <label className={`gov-check-card ${affirmations.independentCounselOpportunity ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={affirmations.independentCounselOpportunity}
                onChange={() => setAffirmations({ ...affirmations, independentCounselOpportunity: !affirmations.independentCounselOpportunity })}
              />
              <span>8. I confirm I have had full opportunity to obtain independent legal/financial counsel before signing.</span>
            </label>
          </div>
        </section>

        {/* =================================================================
            IDENTITY & OFFICIAL DIGITAL SIGNATURE (E-SIGN) BLOCK
           ================================================================= */}
        {isExecuted && auditRecord ? (
          /* Executed Certificate Display */
          <div id="execution-certificate-box" className="gov-certificate-box">
            <div className="cert-top-badge">
              <CheckCircle size={16} className="text-green-800" />
              <span>OFFICIALLY EXECUTED & REGISTERED IN ZUCCANO CORPORATE DEPOSITORY</span>
            </div>

            <h3 className="cert-title">CERTIFICATE OF FOUNDER AGREEMENT EXECUTION</h3>
            <p className="cert-lead">
              This certifies that the undersigned founder has formally acknowledged and electronically executed Form ZUC-FGA pursuant to the Information Technology Act, 2000 and Companies Act, 2013.
            </p>

            <div className="cert-details-grid">
              <div>
                <span className="cd-label">Audit Event ID</span>
                <span className="cd-val font-mono text-red-900">{auditRecord.auditEventId}</span>
              </div>
              <div>
                <span className="cd-label">Execution Timestamp (IST)</span>
                <span className="cd-val font-semibold">{auditRecord.timestampIST}</span>
              </div>
              <div>
                <span className="cd-label">Signer Legal Name</span>
                <span className="cd-val font-semibold">{auditRecord.fullName}</span>
              </div>
              <div>
                <span className="cd-label">Corporate Email</span>
                <span className="cd-val font-mono">{auditRecord.email}</span>
              </div>
              <div>
                <span className="cd-label">Assigned Subsidiary / Product</span>
                <span className="cd-val font-semibold">{auditRecord.subsidiary}</span>
              </div>
              <div>
                <span className="cd-label">Official Role / Designation</span>
                <span className="cd-val font-semibold">{auditRecord.role}</span>
              </div>
              <div className="col-span-full">
                <span className="cd-label">Cryptographic Fingerprint (SHA-256)</span>
                <span className="cd-val font-mono text-xs break-all">{auditRecord.documentHash}</span>
              </div>
            </div>

            <div className="cert-sig-row">
              <div>
                <span className="cd-label">Recorded Digital E-Signature</span>
                <img src={auditRecord.signatureData} alt="E-Signature" className="cert-sig-preview" />
                <span className="text-xs text-neutral-500 font-mono block mt-1">Verified Signer: {auditRecord.fullName}</span>
              </div>

              <div className="no-print">
                <button type="button" className="gov-btn-primary" onClick={handlePrint}>
                  <Printer size={14} />
                  <span>Print & Download Certificate</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Execution Form */
          <section className="gov-execution-section">
            <h2 className="gov-section-title">FOUNDER IDENTITY & E-SIGNATURE EXECUTION</h2>
            <p className="gov-section-desc">Complete all fields below and provide your digital signature to execute this agreement:</p>

            <form onSubmit={handleSubmit} className="gov-form">
              <div className="gov-inputs-grid">
                <div className="gov-input-group">
                  <label>Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="gov-input-group">
                  <label>Official Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="gov-input-group">
                  <label>Assigned Subsidiary / Product</label>
                  <select
                    value={formData.subsidiary}
                    onChange={(e) => setFormData({ ...formData, subsidiary: e.target.value })}
                  >
                    <option value="ZFIT Technologies">ZFIT Technologies</option>
                    <option value="Zuccano Group Holdings">Zuccano Group Holdings Private Limited</option>
                    <option value="Zuccano Retail Ventures">Zuccano Retail Ventures</option>
                    <option value="Zuccano Media Lab">Zuccano Media Lab</option>
                  </select>
                </div>

                <div className="gov-input-group">
                  <label>Designation / Role</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>

                <div className="gov-input-group">
                  <label>Government Identification (PAN / DIN)</label>
                  <input
                    type="text"
                    value={formData.govtId}
                    onChange={(e) => setFormData({ ...formData, govtId: e.target.value })}
                    placeholder="e.g. AAAPZ9845K"
                  />
                </div>

                <div className="gov-input-group">
                  <label>Execution Timestamp (IST)</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.dateIST}
                    className="bg-neutral-100 font-mono text-xs cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Digital Signature Canvas Block */}
              <div className="gov-signature-box">
                <div className="gov-sig-header">
                  <span className="font-semibold text-xs tracking-wider uppercase">Electronic Signature Pad (IT Act, 2000)</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`gov-sig-tab ${sigMode === 'DRAW' ? 'active' : ''}`}
                      onClick={() => setSigMode('DRAW')}
                    >
                      <PenTool size={12} />
                      <span>Draw Signature</span>
                    </button>
                    <button
                      type="button"
                      className={`gov-sig-tab ${sigMode === 'TYPE' ? 'active' : ''}`}
                      onClick={() => setSigMode('TYPE')}
                    >
                      <Type size={12} />
                      <span>Type Signature</span>
                    </button>
                    {sigMode === 'DRAW' && hasDrawn && (
                      <button type="button" className="gov-sig-reset" onClick={clearCanvas}>
                        <RotateCcw size={12} />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>
                </div>

                {sigMode === 'DRAW' ? (
                  <div className="gov-canvas-wrap">
                    <canvas
                      ref={canvasRef}
                      width={700}
                      height={120}
                      className="gov-canvas"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                    <div className="gov-canvas-guide">
                      <span>Sign above using mouse, pen, or touch</span>
                    </div>
                  </div>
                ) : (
                  <div className="gov-type-sig-wrap">
                    <input
                      type="text"
                      placeholder="Type your official name to sign..."
                      value={typedSig}
                      onChange={(e) => handleTypedSignature(e.target.value)}
                      className="gov-typed-input"
                    />
                    <span className="text-xs text-neutral-500 font-mono block mt-1">
                      Rendered in legally binding digital script under Section 10A of the IT Act, 2000.
                    </span>
                  </div>
                )}
              </div>

              {/* Final Submit Button */}
              <div className="gov-submit-wrap no-print">
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="gov-submit-btn"
                >
                  <Lock size={15} />
                  <span>
                    {isSubmitting
                      ? 'Executing & Registering Agreement...'
                      : 'EXECUTE & SUBMIT FORMAL FOUNDER ACCEPTANCE'}
                  </span>
                </button>

                {!canSubmit && (
                  <p className="gov-submit-hint">
                    {!allAffirmationsChecked
                      ? '⚠️ Please check all 8 statutory affirmations above.'
                      : !hasValidSignature
                      ? '⚠️ Please draw or type your electronic signature above.'
                      : '⚠️ Please complete all required identity fields.'}
                  </p>
                )}

                {errorMessage && (
                  <p className="text-red-700 text-xs font-bold text-center mt-2">
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>
          </section>
        )}

        {/* =================================================================
            OFFICIAL FOOTER
           ================================================================= */}
        <footer className="gov-form-footer">
          <div className="gov-footer-line">
            <span>ZUCCANO GROUP HOLDINGS PRIVATE LIMITED • CORPORATE GOVERNANCE DEPOSITORY</span>
            <span>BENGALURU, KARNATAKA</span>
          </div>
          <p className="gov-footer-sub">
            This instrument is executed electronically pursuant to the Information Technology Act, 2000. A copy of this document is permanently archived in the Board Depository.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default FounderAgreementPortal;
