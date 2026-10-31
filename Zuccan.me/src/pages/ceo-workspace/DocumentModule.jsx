import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Lock,
  Folder,
  Shield,
  Eye,
  Search,
} from 'lucide-react';

export const DocumentModule = ({ data }) => {
  const { documents } = data;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Corporate Governance', 'Patents & Technology', 'HR & People Operations', 'Finance & Compliance'];

  const filteredDocs = documents.filter(
    (d) => selectedCategory === 'All' || d.category === selectedCategory
  );

  return (
    <div className="ceo-documents-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Corporate Documents & Legal Vault</h1>
          <p className="ceo-module-desc">
            Secure subsidiary document depository. Access company operating charters, patent drafts, NDA contracts, tax audits, and manage role-based permission tiers.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          onClick={() => alert('Document upload vault initialized. Drag and drop file to ingest.')}
        >
          <Upload size={14} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* ── Category Tabs ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.74rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: '1px solid',
              borderColor: selectedCategory === cat ? '#09090B' : '#E4E4E7',
              background: selectedCategory === cat ? '#09090B' : '#FFFFFF',
              color: selectedCategory === cat ? '#FFFFFF' : '#52525B',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <FileText size={15} style={{ color: '#09090B' }} />
            <span>Authorized Document Depository</span>
            <span className="ceo-table-count">{filteredDocs.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Category</th>
              <th>Format & Size</th>
              <th>Uploaded By</th>
              <th>Access Tier</th>
              <th>Upload Date</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{doc.title}</strong>
                </td>
                <td>
                  <span className="badge-neutral">{doc.category}</span>
                </td>
                <td style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  {doc.format} • {doc.fileSize}
                </td>
                <td>{doc.uploadedBy}</td>
                <td>
                  <span
                    className={
                      doc.accessRole.includes('CEO')
                        ? 'badge-active'
                        : doc.accessRole.includes('Leadership')
                        ? 'badge-review'
                        : 'badge-neutral'
                    }
                  >
                    <Lock size={10} style={{ display: 'inline', marginRight: '4px' }} />
                    {doc.accessRole}
                  </span>
                </td>
                <td style={{ color: '#71717A' }}>{doc.uploadedAt}</td>
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
                    onClick={() => alert(`Accessing encrypted file: ${doc.title}`)}
                  >
                    Download
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

export default DocumentModule;
