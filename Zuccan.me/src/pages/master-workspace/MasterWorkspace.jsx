import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import holdingStore from '../../lib/holdingStore';
import './MasterWorkspace.css';

// 12 Primary Holding Modules
import HoldingOverviewModule from './HoldingOverviewModule';
import SubsidiaryDirectoryModule from './SubsidiaryDirectoryModule';
import OwnershipEquityModule from './OwnershipEquityModule';
import LeadershipGovernanceModule from './LeadershipGovernanceModule';
import ParentApprovalsModule from './ParentApprovalsModule';
import HoldingReportsModule from './HoldingReportsModule';
import ParentFinanceModule from './ParentFinanceModule';
import CorporateDocumentsModule from './CorporateDocumentsModule';
import StatutoryComplianceModule from './StatutoryComplianceModule';
import HoldingAuditLogsModule from './HoldingAuditLogsModule';
import HoldingCommsModule from './HoldingCommsModule';
import AccessAdminModule from './AccessAdminModule';

export default function MasterWorkspace() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const [activeModule, setActiveModule] = useState(initialTab);
  const [holdingData, setHoldingData] = useState(() => holdingStore.getData());
  const [activePersona, setActivePersona] = useState({
    name: 'Parent Holding Admin',
    role: 'Master Workspace Administrator',
    designation: 'Group Holding Authority',
  });

  useEffect(() => {
    const unsub = holdingStore.subscribe((data) => {
      setHoldingData({ ...data });
    });
    return unsub;
  }, []);

  const handleTabChange = (tabId) => {
    setActiveModule(tabId);
    setSearchParams({ tab: tabId });
  };

  const pendingApprovalsCount = holdingData.parentApprovals?.filter(
    (a) => a.status === 'Pending' || a.status === 'Under Review'
  ).length || 0;

  const subsidiariesCount = holdingData.subsidiaries?.length || 0;

  return (
    <div className="holding-layout">
      {/* ════════════ SIDEBAR ════════════ */}
      <aside className="holding-sidebar">
        <div className="holding-sidebar-header">
          <div className="holding-brand-row">
            <div className="holding-brand-logo">
              <span className="holding-brand-name">ZUCCANO</span>
              <span className="holding-brand-dot">.</span>
            </div>
            <span className="holding-tier-tag">HOLDING HQ</span>
          </div>

          <div className="holding-entity-badge">
            <div className="holding-entity-icon">Z</div>
            <div className="holding-entity-info">
              <div className="holding-entity-title">{holdingData.identity.brandName} Group Holdings</div>
              <div className="holding-entity-sub">CIN: {holdingData.identity.cin.slice(0, 14)}...</div>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="holding-nav-scroll">
          {/* Group 1: Corporate Overview */}
          <div className="holding-nav-group">
            <div className="holding-nav-label">Executive View</div>
            <button
              className={`holding-nav-item ${activeModule === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabChange('overview')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Master Overview</span>
            </button>

            <button
              className={`holding-nav-item ${activeModule === 'subsidiaries' ? 'active' : ''}`}
              onClick={() => handleTabChange('subsidiaries')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M9 11h2M9 15h2M13 11h2M13 15h2"></path>
              </svg>
              <span>Subsidiaries</span>
              <span className="holding-nav-badge">{subsidiariesCount}</span>
            </button>
          </div>

          {/* Group 2: Governance & Cap Table */}
          <div className="holding-nav-group">
            <div className="holding-nav-label">Governance & Equity</div>
            <button
              className={`holding-nav-item ${activeModule === 'ownership' ? 'active' : ''}`}
              onClick={() => handleTabChange('ownership')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <pie-chart></pie-chart>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a10 10 0 0 1 10 10h-10z"></path>
              </svg>
              <span>Ownership & Cap Table</span>
            </button>

            <button
              className={`holding-nav-item ${activeModule === 'leadership' ? 'active' : ''}`}
              onClick={() => handleTabChange('leadership')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Leadership Directory</span>
            </button>

            <button
              className={`holding-nav-item ${activeModule === 'approvals' ? 'active' : ''}`}
              onClick={() => handleTabChange('approvals')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span>Parent Approvals</span>
              {pendingApprovalsCount > 0 && (
                <span className="holding-nav-badge urgent">{pendingApprovalsCount}</span>
              )}
            </button>

            <button
              className={`holding-nav-item ${activeModule === 'reports' ? 'active' : ''}`}
              onClick={() => handleTabChange('reports')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Subsidiary Reports</span>
            </button>
          </div>

          {/* Group 3: Treasury & Legal Repository */}
          <div className="holding-nav-group">
            <div className="holding-nav-label">Treasury & Legal</div>
            <button
              className={`holding-nav-item ${activeModule === 'finance' ? 'active' : ''}`}
              onClick={() => handleTabChange('finance')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span>Parent Finance</span>
            </button>

            <button
              className={`holding-nav-item ${activeModule === 'documents' ? 'active' : ''}`}
              onClick={() => handleTabChange('documents')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Corporate Documents</span>
            </button>

            <button
              className={`holding-nav-item ${activeModule === 'compliance' ? 'active' : ''}`}
              onClick={() => handleTabChange('compliance')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 14 14"></polyline>
              </svg>
              <span>RoC & Compliance</span>
            </button>
          </div>

          {/* Group 4: Administration & Channels */}
          <div className="holding-nav-group">
            <div className="holding-nav-label">Holding Infrastructure</div>
            <button
              className={`holding-nav-item ${activeModule === 'comms' ? 'active' : ''}`}
              onClick={() => handleTabChange('comms')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Communication Center</span>
            </button>

            <button
              className={`holding-nav-item ${activeModule === 'audit-logs' ? 'active' : ''}`}
              onClick={() => handleTabChange('audit-logs')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>Audit Logs</span>
            </button>

            <button
              className={`holding-nav-item ${activeModule === 'access' ? 'active' : ''}`}
              onClick={() => handleTabChange('access')}
            >
              <svg className="holding-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Access & Permissions</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="holding-sidebar-footer">
          <div className="holding-user-pill">
            <div className="holding-user-avatar">
              {activePersona.name.charAt(0)}
            </div>
            <div className="holding-user-info">
              <div className="holding-user-name">{activePersona.name}</div>
              <div className="holding-user-role">{activePersona.role}</div>
            </div>
          </div>
          <button
            className="mw-btn mw-btn-ghost"
            style={{ padding: '4px 6px', fontSize: '11px' }}
            title="Return to Product Selector"
            onClick={() => navigate('/choose-product')}
          >
            Exit
          </button>
        </div>
      </aside>

      {/* ════════════ MAIN VIEWPORT ════════════ */}
      <main className="holding-main-viewport">
        {/* Top App Bar */}
        <header className="holding-app-bar">
          <div className="holding-breadcrumbs">
            <span className="holding-crumb-parent">Zuccano Group Holdings</span>
            <span className="holding-crumb-sep">/</span>
            <span className="holding-crumb-active">
              {activeModule === 'overview' && 'Master Overview'}
              {activeModule === 'subsidiaries' && 'Subsidiaries Directory & Corporate Profiles'}
              {activeModule === 'ownership' && 'Holding & Subsidiary Cap Table Registry'}
              {activeModule === 'leadership' && 'Group Leadership & Executive Directory'}
              {activeModule === 'approvals' && 'Parent-Level Approvals & Decisions'}
              {activeModule === 'reports' && 'Subsidiary Reports & Disclosures'}
              {activeModule === 'finance' && 'Parent Holding Treasury & Ledgers'}
              {activeModule === 'documents' && 'Corporate Legal Depository'}
              {activeModule === 'compliance' && 'RoC Filings & Statutory Governance'}
              {activeModule === 'comms' && 'Executive Communication Center'}
              {activeModule === 'audit-logs' && 'Immutable Corporate Audit Logs'}
              {activeModule === 'access' && 'Identity & Role-Based Access Control'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Direct Link to Subsidiary CEO Workspace */}
            <button
              className="mw-btn mw-btn-outline"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => navigate('/workspace/zfit?role=ceo')}
            >
              <span>🌐 Open ZFIT Subsidiary Workspace</span>
            </button>

            {/* Persona Switcher */}
            <select
              className="mw-input"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
              value={activePersona.name}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'Parent Holding Admin') {
                  setActivePersona({
                    name: 'Parent Holding Admin',
                    role: 'Master Workspace Administrator',
                    designation: 'Group Holding Authority',
                  });
                } else if (val === 'Naseer') {
                  setActivePersona({
                    name: 'Naseer',
                    role: 'Founding Shareholder (51%)',
                    designation: 'Class A Voting Partner',
                  });
                } else if (val === 'Pavan') {
                  setActivePersona({
                    name: 'Pavan',
                    role: 'Co-Founding Shareholder (40%) & Director',
                    designation: 'CEO (ZFIT Subsidiary)',
                  });
                } else {
                  setActivePersona({
                    name: 'Corporate Secretariat',
                    role: 'Parent Governance Officer',
                    designation: 'Statutory Secretarial Lead',
                  });
                }
              }}
            >
              <option value="Parent Holding Admin">Admin: Parent Holding Admin</option>
              <option value="Naseer">Shareholder: Naseer (51% Holding)</option>
              <option value="Pavan">Director: Pavan (40% Holding & ZFIT CEO)</option>
              <option value="Corporate Secretariat">Officer: Corporate Secretariat</option>
            </select>
          </div>
        </header>

        {/* Dynamic Content Canvas */}
        <div className="holding-scroll-canvas">
          {activeModule === 'overview' && (
            <HoldingOverviewModule
              data={holdingData}
              holdingData={holdingData}
              onNavigate={handleTabChange}
              onSelectSubsidiary={(id) => handleTabChange('subsidiaries')}
            />
          )}

          {activeModule === 'subsidiaries' && (
            <SubsidiaryDirectoryModule
              data={holdingData}
              holdingData={holdingData}
              onCreateSubsidiary={(sub) => holdingStore.createSubsidiary(sub)}
              onUpdateSubsidiary={(id, updates) => holdingStore.updateSubsidiary(id, updates)}
              onSelectSubsidiary={(id) => handleTabChange('subsidiaries')}
            />
          )}

          {activeModule === 'ownership' && (
            <OwnershipEquityModule
              data={holdingData}
              holdingData={holdingData}
              onRecordTransaction={(tx) => holdingStore.recordShareTransaction(tx)}
            />
          )}

          {activeModule === 'leadership' && (
            <LeadershipGovernanceModule
              data={holdingData}
              holdingData={holdingData}
            />
          )}

          {activeModule === 'approvals' && (
            <ParentApprovalsModule
              data={holdingData}
              holdingData={holdingData}
              onUpdateApprovalStatus={(id, status, comment) => holdingStore.updateApprovalStatus(id, status, comment)}
            />
          )}

          {activeModule === 'reports' && (
            <HoldingReportsModule
              data={holdingData}
              holdingData={holdingData}
            />
          )}

          {activeModule === 'finance' && (
            <ParentFinanceModule
              data={holdingData}
              holdingData={holdingData}
            />
          )}

          {activeModule === 'documents' && (
            <CorporateDocumentsModule
              data={holdingData}
              holdingData={holdingData}
            />
          )}

          {activeModule === 'compliance' && (
            <StatutoryComplianceModule
              data={holdingData}
              holdingData={holdingData}
            />
          )}

          {activeModule === 'comms' && (
            <HoldingCommsModule
              data={holdingData}
              holdingData={holdingData}
            />
          )}

          {activeModule === 'audit-logs' && (
            <HoldingAuditLogsModule
              data={holdingData}
              holdingData={holdingData}
            />
          )}

          {activeModule === 'access' && (
            <AccessAdminModule
              data={holdingData}
              holdingData={holdingData}
            />
          )}
        </div>
      </main>
    </div>
  );
}
