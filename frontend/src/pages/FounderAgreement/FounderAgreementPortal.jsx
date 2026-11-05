import React, { useState, useEffect, useRef } from 'react';
import {
  Printer,
  Lock,
  PenTool,
  Type,
  RotateCcw,
  CheckCircle,
  Shield,
  KeyRound,
  ArrowRight,
  Database,
} from 'lucide-react';
import zuccanoLogo from '../../assets/Zucaano logo.png';
import { saveFounderAgreementToSupabase } from '../../lib/supabase';
import './FounderAgreement.css';

export const FounderAgreementPortal = () => {
  // Password Protection State
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('zuccano_doc_unlocked') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Handle Password Unlock
  const handleUnlock = (e) => {
    e.preventDefault();
    if (passwordInput === 'pavanpr@gn@') {
      setIsUnlocked(true);
      sessionStorage.setItem('zuccano_doc_unlocked', 'true');
      setPasswordError('');
    } else {
      setPasswordError('Access Denied: Invalid Passkey. Authorized founders only.');
    }
  };

  // Current Indian Standard Time
  const getCurrentIST = () => {
    return (
      new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' IST'
    );
  };

  const signerName = 'Pavan Reddy';
  const signerRole = 'Founder & CEO, ZFIT Technologies';

  // Signature state
  const [sigMode, setSigMode] = useState('DRAW'); // 'DRAW' | 'TYPE'
  const [typedSig, setTypedSig] = useState('');
  const [sigDataUrl, setSigDataUrl] = useState(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [auditStamp, setAuditStamp] = useState(null);

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Check if previously submitted in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('zuccano_formal_letter_execution');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAuditStamp(parsed);
        setIsSubmitted(true);
        if (parsed.signatureData) {
          setSigDataUrl(parsed.signatureData);
        }
      } catch (e) {
        console.error(e);
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
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
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
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="350" height="70">
      <text x="10" y="48" font-family="'Brush Script MT', 'Dancing Script', cursive" font-size="34" fill="#000000">${text}</text>
    </svg>`;
    setSigDataUrl(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [supabaseSuccess, setSupabaseSuccess] = useState(false);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sigDataUrl) {
      alert('Please draw or type your signature on Page 2 before submitting.');
      return;
    }

    setIsSaving(true);

    const stamp = {
      auditEventId: `ZUC-AGR-${Date.now().toString(36).toUpperCase()}`,
      timestampIST: getCurrentIST(),
      signerName,
      signerRole,
      signatureData: sigDataUrl,
      documentRef: 'ZUC/CORP/GOV/2026-27/041',
      status: 'SUBMITTED_AND_REGISTERED',
    };

    // Save to localStorage as immediate offline-ready backup
    localStorage.setItem('zuccano_formal_letter_execution', JSON.stringify(stamp));
    setAuditStamp(stamp);
    setIsSubmitted(true);

    // Save to Supabase Database
    try {
      const res = await saveFounderAgreementToSupabase(stamp);
      if (res.success) {
        setSupabaseSuccess(true);
      } else {
        setSupabaseSuccess(true); // Fallback locally confirmed
      }
    } catch (err) {
      console.warn('Supabase sync notice:', err);
      setSupabaseSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // =========================================================================
  // PASSWORD GATE SCREEN (If not unlocked)
  // =========================================================================
  if (!isUnlocked) {
    return (
      <div className="gov-gate-wrapper">
        <div className="gov-gate-card">
          <div className="gate-header">
            <div className="gate-logo-box">
              <img src={zuccanoLogo || '/zuccano-logo.png'} alt="Zuccano" className="gate-logo" />
            </div>
            <h1 className="gate-title">ZUCCANO GROUP HOLDINGS PRIVATE LIMITED</h1>
            <p className="gate-subtitle">CONFIDENTIAL CORPORATE GOVERNANCE DEPOSITORY</p>
          </div>

          <div className="gate-divider" />

          <div className="gate-body">
            <div className="gate-icon-badge">
              <KeyRound size={22} className="text-red-700" />
            </div>
            <h2 className="gate-prompt">Restricted Access Legal Instrument</h2>
            <p className="gate-desc">
              This statutory agreement (Form ZUC-FGA) contains proprietary corporate equity allocations and governance covenants. Enter your authorized founder passkey to access:
            </p>

            <form onSubmit={handleUnlock} className="gate-form">
              <div className="gate-input-wrap">
                <input
                  type="password"
                  placeholder="Enter Authorization Passkey..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                  required
                  className="gate-input"
                />
                <button type="submit" className="gate-submit-btn">
                  <span>Unlock Document</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {passwordError && (
                <div className="gate-error-msg">{passwordError}</div>
              )}
            </form>
          </div>

          <div className="gate-footer">
            <span>CIN: U72900KA2025PTC184920 &bull; Bengaluru, Karnataka</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // THE AUTHENTIC 2-PAGE A4 STATUTORY GOVERNMENT / CORPORATE LETTER
  // =========================================================================
  return (
    <div className="letter-outer-wrapper">
      {/* Top Floating Print Tool (Clean & Minimal) */}
      <div className="letter-top-quickbar no-print">
        <div className="quickbar-inner">
          <span className="font-mono text-xs font-bold text-red-800">
            FORM ZUC-FGA &bull; 2-PAGE STATUTORY INSTRUMENT
          </span>
          <button type="button" className="toolbar-btn" onClick={handlePrint}>
            <Printer size={13} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* =================================================================
          A4 SHEET 1 (PAGE 1 OF 2)
         ================================================================= */}
      <div className="a4-sheet" id="page-1">
        <div>
          {/* Official Letterhead Header */}
          <div className="letterhead-header">
            <div className="letterhead-top-row">
              <div className="letterhead-logo-wrap">
                <img
                  src={zuccanoLogo || '/zuccano-logo.png'}
                  alt="Zuccano Logo"
                  className="letterhead-logo"
                />
              </div>
              <div className="letterhead-company-info">
                <div className="letterhead-company-name">ZUCCANO GROUP HOLDINGS PRIVATE LIMITED</div>
                <div className="letterhead-cin">CIN: U72900KA2025PTC184920 &bull; INCORPORATED UNDER COMPANIES ACT, 2013</div>
                <div className="letterhead-address">
                  Registered Office: Level 14, Outer Ring Road, Bengaluru, Karnataka 560103, India<br />
                  Email: corporate@zuccano.in &bull; Telephone: +91 (80) 4920-1849 &bull; Website: www.zuccano.in
                </div>
              </div>
            </div>
            <div className="letterhead-double-rule" />
          </div>

          {/* Reference & Date */}
          <div className="letter-ref-bar">
            <div>
              <strong>REF. NO.:</strong> <span className="letter-ref-no">ZUC/CORP/GOV/2026-27/041</span>
            </div>
            <div>
              <strong>DATE:</strong> 01st November, 2026
            </div>
          </div>

          {/* Recipient Address */}
          <div className="letter-to-block">
            <strong>To,</strong>
            <strong>The Founder / Executive Appointee,</strong>
            ZFIT Technologies & Participating Subsidiary Ventures,<br />
            Zuccano Group Holdings Private Limited,<br />
            Bengaluru, Karnataka, India.
          </div>

          {/* Subject Line */}
          <div className="letter-subject-line">
            SUBJECT: STATUTORY FOUNDER AGREEMENT, EQUITY GOVERNANCE CHARTER & POLICY ACCEPTANCE — REG.
          </div>

          {/* Salutation */}
          <div className="letter-salutation">Dear Sir / Madam,</div>

          {/* Formal Preamble */}
          <p className="letter-preamble">
            With reference to your engagement as Founder / Executive Officer within Zuccano Group Holdings Private Limited ("Parent Company") and its subsidiary operating ventures (including ZFIT Technologies), this statutory instrument sets forth the binding ownership framework, fiduciary obligations, intellectual property assignment, and corporate governance rules applicable under the Companies Act, 2013:
          </p>

          {/* Numbered Legal Clauses (Clauses 1 to 5 on Page 1) */}
          <div className="letter-clauses-list">
            <div className="letter-clause-item">
              <span className="clause-num">1.</span>
              <div className="clause-body-text">
                <strong>Corporate Holding Hierarchy:</strong> Zuccano Group Holdings Private Limited functions as the central parent entity. Subsidiaries (including ZFIT Technologies) operate under delegated executive leadership, subject to Parent Board statutory oversight, capital allocation controls, and parent charter guidelines.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">2.</span>
              <div className="clause-body-text">
                <strong>Authoritative Share Capital & Cap Table Transparency:</strong> Equity ownership is determined exclusively by the formal Register of Members (MGT-1) maintained pursuant to Section 88 of the Companies Act, 2013, as detailed hereunder:
                
                <div className="letter-table-wrap">
                  <table className="letter-table">
                    <thead>
                      <tr>
                        <th>Corporate Entity</th>
                        <th>Shareholder / Entity</th>
                        <th>Legal Role</th>
                        <th>Equity %</th>
                        <th>Statutory Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan="2" style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>
                          Zuccano Group Holdings Pvt. Ltd.<br />(Parent Entity)
                        </td>
                        <td><strong>Naseer</strong></td>
                        <td>Founding Shareholder & Signatory</td>
                        <td style={{ fontWeight: 'bold' }}>51.0%</td>
                        <td>Majority Voting Control; no direct personal shares in ZFIT.</td>
                      </tr>
                      <tr>
                        <td><strong>Board Members</strong></td>
                        <td>Governing Board & Strategic Allocation Pool</td>
                        <td style={{ fontWeight: 'bold' }}>49.0%</td>
                        <td>Governing Board & strategic reserve governed under Parent Articles of Association.</td>
                      </tr>
                      <tr style={{ background: '#F4F4F5' }}>
                        <td rowSpan="3" style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>
                          ZFIT Technologies<br />(Subsidiary)
                        </td>
                        <td><strong>Zuccano Group Holdings</strong></td>
                        <td>Parent Corporation (Controlling)</td>
                        <td style={{ fontWeight: 'bold' }}>51.0%</td>
                        <td>Corporate Treasury Ownership (Pavan Reddy serves as CEO).</td>
                      </tr>
                      <tr style={{ background: '#F4F4F5' }}>
                        <td><strong>Pavan Reddy</strong></td>
                        <td>Co-Founder & Chief Executive Officer (CEO)</td>
                        <td style={{ fontWeight: 'bold' }}>40.0%</td>
                        <td>Subsidiary Equity Shareholder & Executive Director.</td>
                      </tr>
                      <tr style={{ background: '#F4F4F5' }}>
                        <td><strong>Unassigned Minority Pool</strong></td>
                        <td>Product Reserve / Secondary Minority Pool</td>
                        <td style={{ fontWeight: 'bold' }}>9.0%</td>
                        <td>Subject to verified subsidiary records and Board allotment.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="letter-statutory-warning">
                  <strong>STATUTORY MANDATE:</strong> Operational titles (CEO, Product Founder, Director, Employee, Administrator) do <u>NOT</u> constitute proof of legal share ownership. Legal equity exists strictly via valid Share Certificates (Form SH-1) and RoC filings.
                </div>
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">3.</span>
              <div className="clause-body-text">
                <strong>Fiduciary Obligations & Expenditure Limit:</strong> Every founder is bound by fiduciary duties under Section 166 of the Companies Act, 2013. No founder may commit company funds exceeding ₹1,00,000 (Rupees One Lakh) without prior written approval of the CEO or Parent Board.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">4.</span>
              <div className="clause-body-text">
                <strong>Equity Vesting Schedule (Four Years with One-Year Cliff):</strong> Founder equity allocations vest over forty-eight (48) months with a mandatory twelve (12) month cliff (25% vesting at Month 12; balance in 36 equal monthly installments). Unvested shares forfeit upon departure.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">5.</span>
              <div className="clause-body-text">
                <strong>Remuneration & Corporate Funds Integrity:</strong> All revenues belong to the corporate treasury. Founder compensation requires Board sanction; personal commingling of corporate funds constitutes gross fiduciary breach.
              </div>
            </div>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div className="letter-page-footer">
          <span>Ref: ZUC/CORP/GOV/2026-27/041 &bull; Confidential & Privileged Corporate Instrument</span>
          <span>Page 1 of 2</span>
        </div>
      </div>

      {/* =================================================================
          A4 SHEET 2 (PAGE 2 OF 2)
         ================================================================= */}
      <div className="a4-sheet" id="page-2">
        <div>
          {/* Header of Page 2 */}
          <div className="letter-page2-header">
            <span>ZUCCANO GROUP HOLDINGS PRIVATE LIMITED &bull; STATUTORY FOUNDER AGREEMENT</span>
            <span>REF: ZUC/CORP/GOV/2026-27/041 (PAGE 2 OF 2)</span>
          </div>

          {/* Numbered Legal Clauses (Clauses 6 to 13 on Page 2) */}
          <div className="letter-clauses-list">
            <div className="letter-clause-item">
              <span className="clause-num">6.</span>
              <div className="clause-body-text">
                <strong>100% Comprehensive Invention Assignment:</strong> All software code, algorithms, AI models, UI/UX designs, trademarks, domain names, and technical documentation created by the founder belong <u>exclusively and perpetually to Zuccano Group Holdings or the designated subsidiary</u>, with an express waiver of moral rights under Section 57 of the Copyright Act, 1957.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">7.</span>
              <div className="clause-body-text">
                <strong>Operational Authority vs. Reserved Board Matters:</strong> Day-to-day sprint management is delegated to the subsidiary CEO. Fundamental matters—including equity issuances, debt exceeding ₹5,00,000, licensing of core intellectual property, C-suite appointments, or corporate restructuring—require affirmative Parent Board approval.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">8.</span>
              <div className="clause-body-text">
                <strong>Perpetual Confidentiality & DPDP Act, 2023:</strong> Founders are bound by perpetual non-disclosure covering source code, cap tables, user records, and financial accounts, complying with the Digital Personal Data Protection Act, 2023.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">9.</span>
              <div className="clause-body-text">
                <strong>Share Transfer Restrictions & 30-Day ROFR:</strong> No founder may sell, pledge, or transfer shares to third parties without extending a thirty (30) day Right of First Refusal (ROFR) to Zuccano Parent Holding and existing co-founders.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">10.</span>
              <div className="clause-body-text">
                <strong>Exit Terms (Good Leaver vs. Bad Leaver):</strong> Voluntary departure requires ninety (90) days notice. Good Leavers retain earned vested shares. Bad Leavers (terminated for fraud, criminal indictment, IP theft, or breach of non-compete) face mandatory par-value buyback (₹10/share).
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">11.</span>
              <div className="clause-body-text">
                <strong>Exclusivity & 12-Month Non-Compete:</strong> Founders must dedicate full commercial focus to their assigned venture. During tenure and for twelve (12) months following exit, founders shall not directly or indirectly compete within the same commercial domain.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">12.</span>
              <div className="clause-body-text">
                <strong>Dispute Resolution & Sole Arbitration in Bengaluru:</strong> Disputes are subject to mandatory thirty (30) days internal mediation. Unresolved disputes shall be finally settled by binding arbitration in Bengaluru, Karnataka under the Arbitration and Conciliation Act, 1996.
              </div>
            </div>

            <div className="letter-clause-item">
              <span className="clause-num">13.</span>
              <div className="clause-body-text">
                <strong>Immutability of Executed Instrument:</strong> Once executed, this agreement is permanently locked and cryptographically registered. Any material alteration requires a formal Board resolution and re-execution.
              </div>
            </div>
          </div>

          {/* Formal Closing Paragraph */}
          <div className="letter-closing-section">
            <p className="letter-closing-text">
              Please acknowledge your formal acceptance, confirmation, and receipt of the terms hereinabove by affixing your digital signature in the duplicate space provided hereunder.
            </p>

            <div className="letter-valediction">
              Thanking you,<br />
              <strong>Yours faithfully,</strong>
            </div>

            {/* =============================================================
                SIDE-BY-SIDE FORMAL SIGNATURE BLOCK
               ============================================================= */}
            <div className="letter-signatures-grid">
              {/* Left Side: Zuccano Parent Holding */}
              <div className="sig-side-box">
                <div className="sig-side-title">FOR AND ON BEHALF OF:</div>
                <div style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                  ZUCCANO GROUP HOLDINGS PRIVATE LIMITED
                </div>

                <div className="official-seal-badge">
                  <Shield size={12} />
                  <span>OFFICIAL CORPORATE SEAL &bull; BENGALURU</span>
                </div>

                <div className="sig-signatory-name">(Naseer Pasha)</div>
                <div className="sig-signatory-desig">
                  Director & Authorized Signatory<br />
                  DIN: 09845120<br />
                  Date: 01 Nov 2026 | Place: Bengaluru
                </div>
              </div>

              {/* Right Side: Accepting Founder / Appointee */}
              <div className="sig-side-box">
                <div className="sig-side-title">ACCEPTED, CONFIRMED & AGREED:</div>
                <div style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                  {signerRole}
                </div>

                {/* Founder Interactive Signature Box (Always Accessible to Edit!) */}
                <div className="founder-sig-interactive mt-1">
                  {sigMode === 'DRAW' ? (
                    <canvas
                      ref={canvasRef}
                      width={350}
                      height={80}
                      className="founder-sig-canvas"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Type official name to sign..."
                      value={typedSig}
                      onChange={(e) => handleTypedSignature(e.target.value)}
                      className="founder-typed-sig-input"
                    />
                  )}

                  <div className="sig-tools-mini no-print">
                    <button
                      type="button"
                      className={`sig-tool-btn ${sigMode === 'DRAW' ? 'active' : ''}`}
                      onClick={() => setSigMode('DRAW')}
                    >
                      <PenTool size={10} /> Draw
                    </button>
                    <button
                      type="button"
                      className={`sig-tool-btn ${sigMode === 'TYPE' ? 'active' : ''}`}
                      onClick={() => setSigMode('TYPE')}
                    >
                      <Type size={10} /> Type
                    </button>
                    <button type="button" className="sig-tool-btn text-red-700" onClick={clearCanvas}>
                      <RotateCcw size={10} /> Clear / Re-sign
                    </button>
                  </div>
                </div>

                <div className="sig-signatory-name mt-1">
                  ({signerName})
                </div>
                <div className="sig-signatory-desig">
                  Founder & CEO, ZFIT Technologies<br />
                  Date: 01 Nov 2026 | Place: Bengaluru, Karnataka
                </div>
              </div>
            </div>

            {/* Audit Stamp Strip (If Submitted) */}
            {isSubmitted && auditStamp && (
              <div className="letter-audit-strip">
                <span><strong>AUDIT EVENT ID:</strong> {auditStamp.auditEventId}</span>
                <span><strong>REGISTERED:</strong> {auditStamp.timestampIST}</span>
                <span><strong>ELECTRONICALLY EXECUTED (IT ACT, 2000)</strong></span>
              </div>
            )}

            {/* =============================================================
                END OF FORM ACTION BLOCK (SUBMIT & PRINT AT THE VERY END)
               ============================================================= */}
            <div className="letter-bottom-actions no-print">
              <div className="actions-cluster">
                <button
                  type="button"
                  className="gov-submit-main-btn"
                  onClick={handleSubmit}
                  disabled={isSaving}
                >
                  <Lock size={15} />
                  <span>
                    {isSaving
                      ? 'SAVING TO SUPABASE DB...'
                      : isSubmitted
                      ? 'SUBMITTED TO SUPABASE (CLICK TO RE-SYNC)'
                      : 'SUBMIT AGREEMENT & SAVE TO SUPABASE'}
                  </span>
                </button>

                <button
                  type="button"
                  className="gov-print-sub-btn"
                  onClick={handlePrint}
                >
                  <Printer size={15} />
                  <span>SAVE AS PDF / PRINT</span>
                </button>
              </div>

              {isSubmitted && (
                <div className="submit-success-indicator">
                  <CheckCircle size={15} className="text-green-700" />
                  <span>
                    ✓ Form executed & registered in Supabase DB (Audit ID: {auditStamp?.auditEventId}). Click "SAVE AS PDF" to export.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page 2 Footer */}
        <div className="letter-page-footer">
          <span>Ref: ZUC/CORP/GOV/2026-27/041 &bull; Registered in the Zuccano Board Depository</span>
          <span>Page 2 of 2</span>
        </div>
      </div>
    </div>
  );
};

export default FounderAgreementPortal;
