import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  Shield,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const EmployeeModule = ({ data, onAddEmployee, onUpdateEmployeeStatus }) => {
  const { employees, departments } = data;
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // New Employee Form State
  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    phone: '',
    department: departments[0]?.name || 'Computer Vision & AI',
    designation: '',
    reportingManager: 'Vikramaditya Roy',
    salaryBand: 'L4',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email) return;

    onAddEmployee({
      ...newEmp,
    });

    setShowAddModal(false);
    setNewEmp({
      name: '',
      email: '',
      phone: '',
      department: departments[0]?.name || 'Computer Vision & AI',
      designation: '',
      reportingManager: 'Vikramaditya Roy',
      salaryBand: 'L4',
    });
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="ceo-employee-view">
      {/* ── Header Bar ── */}
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Employee Directory & Talent Management</h1>
          <p className="ceo-module-desc">
            Manage subsidiary talent roster. Onboard new engineers and specialists, assign departments and reporting managers, oversee attendance metrics, and handle organizational transfers.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          onClick={() => setShowAddModal(true)}
        >
          <UserPlus size={14} />
          <span>Onboard New Employee</span>
        </button>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '400px' }}>
          <Search size={15} style={{ color: '#71717A' }} />
          <input
            type="text"
            placeholder="Search by name, email, or designation..."
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '0.82rem',
              color: '#09090B',
              outline: 'none',
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.72rem', color: '#71717A', fontWeight: 600 }}>Department:</span>
            <select
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.75rem',
                border: '1px solid #E4E4E7',
                borderRadius: '4px',
                background: '#FFFFFF',
              }}
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.72rem', color: '#71717A', fontWeight: 600 }}>Status:</span>
            <select
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.75rem',
                border: '1px solid #E4E4E7',
                borderRadius: '4px',
                background: '#FFFFFF',
              }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Deactivated">Deactivated</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Employee Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Users size={15} style={{ color: '#09090B' }} />
            <span>Active Team Members</span>
            <span className="ceo-table-count">{filteredEmployees.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Reporting Manager</th>
              <th>Attendance Rate</th>
              <th>Tasks Active</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div style={{ fontWeight: 700, color: '#09090B' }}>{emp.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>{emp.email}</div>
                </td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td style={{ color: '#52525B' }}>{emp.reportingManager}</td>
                <td>
                  <span style={{ fontWeight: 700, color: '#16A34A', fontSize: '0.78rem' }}>
                    {emp.attendanceRate || '98%'}
                  </span>
                </td>
                <td>
                  <span className="badge-neutral">{emp.assignedTasks || 0} tasks</span>
                </td>
                <td>
                  <span className={emp.status === 'Active' ? 'badge-active' : 'badge-neutral'}>
                    {emp.status}
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
                      marginRight: '6px',
                    }}
                    onClick={() => setSelectedEmployee(emp)}
                  >
                    View Dossier
                  </button>
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: emp.status === 'Active' ? '#DC2626' : '#16A34A',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                    onClick={() =>
                      onUpdateEmployeeStatus(emp.id, emp.status === 'Active' ? 'Deactivated' : 'Active')
                    }
                  >
                    {emp.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── EMPLOYEE DOSSIER MODAL ── */}
      {selectedEmployee && (
        <div className="ceo-modal-overlay" onClick={() => setSelectedEmployee(null)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Employee Operational Dossier</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setSelectedEmployee(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="ceo-modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #E4E4E7', paddingBottom: '1rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '8px',
                    background: '#09090B',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                  }}
                >
                  {selectedEmployee.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#09090B' }}>
                    {selectedEmployee.name}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
                    {selectedEmployee.designation} • {selectedEmployee.department}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: '#71717A', display: 'block', fontSize: '0.7rem' }}>Corporate Email</span>
                  <strong>{selectedEmployee.email}</strong>
                </div>
                <div>
                  <span style={{ color: '#71717A', display: 'block', fontSize: '0.7rem' }}>Phone</span>
                  <strong>{selectedEmployee.phone || '+91 97310 00000'}</strong>
                </div>
                <div>
                  <span style={{ color: '#71717A', display: 'block', fontSize: '0.7rem' }}>Reporting Manager</span>
                  <strong>{selectedEmployee.reportingManager}</strong>
                </div>
                <div>
                  <span style={{ color: '#71717A', display: 'block', fontSize: '0.7rem' }}>Joining Date</span>
                  <strong>{selectedEmployee.joinDate}</strong>
                </div>
                <div>
                  <span style={{ color: '#71717A', display: 'block', fontSize: '0.7rem' }}>Salary Level Band</span>
                  <strong>{selectedEmployee.salaryBand || 'L4 Senior'}</strong>
                </div>
                <div>
                  <span style={{ color: '#71717A', display: 'block', fontSize: '0.7rem' }}>Attendance Metric</span>
                  <strong style={{ color: '#16A34A' }}>{selectedEmployee.attendanceRate || '98%'}</strong>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E4E4E7', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#71717A', letterSpacing: '0.04em' }}>
                  Active Work Assignments
                </span>
                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', marginTop: '6px', fontSize: '0.78rem' }}>
                  • Assigned tasks: {selectedEmployee.assignedTasks || 3} active sprints in current milestone.
                  <br />
                  • Last PR merged: Optical Body Mesh landmarks optimization (Commit: `8af1c92`).
                </div>
              </div>
            </div>

            <div className="ceo-modal-footer">
              <button
                type="button"
                className="ceo-action-btn-outline"
                onClick={() => setSelectedEmployee(null)}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ONBOARD NEW EMPLOYEE MODAL ── */}
      {showAddModal && (
        <div className="ceo-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Onboard New Subsidiary Employee</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="ceo-modal-body">
                <div className="ceo-form-group">
                  <label className="ceo-form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. Shruti Nair"
                    value={newEmp.name}
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Corporate Email</label>
                    <input
                      type="email"
                      required
                      className="ceo-form-input"
                      placeholder="shruti.n@zfit.zuccano.me"
                      value={newEmp.email}
                      onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    />
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Phone</label>
                    <input
                      type="text"
                      className="ceo-form-input"
                      placeholder="+91 98450 00000"
                      value={newEmp.phone}
                      onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Assigned Department</label>
                  <select
                    className="ceo-form-select"
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>{d.name} ({d.code})</option>
                    ))}
                  </select>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Designation / Role Title</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. Optical Calibration Engineer"
                    value={newEmp.designation}
                    onChange={(e) => setNewEmp({ ...newEmp, designation: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Reporting Manager</label>
                    <input
                      type="text"
                      className="ceo-form-input"
                      value={newEmp.reportingManager}
                      onChange={(e) => setNewEmp({ ...newEmp, reportingManager: e.target.value })}
                    />
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Salary Band</label>
                    <select
                      className="ceo-form-select"
                      value={newEmp.salaryBand}
                      onChange={(e) => setNewEmp({ ...newEmp, salaryBand: e.target.value })}
                    >
                      <option value="L3">L3 — Junior Engineer</option>
                      <option value="L4">L4 — Mid Engineer / Lead</option>
                      <option value="L5">L5 — Senior Architect</option>
                      <option value="L6">L6 — Principal Lead</option>
                    </select>
                  </div>
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
                  Complete Onboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeModule;
