import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  CreditCard,
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  X,
  PieChart,
} from 'lucide-react';

export const FinanceModule = ({ data, onApproveExpense, onAddExpense }) => {
  const { expenses, departments, identity } = data;
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  const [newExp, setNewExp] = useState({
    title: '',
    department: departments[0]?.name || 'Hardware & OS Engineering',
    amount: 150000,
    category: 'R&D Equipment',
    submittedBy: 'Kavita Sundaram',
    invoiceNumber: 'INV-NEW-001',
    notes: '',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newExp.title) return;

    onAddExpense({
      ...newExp,
      amount: Number(newExp.amount),
    });

    setShowAddModal(false);
    setNewExp({
      title: '',
      department: departments[0]?.name || 'Hardware & OS Engineering',
      amount: 150000,
      category: 'R&D Equipment',
      submittedBy: 'Kavita Sundaram',
      invoiceNumber: 'INV-NEW-001',
      notes: '',
    });
  };

  const remainingBudget = identity.fiscalBudget - identity.utilizedBudget;
  const burnPercent = Math.round((identity.utilizedBudget / identity.fiscalBudget) * 100);

  const filteredExpenses = expenses.filter(
    (e) => filterCategory === 'All' || e.category === filterCategory
  );

  return (
    <div className="ceo-finance-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Fiscal Operations, Capex & Budgets</h1>
          <p className="ceo-module-desc">
            Executive financial oversight. Managed in coordination with the Subsidiary CFO (Sameer K. Ali). Review capex requisitions, sign off on vendor invoices, and track departmental burn.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={14} />
          <span>New Expense Requisition</span>
        </button>
      </div>

      {/* ── Metric Cards ── */}
      <div className="ceo-metrics-row">
        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Annual Authorized Fiscal Budget</div>
          <div className="ceo-metric-value">
            {identity.currencySymbol}{(identity.fiscalBudget / 10000000).toFixed(2)} Cr
          </div>
          <div className="ceo-metric-subtext">
            <span>Allocated for {identity.fiscalYear}</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Utilized Capital (Burn)</div>
          <div className="ceo-metric-value" style={{ color: '#E3262E' }}>
            {identity.currencySymbol}{(identity.utilizedBudget / 10000000).toFixed(2)} Cr
          </div>
          <div className="ceo-metric-subtext">
            <span>{burnPercent}% of allocated funds</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Remaining Operating Reserves</div>
          <div className="ceo-metric-value" style={{ color: '#16A34A' }}>
            {identity.currencySymbol}{(remainingBudget / 10000000).toFixed(2)} Cr
          </div>
          <div className="ceo-metric-subtext">
            <span>Liquid subsidiary reserves</span>
          </div>
        </div>
      </div>

      {/* ── Departmental Allocation Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <PieChart size={15} style={{ color: '#09090B' }} />
            <span>Departmental Budget Allocations & Utilization</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Allocated Budget</th>
              <th>Utilized Spend</th>
              <th>Burn %</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => {
              const pct = d.allocatedBudget > 0 ? Math.round((d.utilizedBudget / d.allocatedBudget) * 100) : 0;
              return (
                <tr key={d.id}>
                  <td>
                    <strong style={{ color: '#09090B' }}>{d.name}</strong> ({d.code})
                  </td>
                  <td>{identity.currencySymbol}{(d.allocatedBudget / 100000).toFixed(1)} Lakhs</td>
                  <td>{identity.currencySymbol}{(d.utilizedBudget / 100000).toFixed(1)} Lakhs</td>
                  <td style={{ width: '160px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '6px', background: '#E4E4E7', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: pct > 80 ? '#E3262E' : '#16A34A' }} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>{pct}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={pct > 80 ? 'badge-pending' : 'badge-active'}>
                      {pct > 80 ? 'High Burn' : 'Normal'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Operational Expense & Invoice Ledger ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <CreditCard size={15} style={{ color: '#09090B' }} />
            <span>Operational Expenses & Invoices Ledger</span>
            <span className="ceo-table-count">{filteredExpenses.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Requisition / Item</th>
              <th>Department</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Invoice #</th>
              <th>Submitted By</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>CEO Sign-off</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{exp.title}</strong>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>{exp.notes}</div>
                </td>
                <td>{exp.department}</td>
                <td>
                  <span className="badge-neutral">{exp.category}</span>
                </td>
                <td style={{ fontWeight: 700, color: '#09090B' }}>
                  {identity.currencySymbol}{exp.amount.toLocaleString('en-IN')}
                </td>
                <td style={{ fontSize: '0.74rem', color: '#71717A' }}>{exp.invoiceNumber}</td>
                <td>{exp.submittedBy}</td>
                <td>
                  {exp.status === 'Approved' && <span className="badge-active">Approved</span>}
                  {exp.status === 'Pending Approval' && <span className="badge-pending">Pending CEO</span>}
                  {exp.status === 'Rejected' && <span className="badge-rejected">Rejected</span>}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {exp.status === 'Pending Approval' ? (
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        style={{
                          background: '#16A34A',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                        onClick={() => onApproveExpense(exp.id, true)}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        style={{
                          background: '#F4F4F5',
                          color: '#52525B',
                          border: '1px solid #E4E4E7',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                        onClick={() => onApproveExpense(exp.id, false)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#71717A' }}>Closed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CREATE EXPENSE MODAL ── */}
      {showAddModal && (
        <div className="ceo-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">New Expense Requisition</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd}>
              <div className="ceo-modal-body">
                <div className="ceo-form-group">
                  <label className="ceo-form-label">Expense Description / Requisition Item</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. Schott Glass Anti-Glare Coating Samples"
                    value={newExp.title}
                    onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Department</label>
                    <select
                      className="ceo-form-select"
                      value={newExp.department}
                      onChange={(e) => setNewExp({ ...newExp, department: e.target.value })}
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Amount ({identity.currencySymbol})</label>
                    <input
                      type="number"
                      required
                      className="ceo-form-input"
                      value={newExp.amount}
                      onChange={(e) => setNewExp({ ...newExp, amount: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Expense Category</label>
                    <select
                      className="ceo-form-select"
                      value={newExp.category}
                      onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                    >
                      <option value="R&D Equipment">R&D Equipment</option>
                      <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                      <option value="Prototyping">Prototyping</option>
                      <option value="Marketing & Events">Marketing & Events</option>
                      <option value="Legal & Patents">Legal & Patents</option>
                    </select>
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Invoice / Quotation Reference</label>
                    <input
                      type="text"
                      className="ceo-form-input"
                      value={newExp.invoiceNumber}
                      onChange={(e) => setNewExp({ ...newExp, invoiceNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Business Justification</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="Provide procurement justification for CEO sign-off..."
                    value={newExp.notes}
                    onChange={(e) => setNewExp({ ...newExp, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="ceo-modal-footer">
                <button
                  type="button"
                  className="ceo-action-btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ceo-action-btn-red">
                  Submit Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceModule;
