import React from 'react';
import { Shield, AlertCircle, CheckCircle, Info } from 'lucide-react';

export const OwnershipTable = () => {
  return (
    <div className="ownership-transparency-card">
      {/* 1. Parent Holding Entity Cap Table */}
      <div className="editorial-table-container">
        <div className="table-caption-bar">
          <span>TABLE 1.1 — ZUCCANO GROUP HOLDINGS PRIVATE LIMITED (PARENT ENTITY)</span>
          <span className="font-mono text-xs">CIN: U72900KA2025PTC184920</span>
        </div>
        <table className="editorial-table">
          <thead>
            <tr>
              <th>Shareholder Name</th>
              <th>Statutory Role</th>
              <th>Share Class</th>
              <th>Equity Ownership</th>
              <th>Statutory Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="highlight-row">
              <td>
                <strong>Naseer</strong>
              </td>
              <td>Founding Shareholder</td>
              <td>Class A Equity (Voting)</td>
              <td className="table-percentage">51.0%</td>
              <td>
                Majority equity shareholder in Zuccano Group Holdings. Does <em>not</em> personally own ZFIT shares; the 51% ZFIT stake is held by Zuccano corporate treasury.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Board Members</strong>
              </td>
              <td>Governing Board & Strategic Allocation Pool</td>
              <td>Class A/B Equity</td>
              <td className="table-percentage">49.0%</td>
              <td>
                Governing Board & strategic reserve governed under Parent Articles of Association.
              </td>
            </tr>
            <tr style={{ background: '#FAFAFA', fontWeight: 'bold' }}>
              <td>
                <strong>TOTAL VERIFIED PARENT CAPITAL</strong>
              </td>
              <td>100% Authorized & Paid Up</td>
              <td>Equity Shares (₹10 Par)</td>
              <td className="table-percentage">100.0%</td>
              <td>Full voting control vested under parent Articles of Association (AoA).</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. ZFIT Technologies Subsidiary Cap Table */}
      <div className="editorial-table-container">
        <div className="table-caption-bar">
          <span>TABLE 1.2 — ZFIT TECHNOLOGIES (SUBSIDIARY / PRODUCT COMPANY)</span>
          <span className="font-mono text-xs">GOVERNED UNDER ZUCCANO HOLDINGS</span>
        </div>
        <table className="editorial-table">
          <thead>
            <tr>
              <th>Holding Participant</th>
              <th>Legal Corporate Relationship</th>
              <th>Allocated Percentage</th>
              <th>Statutory Verification Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="highlight-row">
              <td>
                <strong>Zuccano Group Holdings Private Limited</strong>
              </td>
              <td>Parent Holding Corporation (Majority Control)</td>
              <td className="table-percentage">51.0%</td>
              <td>
                <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-xs">
                  <CheckCircle size={13} /> Formally Executed & Board Approved
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Board Members</strong>
              </td>
              <td>Governing Board & Executive Allocation Pool</td>
              <td className="table-percentage font-mono text-neutral-900 font-bold">40.0%</td>
              <td>
                <span className="inline-flex items-center gap-1 text-neutral-700 font-semibold text-xs">
                  <CheckCircle size={13} /> Allocated under Governing Board filings
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Unassigned Minority Pool / Secondary Allotments</strong>
              </td>
              <td>Product Founders, ESOP & Strategic Reserve</td>
              <td className="table-percentage font-mono text-amber-800">9.0%</td>
              <td>
                <span className="inline-flex items-center gap-1 text-amber-700 font-semibold text-xs">
                  <Info size={13} /> Subject to Verified Subsidiary Records & Board Filings
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Strict Distinction between Operational Designations & Share Ownership */}
      <div className="role-distinction-banner">
        <div className="role-banner-title">
          <AlertCircle size={16} />
          <span>MANDATORY STATUTORY DISTINCTION: TITLES VS. LEGAL OWNERSHIP</span>
        </div>
        <p className="role-banner-body">
          Indian corporate law (Companies Act, 2013) enforces an uncompromised distinction between operational designations and statutory share ownership. 
          Holding an executive title, administrative login, or company designation does <strong>never</strong> constitute proof of legal share ownership. 
          Legal equity ownership is proven <strong>exclusively</strong> through entries on the company's official <em>Register of Members (MGT-1)</em>, issued share certificates (SH-1), and return of allotment filings (PAS-3) with the Registrar of Companies (RoC).
        </p>

        <div className="role-pills-row">
          <div className="role-pill">
            <strong>Shareholder:</strong> Legal equity owner recorded on Register of Members.
          </div>
          <div className="role-pill">
            <strong>Product Founder:</strong> Operational co-builder; equity contingent on vesting.
          </div>
          <div className="role-pill">
            <strong>CEO:</strong> Chief Executive Officer; operational leadership role appointed by Board.
          </div>
          <div className="role-pill">
            <strong>Director:</strong> Fiduciary officer registered on MCA with valid DIN under Sec 166.
          </div>
          <div className="role-pill">
            <strong>Employee:</strong> Service personnel engaged under employment contract.
          </div>
          <div className="role-pill">
            <strong>Workspace Admin:</strong> Technical/IT permission with zero statutory ownership rights.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnershipTable;
