import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Users,
  Briefcase,
  DollarSign,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  PieChart,
  TrendingUp,
} from 'lucide-react';

export const DepartmentModule = ({ data, onCreateDepartment }) => {
  const { departments, employees, projects, identity } = data;
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newDept, setNewDept] = useState({
    name: '',
    code: '',
    headName: '',
    allocatedBudget: 5000000,
    description: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.code) return;

    onCreateDepartment({
      name: newDept.name,
      code: newDept.code.toUpperCase(),
      headName: newDept.headName || 'Acting Head',
      allocatedBudget: Number(newDept.allocatedBudget),
      description: newDept.description || 'Subsidiary operational division.',
    });

    setShowCreateModal(false);
    setNewDept({
      name: '',
      code: '',
      headName: '',
      allocatedBudget: 5000000,
      description: '',
    });
  };

  return (
    <div className="ceo-department-view">
      {/* ── Header ── */}
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Department Architecture & Workload</h1>
          <p className="ceo-module-desc">
            Organize subsidiary operations into dynamic departments. Assign department heads, allocate operational capex budgets, monitor headcount, and balance project workload.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={14} />
          <span>Create Department</span>
        </button>
      </div>

      {/* ── Department Grid Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        {departments.map((dept) => {
          const deptEmployees = employees.filter((e) => e.department === dept.name);
          const deptProjects = projects.filter((p) => p.department === dept.name);
          const burnRate = dept.allocatedBudget > 0 ? Math.round((dept.utilizedBudget / dept.allocatedBudget) * 100) : 0;

          return (
            <div
              key={dept.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: '10px',
                padding: '1.25rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge-neutral" style={{ fontWeight: 700 }}>{dept.code}</span>
                  <span style={{ fontSize: '0.72rem', color: '#71717A' }}>
                    {dept.activeProjects || deptProjects.length} Active Sprints
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', margin: '0 0 4px' }}>
                  {dept.name}
                </h3>
                <p style={{ fontSize: '0.76rem', color: '#71717A', margin: '0 0 1rem', lineHeight: 1.4 }}>
                  {dept.description}
                </p>

                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.76rem' }}>
                  <div style={{ color: '#52525B', marginBottom: '2px' }}>Department Head:</div>
                  <strong style={{ color: '#09090B' }}>{dept.headName}</strong>
                </div>

                {/* Budget Utilization Bar */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px' }}>
                    <span style={{ color: '#71717A' }}>Budget Burn:</span>
                    <strong>{identity.currencySymbol}{(dept.utilizedBudget / 100000).toFixed(1)}L / {(dept.allocatedBudget / 100000).toFixed(1)}L ({burnRate}%)</strong>
                  </div>
                  <div style={{ height: '6px', background: '#E4E4E7', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${burnRate}%`, height: '100%', background: burnRate > 80 ? '#E3262E' : '#16A34A' }} />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #F4F4F5', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem' }}>
                <span style={{ color: '#52525B' }}>
                  <Users size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {dept.memberCount || deptEmployees.length} Team Members
                </span>
                <span className="badge-active">Operating</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CREATE DEPARTMENT MODAL ── */}
      {showCreateModal && (
        <div className="ceo-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Create Dynamic Department</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="ceo-modal-body">
                <div className="ceo-form-group">
                  <label className="ceo-form-label">Department Name</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. Embedded Firmware & QA"
                    value={newDept.name}
                    onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Code / Acronym</label>
                    <input
                      type="text"
                      required
                      className="ceo-form-input"
                      placeholder="e.g. EMB-QA"
                      value={newDept.code}
                      onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
                    />
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Allocated Annual Budget ({identity.currencySymbol})</label>
                    <input
                      type="number"
                      required
                      className="ceo-form-input"
                      placeholder="5000000"
                      value={newDept.allocatedBudget}
                      onChange={(e) => setNewDept({ ...newDept, allocatedBudget: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Department Head / Lead</label>
                  <input
                    type="text"
                    className="ceo-form-input"
                    placeholder="Designate an executive lead or acting manager..."
                    value={newDept.headName}
                    onChange={(e) => setNewDept({ ...newDept, headName: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Department Scope & Purpose</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="Define operational objectives and deliverables..."
                    value={newDept.description}
                    onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="ceo-modal-footer">
                <button
                  type="button"
                  className="ceo-action-btn-outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ceo-action-btn-red">
                  Establish Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentModule;
