import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Users,
  Target,
  ArrowRight,
  X,
} from 'lucide-react';

export const ProjectModule = ({ data, onCreateProject }) => {
  const { projects, departments, identity } = data;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const [newProj, setNewProj] = useState({
    name: '',
    department: departments[0]?.name || 'Computer Vision & AI',
    manager: '',
    priority: 'High',
    status: 'In Progress',
    targetDate: '30 Jun 2026',
    budget: 5000000,
    objective: '',
    deliverablesCount: 10,
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProj.name) return;

    onCreateProject({
      ...newProj,
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    });

    setShowCreateModal(false);
    setNewProj({
      name: '',
      department: departments[0]?.name || 'Computer Vision & AI',
      manager: '',
      priority: 'High',
      status: 'In Progress',
      targetDate: '30 Jun 2026',
      budget: 5000000,
      objective: '',
      deliverablesCount: 10,
    });
  };

  const filteredProjects = projects.filter(
    (p) => statusFilter === 'All' || p.status === statusFilter
  );

  return (
    <div className="ceo-projects-view">
      {/* ── Header ── */}
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Projects & Operational Deliverables</h1>
          <p className="ceo-module-desc">
            Direct high-impact strategic initiatives. Assign project managers, allocate departmental capital, track milestone completion, and enforce delivery deadlines.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={14} />
          <span>Initiate Project</span>
        </button>
      </div>

      {/* ── Filter Row ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        {['All', 'In Progress', 'Planning', 'Completed', 'On Hold'].map((status) => (
          <button
            key={status}
            type="button"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.74rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: '1px solid',
              borderColor: statusFilter === status ? '#09090B' : '#E4E4E7',
              background: statusFilter === status ? '#09090B' : '#FFFFFF',
              color: statusFilter === status ? '#FFFFFF' : '#52525B',
              cursor: 'pointer',
            }}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ── Projects Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Briefcase size={15} style={{ color: '#09090B' }} />
            <span>Active Project Sprints</span>
            <span className="ceo-table-count">{filteredProjects.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Project Name & Code</th>
              <th>Department</th>
              <th>Lead / Manager</th>
              <th>Priority</th>
              <th>Budget</th>
              <th>Deliverables Progress</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((proj) => (
              <tr key={proj.id}>
                <td>
                  <div style={{ fontWeight: 700, color: '#09090B' }}>{proj.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>
                    {proj.code} • {proj.objective}
                  </div>
                </td>
                <td>{proj.department}</td>
                <td>{proj.manager}</td>
                <td>
                  <span className={`priority-${proj.priority.toLowerCase()}`}>
                    {proj.priority}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, fontSize: '0.78rem' }}>
                    {identity.currencySymbol}{(proj.budget / 100000).toFixed(1)}L
                  </span>
                </td>
                <td style={{ width: '160px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '6px', background: '#E4E4E7', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${proj.progress}%`,
                          height: '100%',
                          background: proj.progress > 70 ? '#16A34A' : '#E3262E',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>{proj.progress}%</span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#71717A', marginTop: '2px' }}>
                    {proj.completedDeliverables || 8}/{proj.deliverablesCount || 10} deliverables
                  </div>
                </td>
                <td>
                  <span className={proj.status === 'In Progress' ? 'badge-active' : 'badge-neutral'}>
                    {proj.status}
                  </span>
                </td>
                <td style={{ color: '#52525B', whiteSpace: 'nowrap' }}>{proj.targetDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── INITIATE PROJECT MODAL ── */}
      {showCreateModal && (
        <div className="ceo-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Initiate Strategic Project</h3>
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
                  <label className="ceo-form-label">Project Title</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. Optical Sensor Telemetry Suite v3"
                    value={newProj.name}
                    onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Department</label>
                    <select
                      className="ceo-form-select"
                      value={newProj.department}
                      onChange={(e) => setNewProj({ ...newProj, department: e.target.value })}
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Project Manager</label>
                    <input
                      type="text"
                      required
                      className="ceo-form-input"
                      placeholder="e.g. Kavita Sundaram"
                      value={newProj.manager}
                      onChange={(e) => setNewProj({ ...newProj, manager: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Priority</label>
                    <select
                      className="ceo-form-select"
                      value={newProj.priority}
                      onChange={(e) => setNewProj({ ...newProj, priority: e.target.value })}
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Capex Budget ({identity.currencySymbol})</label>
                    <input
                      type="number"
                      className="ceo-form-input"
                      value={newProj.budget}
                      onChange={(e) => setNewProj({ ...newProj, budget: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Target Completion Date</label>
                  <input
                    type="text"
                    className="ceo-form-input"
                    value={newProj.targetDate}
                    onChange={(e) => setNewProj({ ...newProj, targetDate: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Project Mission & Key Deliverables</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="Describe technical objectives, milestone deliverables, and success metrics..."
                    value={newProj.objective}
                    onChange={(e) => setNewProj({ ...newProj, objective: e.target.value })}
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
                  Launch Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModule;
