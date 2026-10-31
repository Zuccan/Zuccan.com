import React, { useState } from 'react';
import {
  FileText,
  Send,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers,
  Building,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
} from 'lucide-react';

export const ReportToZuccanoModule = ({ data, onSubmitReport }) => {
  const { zuccanoReports, identity } = data;
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [expandedReportId, setExpandedReportId] = useState(zuccanoReports[0]?.id || null);

  const [form, setForm] = useState({
    title: '',
    month: 'November',
    year: 2026,
    summary: '',
    milestones: '',
    risksAndMitigation: '',
    financialHealth: '',
    resourceRequests: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.summary) return;

    onSubmitReport({
      title: form.title,
      month: form.month,
      year: form.year,
      summary: form.summary,
      milestones: form.milestones.split('\n').filter((m) => m.trim().length > 0),
      risksAndMitigation: form.risksAndMitigation || 'No critical parent-level blockers at this time.',
      financialHealth: form.financialHealth || 'Budget utilization within approved fiscal boundaries.',
      resourceRequests: form.resourceRequests || 'None requested.',
    });

    setShowSubmitModal(false);
    setForm({
      title: '',
      month: 'November',
      year: 2026,
      summary: '',
      milestones: '',
      risksAndMitigation: '',
      financialHealth: '',
      resourceRequests: '',
    });
  };

  return (
    <div className="ceo-zuccano-reports-view">
      {/* ── Header ── */}
      <div className="ceo-module-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E3262E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Parent-Subsidiary Governance Channel
            </span>
            <span style={{ color: '#D4D4D8' }}>•</span>
            <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 600 }}>
              Encrypted Executive Bridge to Zuccano Holding Board
            </span>
          </div>
          <h1 className="ceo-module-title">Report to Zuccano Holding Company</h1>
          <p className="ceo-module-desc">
            Formal disclosure bridge between {identity.name} and the Zuccano Parent Holding Company. Submit monthly operating reviews, business milestones, risk disclosures, and resource requests requiring parent-level board authorization.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          style={{ background: '#E3262E' }}
          onClick={() => setShowSubmitModal(true)}
        >
          <Send size={14} />
          <span>Submit Executive Report to Zuccano</span>
        </button>
      </div>

      {/* ── Parent Governance Boundary Notice ── */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E4E4E7',
          borderLeft: '4px solid #E3262E',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginBottom: '1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <Shield size={18} style={{ color: '#E3262E', marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
            <strong>Parent-Subsidiary Access Protocol:</strong> Zuccano Holding Company exercises corporate ownership, cap table governance, and macro capital allocation. Daily operational decisions (CFO/CMO appointments, hiring, internal budgeting) remain 100% autonomous to {identity.name}’s CEO. This channel ensures seamless accountability without operational micro-management.
          </div>
        </div>
      </div>

      {/* ── Submitted Reports Stream ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {zuccanoReports.map((rep) => {
          const isExpanded = expandedReportId === rep.id;
          return (
            <div
              key={rep.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              {/* Report Summary Card Header */}
              <div
                style={{
                  padding: '1.15rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: isExpanded ? '#FAFAFA' : '#FFFFFF',
                  borderBottom: isExpanded ? '1px solid #E4E4E7' : 'none',
                }}
                onClick={() => setExpandedReportId(isExpanded ? null : rep.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge-active" style={{ fontSize: '0.68rem' }}>
                      {rep.status}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#71717A' }}>
                      Delivered: {rep.submittedAt}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', margin: 0 }}>
                    {rep.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#52525B', fontWeight: 600 }}>
                    {rep.month} {rep.year} Review
                  </span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded Detailed Report Body */}
              {isExpanded && (
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#71717A', letterSpacing: '0.04em', margin: '0 0 6px' }}>
                      Executive Summary
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#18181B', lineHeight: 1.6, margin: 0 }}>
                      {rep.summary}
                    </p>
                  </div>

                  {rep.milestones && rep.milestones.length > 0 && (
                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#16A34A', letterSpacing: '0.04em', margin: '0 0 6px' }}>
                        Key Business Milestones & Major Achievements
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#334155', lineHeight: 1.6 }}>
                        {rep.milestones.map((m, idx) => (
                          <li key={idx}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div style={{ border: '1px solid #E4E4E7', padding: '1rem', borderRadius: '8px' }}>
                      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#D97706', letterSpacing: '0.04em', margin: '0 0 6px' }}>
                        Operational Risks & Mitigations
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5, margin: 0 }}>
                        {rep.risksAndMitigation}
                      </p>
                    </div>

                    <div style={{ border: '1px solid #E4E4E7', padding: '1rem', borderRadius: '8px' }}>
                      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#09090B', letterSpacing: '0.04em', margin: '0 0 6px' }}>
                        Financial Health & Budget Burn
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5, margin: 0 }}>
                        {rep.financialHealth}
                      </p>
                    </div>
                  </div>

                  {rep.resourceRequests && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', padding: '1rem', borderRadius: '8px' }}>
                      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#DC2626', letterSpacing: '0.04em', margin: '0 0 6px' }}>
                        Requests Requiring Zuccano Holding Board Authorization
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: '#991B1B', lineHeight: 1.5, margin: 0 }}>
                        {rep.resourceRequests}
                      </p>
                    </div>
                  )}

                  {/* Parent Holding Feedback Stamp */}
                  <div
                    style={{
                      borderTop: '1px solid #E4E4E7',
                      paddingTop: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.76rem',
                    }}
                  >
                    <div>
                      <span style={{ color: '#71717A' }}>Parent Governance Feedback: </span>
                      <strong style={{ color: '#16A34A' }}>{rep.parentFeedback}</strong>
                    </div>
                    <span className="badge-active">Board Certified</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── COMPOSE GOVERNANCE REPORT MODAL ── */}
      {showSubmitModal && (
        <div className="ceo-modal-overlay" onClick={() => setShowSubmitModal(false)}>
          <div className="ceo-modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Compose Report to Zuccano Group Board</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setShowSubmitModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ceo-modal-body">
                <div className="ceo-form-group">
                  <label className="ceo-form-label">Report Title</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. ZFIT November 2026 Executive Summary & Capex Request"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Reporting Period Month</label>
                    <select
                      className="ceo-form-select"
                      value={form.month}
                      onChange={(e) => setForm({ ...form, month: e.target.value })}
                    >
                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Fiscal Year</label>
                    <input
                      type="number"
                      className="ceo-form-input"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Monthly Executive Summary</label>
                  <textarea
                    className="ceo-form-textarea"
                    required
                    placeholder="Provide a comprehensive operational summary of subsidiary performance..."
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Key Milestones Achieved (One per line)</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="• Edge mirror latency dropped below 16ms&#10;• Headcount reached 42 engineers&#10;• Zara & H&M agreement signed"
                    value={form.milestones}
                    onChange={(e) => setForm({ ...form, milestones: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Current Challenges & Operational Risks</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="Describe supply chain bottlenecks, talent acquisition needs, or technical risks..."
                    value={form.risksAndMitigation}
                    onChange={(e) => setForm({ ...form, risksAndMitigation: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Resource Requests Requiring Parent Board Authorization</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="Specify international patent funding, cap table changes, or subsidiary buffer requests..."
                    value={form.resourceRequests}
                    onChange={(e) => setForm({ ...form, resourceRequests: e.target.value })}
                  />
                </div>
              </div>

              <div className="ceo-modal-footer">
                <button
                  type="button"
                  className="ceo-action-btn-outline"
                  onClick={() => setShowSubmitModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ceo-action-btn-red" style={{ background: '#E3262E' }}>
                  Transmit Report to Zuccano
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportToZuccanoModule;
