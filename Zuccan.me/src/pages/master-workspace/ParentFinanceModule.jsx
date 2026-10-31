import React from 'react';
import {
  CreditCard,
  DollarSign,
  PieChart,
  Shield,
  TrendingUp,
  FileText,
  Building,
  CheckCircle2,
} from 'lucide-react';

import holdingStore from '../../lib/holdingStore';

export const ParentFinanceModule = ({ data, holdingData }) => {
  const currentData = data || holdingData || holdingStore.getData();
  const { parentFinance = {}, identity = {} } = currentData || {};

  return (
    <div className="holding-finance-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Parent Holding Treasury & Intercompany Capital</h1>
          <p className="ceo-module-desc">
            Manages Zuccano Group Holdings Ltd. standalone financial ledger. Subsidiary finances remain legally separate and are not merged into parent cash balances.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-active">Separate Legal Ledger Enforced</span>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="ceo-metrics-row">
        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Liquid Parent Holding Reserves</div>
          <div className="ceo-metric-value" style={{ color: '#16A34A' }}>
            {identity.currencySymbol}{(parentFinance.reservesCash / 10000000).toFixed(2)} Cr
          </div>
          <div className="ceo-metric-subtext">
            <span>Treasury reserves in HDFC / ICICI Corporate</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Capital Deployed Across Subsidiaries</div>
          <div className="ceo-metric-value">
            {identity.currencySymbol}{(parentFinance.totalInvestedInSubsidiaries / 10000000).toFixed(2)} Cr
          </div>
          <div className="ceo-metric-subtext">
            <span>Intercompany equity & seed investments</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Parent Operating Budget FY26</div>
          <div className="ceo-metric-value">
            {identity.currencySymbol}{(parentFinance.parentAnnualBudget / 10000000).toFixed(2)} Cr
          </div>
          <div className="ceo-metric-subtext">
            <span>Utilized: {identity.currencySymbol}{(parentFinance.parentOperatingSpend / 10000000).toFixed(2)} Cr</span>
          </div>
        </div>
      </div>

      {/* ── Intercompany Investments Ledger ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Building size={15} style={{ color: '#09090B' }} />
            <span>Intercompany Investments & Equity Disbursements to Subsidiaries</span>
            <span className="ceo-table-count">{parentFinance.intercompanyInvestments.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Subsidiary Entity</th>
              <th>Investment Structure</th>
              <th>Capital Deployed</th>
              <th>Equity Stake Acquired</th>
              <th>Investment Date</th>
              <th>Governance Terms</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parentFinance.intercompanyInvestments.map((inv) => (
              <tr key={inv.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{inv.subsidiary}</strong>
                </td>
                <td>
                  <span className="badge-neutral">{inv.type}</span>
                </td>
                <td>
                  <strong style={{ color: '#09090B' }}>
                    {identity.currencySymbol}{(inv.amount / 10000000).toFixed(2)} Cr
                  </strong>
                </td>
                <td>
                  <strong style={{ color: '#E3262E' }}>{inv.equityAcquired}</strong>
                </td>
                <td style={{ fontSize: '0.74rem', color: '#71717A' }}>{inv.date}</td>
                <td style={{ fontSize: '0.74rem', color: '#52525B' }}>{inv.terms}</td>
                <td>
                  <span className="badge-active">{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Parent Operating Expenses ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <CreditCard size={15} style={{ color: '#09090B' }} />
            <span>Zuccano Group Holdings Ltd. — Standalone Corporate Operating Spend</span>
            <span className="ceo-table-count">{parentFinance.parentExpenses.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Expense / Audit Requisition</th>
              <th>Vendor / Counsel</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parentFinance.parentExpenses.map((pex) => (
              <tr key={pex.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{pex.title}</strong>
                </td>
                <td>{pex.vendor}</td>
                <td style={{ fontWeight: 700, color: '#09090B' }}>
                  {identity.currencySymbol}{pex.amount.toLocaleString('en-IN')}
                </td>
                <td>
                  <span className="badge-neutral">{pex.category}</span>
                </td>
                <td style={{ color: '#71717A', fontSize: '0.74rem' }}>{pex.date}</td>
                <td>
                  <span className="badge-active">{pex.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentFinanceModule;
