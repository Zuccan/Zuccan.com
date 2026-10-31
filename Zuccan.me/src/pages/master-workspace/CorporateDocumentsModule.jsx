import React, { useState } from 'react';
import {
  FileText,
  Lock,
  Download,
  Upload,
  Search,
  Shield,
  Calendar,
} from 'lucide-react';

import holdingStore from '../../lib/holdingStore';

export const CorporateDocumentsModule = ({ data, holdingData }) => {
  const currentData = data || holdingData || holdingStore.getData();
  const { corporateDocuments = [] } = currentData || {};
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Incorporation & Statutory', 'Governance Charter', 'Subsidiary Equity & Investment', 'Board Resolutions'];

  const filteredDocs = corporateDocuments.filter(
    (d) => selectedCat === 'All' || d.category === selectedCat
  );

  return (
    <div className="holding-documents-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Corporate Legal Depository & Board Vault</h1>
          <p className="ceo-module-desc">
            Central repository for statutory incorporation certificates, Articles of Association (AoA), Shareholder Agreements (SHA), Board Resolutions, and parent governance instruments.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          style={{ background: '#09090B' }}
          onClick={() => alert('Secure board instrument upload protocol initialized.')}
        >
          <Upload size={14} />
          <span>Upload Board Instrument</span>
        </button>
      </div>

      {/* ── Category Filters ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', overflowX: 'auto' }}>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.74rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: '1px solid',
              borderColor: selectedCat === c ? '#09090B' : '#E4E4E7',
              background: selectedCat === c ? '#09090B' : '#FFFFFF',
              color: selectedCat === c ? '#FFFFFF' : '#52525B',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onClick={() => setSelectedCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ── Documents Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <FileText size={15} style={{ color: '#09090B' }} />
            <span>Master Governance Documents</span>
            <span className="ceo-table-count">{filteredDocs.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Document Title & Reference</th>
              <th>Category</th>
              <th>Format & Size</th>
              <th>Execution Date</th>
              <th>Access Tier</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{doc.title}</strong>
                  <div style={{ fontSize: '0.68rem', color: '#71717A' }}>
                    Ref: {doc.refNumber}
                  </div>
                </td>
                <td>
                  <span className="badge-neutral">{doc.category}</span>
                </td>
                <td style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  {doc.format} • {doc.fileSize}
                </td>
                <td style={{ color: '#52525B', fontSize: '0.74rem' }}>{doc.date}</td>
                <td>
                  <span className="badge-review">
                    <Lock size={10} style={{ display: 'inline', marginRight: '4px' }} />
                    {doc.confidentiality}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    style={{
                      background: '#F4F4F5',
                      border: '1px solid #E4E4E7',
                      color: '#09090B',
                      padding: '0.25rem 0.55rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => alert(`Accessing certified file: ${doc.title}`)}
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CorporateDocumentsModule;
