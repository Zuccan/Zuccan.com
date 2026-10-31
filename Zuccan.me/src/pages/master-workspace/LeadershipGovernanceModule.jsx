import React, { useState } from 'react';
import {
  Users,
  Crown,
  Shield,
  Search,
  Filter,
  CheckCircle2,
  Building,
} from 'lucide-react';
import subsidiaryStore from '../../lib/subsidiaryStore';
import holdingStore from '../../lib/holdingStore';

export const LeadershipGovernanceModule = ({ data, holdingData }) => {
  const currentData = data || holdingData || holdingStore.getData();
  const { subsidiaries = [] } = currentData || {};
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Combine parent leadership + subsidiary leadership rosters
  const parentLeaders = [
    {
      id: 'p-lead-1',
      name: 'Naseer',
      designation: 'Founding Shareholder & Director',
      company: 'Zuccano Group Holdings',
      department: 'Parent Board of Directors',
      reportingTo: 'Board of Shareholders',
      email: 'naseer@zuccano.me',
      status: 'Active',
      tier: 'Parent Board',
    },
    {
      id: 'p-lead-2',
      name: 'Pavan',
      designation: 'Co-Founding Shareholder & Director',
      company: 'Zuccano Group Holdings',
      department: 'Parent Board of Directors',
      reportingTo: 'Board of Shareholders',
      email: 'pavan@zuccano.me',
      status: 'Active',
      tier: 'Parent Board',
    },
  ];

  // Retrieve subsidiary leadership from subsidiaryStore
  const zfitData = subsidiaryStore.getData('zfit');
  const zfitLeaders = (zfitData.leadership || []).map((l) => ({
    ...l,
    company: 'ZFIT Technologies',
    tier: l.roleType === 'CEO' ? 'Subsidiary CEO' : 'Subsidiary Leadership',
  }));

  const allLeaders = [...parentLeaders, ...zfitLeaders];

  const filteredLeaders = allLeaders.filter((l) => {
    const matchesCompany = selectedCompany === 'All' || l.company.toLowerCase().includes(selectedCompany.toLowerCase());
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCompany && matchesSearch;
  });

  return (
    <div className="holding-leadership-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Group Executive Leadership & Governance Directory</h1>
          <p className="ceo-module-desc">
            Centralized directory of parent holding directors and subsidiary leadership teams. Subsidiary CEOs retain delegated authority to manage their internal appointments without requiring parent pre-approval.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-active">Delegated Autonomy Enforced</span>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: '#FAFAFA',
          border: '1px solid #E4E4E7',
          borderRadius: '8px',
          padding: '0.65rem 1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '320px' }}>
          <Search size={14} style={{ color: '#71717A' }} />
          <input
            type="text"
            placeholder="Search leadership across all entities..."
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '0.8rem',
              color: '#09090B',
              outline: 'none',
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', color: '#71717A', fontWeight: 600 }}>Entity Filter:</span>
          <select
            style={{
              padding: '0.3rem 0.6rem',
              fontSize: '0.75rem',
              border: '1px solid #E4E4E7',
              borderRadius: '4px',
              background: '#FFFFFF',
            }}
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="All">All Corporate Entities</option>
            <option value="Zuccano Group Holdings">Zuccano Group Holdings</option>
            <option value="ZFIT">ZFIT Technologies</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Users size={15} style={{ color: '#09090B' }} />
            <span>Executive Roster Across Group</span>
            <span className="ceo-table-count">{filteredLeaders.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Leader Name</th>
              <th>Designation</th>
              <th>Corporate Entity</th>
              <th>Department</th>
              <th>Governance Tier</th>
              <th>Reporting Line</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaders.map((l) => (
              <tr key={l.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{l.name}</strong>
                  <div style={{ fontSize: '0.68rem', color: '#71717A' }}>{l.email}</div>
                </td>
                <td>{l.designation}</td>
                <td>
                  <span style={{ fontWeight: 600 }}>{l.company}</span>
                </td>
                <td>{l.department}</td>
                <td>
                  <span
                    className={
                      l.tier === 'Parent Board'
                        ? 'badge-active'
                        : l.tier === 'Subsidiary CEO'
                        ? 'badge-review'
                        : 'badge-neutral'
                    }
                  >
                    {l.tier}
                  </span>
                </td>
                <td style={{ color: '#52525B', fontSize: '0.74rem' }}>{l.reportingTo}</td>
                <td>
                  <span className="badge-active">{l.status || 'Active'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadershipGovernanceModule;
