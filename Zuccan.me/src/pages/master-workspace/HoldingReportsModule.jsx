import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  Building,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Shield,
} from 'lucide-react';
import subsidiaryStore from '../../lib/subsidiaryStore';

export const HoldingReportsModule = ({ data, holdingData }) => {
  const [selectedSub, setSelectedSub] = useState('All');

  // Pull real-time submitted reports from subsidiaryStore
  const zfitData = subsidiaryStore.getData('zfit');
  const zfitReports = (zfitData.zuccanoReports || []).map((r) => ({
    ...r,
    subsidiaryName: 'ZFIT Technologies',
    subsidiaryCode: 'ZFIT',
  }));

  const allReports = [...zfitReports];
  const [expandedReportId, setExpandedReportId] = useState(allReports[0]?.id || null);

  const filteredReports = allReports.filter(
    (r) => selectedSub === 'All' || r.subsidiaryCode === selectedSub
  );

  return (
    <div className="holding-reports-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Subsidiary Performance & Governance Disclosures</h1>
          <p className="ceo-module-desc">
            Centralized parent holding review repository. Inspect formal monthly executive operating summaries, technical milestones, operational risks, and resource requests transmitted by subsidiary CEOs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-active">Holding Disclosure Protocol Active</span>
        </div>
      </div>

      {/* ── Filter ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        {['All', 'ZFIT', 'Consumer', 'Business'].map((code) => (
          <button
            key={code}
            type="button"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.74rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: '1px solid',
              borderColor: selectedSub === code ? '#09090B' : '#E4E4E7',
              background: selectedSub === code ? '#09090B' : '#FFFFFF',
              color: selectedSub === code ? '#FFFFFF' : '#52525B',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedSub(code)}
          >
            {code === 'All' ? 'All Entities' : code}
          </button>
        ))}
      </div>

      {/* ── Reports Feed ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredReports.map((rep) => {
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
                    <span className="badge-active" style={{ fontSize: '0.68rem' }}>{rep.subsidiaryName}</span>
                    <span className="badge-neutral" style={{ fontSize: '0.68rem' }}>{rep.month} {rep.year}</span>
                    <span style={{ fontSize: '0.74rem', color: '#71717A' }}>Received: {rep.submittedAt}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', margin: 0 }}>
                    {rep.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge-active">{rep.status}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {isExpanded && (
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#71717A', margin: '0 0 6px' }}>
                      Executive Summary from Subsidiary CEO
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#18181B', lineHeight: 1.6, margin: 0 }}>
                      {rep.summary}
                    </p>
                  </div>

                  {rep.milestones && rep.milestones.length > 0 && (
                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                      <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#16A34A', margin: '0 0 6px' }}>
                        Key Technical & Business Milestones Achieved
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
                      <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#D97706', margin: '0 0 6px' }}>
                        Operational Risks & Foundry Disclosures
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5, margin: 0 }}>
                        {rep.risksAndMitigation}
                      </p>
                    </div>

                    <div style={{ border: '1px solid #E4E4E7', padding: '1rem', borderRadius: '8px' }}>
                      <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#09090B', margin: '0 0 6px' }}>
                        Financial Health & Budget Burn
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5, margin: 0 }}>
                        {rep.financialHealth}
                      </p>
                    </div>
                  </div>

                  {rep.resourceRequests && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', padding: '1rem', borderRadius: '8px' }}>
                      <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#DC2626', margin: '0 0 6px' }}>
                        Requests Requiring Zuccano Holding Board Authorization
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: '#991B1B', lineHeight: 1.5, margin: 0 }}>
                        {rep.resourceRequests}
                      </p>
                    </div>
                  )}

                  <div
                    style={{
                      borderTop: '1px solid #E4E4E7',
                      paddingTop: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem',
                    }}
                  >
                    <div>
                      <span style={{ color: '#71717A' }}>Parent Board Feedback: </span>
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
    </div>
  );
};

export default HoldingReportsModule;
