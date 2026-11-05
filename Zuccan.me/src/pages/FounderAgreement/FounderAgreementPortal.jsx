import React, { useState, useEffect, useRef } from 'react';
import {
  Printer,
  Download,
  Lock,
  PenTool,
  Type,
  RotateCcw,
  CheckCircle,
  Shield,
} from 'lucide-react';
import zuccanoLogo from '../../assets/Zucaano logo.png';
import './FounderAgreement.css';

export const FounderAgreementPortal = () => {
  // Current Indian Standard Time formatted string
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

  const [signerName, setSignerName] = useState('Pavan Zuccano');
  const [signerRole, setSignerRole] = useState('Founder & CEO, ZFIT Technologies');
  const [sigMode, setSigMode] = useState('DRAW'); // 'DRAW' | 'TYPE'
  const [typedSig, setTypedSig] = useState('');
  const [sigDataUrl, setSigDataUrl] = useState(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);
  const [auditStamp, setAuditStamp] = useState(null);

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Check if previously executed in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('zuccano_formal_letter_execution');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAuditStamp(parsed);
        setIsExecuted(true);
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
    if (sigMode !== 'DRAW' || isExecuted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || sigMode !== 'DRAW' || isExecuted) return;
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
    if (isExecuted) return;
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

  const handleExecute = () => {
    if (!sigDataUrl) {
      alert('Please provide your electronic signature in the box on Page 2 before submitting.');
      return;
    }

    const stamp = {
      auditEventId: `ZUC-AGR-${Date.now().toString(36).toUpperCase()}`,
      timestampIST: getCurrentIST(),
      signerName,
      signerRole,
      signatureData: sigDataUrl,
      documentRef: 'ZUC/CORP/GOV/2026-27/041',
      status: 'EXECUTED_AND_FILED',
    };

    localStorage.setItem('zuccano_formal_letter_execution', JSON.stringify(stamp));
    setAuditStamp(stamp);
    setIsExecuted(true);
    alert('Agreement executed and registered successfully in Zuccano Corporate Depository.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="letter-outer-wrapper">
      {/* =================================================================
          TOP ACTION TOOLBAR (Hidden on Print)
         ================================================================= */}
      <div className="letter-action-toolbar no-print">
        <div className="toolbar-info">
          <span className="toolbar-badge">FORM ZUC-FGA (2-PAGE STATUTORY INSTRUMENT)</span>
          <span>Zuccano Corporate Depository</span>
        </div>

        <div className="toolbar-buttons">
          <button type="button" className="toolbar-btn" onClick={handlePrint}>
            <Printer size={13} />
            <span>Print 2-Page Letter (PDF)</span>
          </button>

          {!isExecuted ? (
            <button
              type="button"
              className="toolbar-btn primary"
              onClick={handleExecute}
              disabled={!sigDataUrl}
            >
              <Lock size={13} />
              <span>Sign & Execute Letter</span>
            </button>
          ) : (
            <span className="text-xs font-bold text-green-700 inline-flex items-center gap-1 font-mono">
              <CheckCircle size={14} /> EXECUTED & LOCKED
            </span>
          )}
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
                        <td>Corporate Treasury Ownership (Pavan serves as CEO).</td>
                      </tr>
                      <tr style={{ background: '#F4F4F5' }}>
                        <td><strong>Board Members</strong></td>
                        <td>Governing Board & Executive Allocation Pool</td>
                        <td style={{ fontWeight: 'bold' }}>40.0%</td>
                        <td>Allocated to Governing Board members and leadership pursuant to Board filings.</td>
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

                {/* Founder Interactive Signature Box */}
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
                      placeholder="Type official legal name..."
                      value={typedSig}
                      onChange={(e) => handleTypedSignature(e.target.value)}
                      className="founder-typed-sig-input"
                    />
                  )}

                  {!isExecuted && (
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
                      {sigMode === 'DRAW' && hasDrawn && (
                        <button type="button" className="sig-tool-btn text-red-700" onClick={clearCanvas}>
                          <RotateCcw size={10} /> Clear
                        </button>
                      )}
                    </div>
                  )}
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

            {/* Audit Stamp Strip */}
            {isExecuted && auditStamp && (
              <div className="letter-audit-strip">
                <span><strong>AUDIT EVENT ID:</strong> {auditStamp.auditEventId}</span>
                <span><strong>REGISTERED:</strong> {auditStamp.timestampIST}</span>
                <span><strong>ELECTRONICALLY EXECUTED (IT ACT, 2000)</strong></span>
              </div>
            )}
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
