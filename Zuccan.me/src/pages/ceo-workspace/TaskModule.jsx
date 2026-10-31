import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Clock,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  Users,
  Search,
  Filter,
  X,
  MessageSquare,
} from 'lucide-react';

export const TaskModule = ({ data, onCreateTask, onUpdateTaskStatus }) => {
  const { tasks, projects, employees } = data;
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reviewTask, setReviewTask] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const [newTask, setNewTask] = useState({
    title: '',
    projectId: projects[0]?.id || '',
    projectName: projects[0]?.name || '',
    assigneeName: employees[0]?.name || '',
    assigneeEmail: employees[0]?.email || '',
    department: employees[0]?.department || 'Computer Vision & AI',
    priority: 'High',
    dueDate: '10 Nov 2026',
    description: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTask.title) return;

    onCreateTask(newTask);
    setShowCreateModal(false);
    setNewTask({
      title: '',
      projectId: projects[0]?.id || '',
      projectName: projects[0]?.name || '',
      assigneeName: employees[0]?.name || '',
      assigneeEmail: employees[0]?.email || '',
      department: employees[0]?.department || 'Computer Vision & AI',
      priority: 'High',
      dueDate: '10 Nov 2026',
      description: '',
    });
  };

  const handleApprove = (taskId) => {
    onUpdateTaskStatus(taskId, 'Completed', 'Approved by CEO / Executive Review.');
    setReviewTask(null);
  };

  const handleRequestRevision = (taskId) => {
    onUpdateTaskStatus(taskId, 'Revision Required', reviewNotes || 'Please adjust parameters per specifications.');
    setReviewTask(null);
    setReviewNotes('');
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assigneeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="ceo-tasks-view">
      {/* ── Header ── */}
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Task Orchestration & Deliverable Review</h1>
          <p className="ceo-module-desc">
            Assign work, track implementation progress, inspect submitted code pull requests and engineering deliverables, and sign off or request technical revisions.
          </p>
        </div>

        <button
          type="button"
          className="ceo-action-btn-red"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={14} />
          <span>Assign New Task</span>
        </button>
      </div>

      {/* ── Search and Status Tabs ── */}
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
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Under Review', 'In Progress', 'To Do', 'Revision Required', 'Completed'].map((status) => (
            <button
              key={status}
              type="button"
              style={{
                padding: '0.3rem 0.65rem',
                fontSize: '0.72rem',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '280px' }}>
          <Search size={14} style={{ color: '#71717A' }} />
          <input
            type="text"
            placeholder="Search tasks, assignees..."
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '0.78rem',
              color: '#09090B',
              outline: 'none',
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ── Tasks Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <CheckCircle2 size={15} style={{ color: '#09090B' }} />
            <span>Task Queue</span>
            <span className="ceo-table-count">{filteredTasks.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Task Deliverable</th>
              <th>Project Sprint</th>
              <th>Assignee</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((t) => (
              <tr key={t.id}>
                <td>
                  <div style={{ fontWeight: 700, color: '#09090B' }}>{t.title}</div>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>{t.description}</div>
                  {t.submissionLink && (
                    <a
                      href={t.submissionLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.7rem',
                        color: '#2563EB',
                        marginTop: '4px',
                        textDecoration: 'none',
                      }}
                    >
                      <ExternalLink size={11} />
                      <span>View Submission Deliverable</span>
                    </a>
                  )}
                </td>
                <td style={{ fontSize: '0.76rem', color: '#52525B' }}>{t.projectName}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{t.assigneeName}</div>
                  <div style={{ fontSize: '0.68rem', color: '#71717A' }}>{t.department}</div>
                </td>
                <td>
                  <span className={`priority-${t.priority.toLowerCase()}`}>{t.priority}</span>
                </td>
                <td style={{ color: '#52525B', whiteSpace: 'nowrap' }}>{t.dueDate}</td>
                <td>
                  {t.status === 'Completed' && <span className="badge-active">Completed</span>}
                  {t.status === 'Under Review' && <span className="badge-review">Under Review</span>}
                  {t.status === 'In Progress' && <span className="badge-pending">In Progress</span>}
                  {t.status === 'Revision Required' && <span className="badge-rejected">Revision Req.</span>}
                  {t.status === 'To Do' && <span className="badge-neutral">To Do</span>}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {t.status === 'Under Review' ? (
                    <button
                      type="button"
                      style={{
                        background: '#09090B',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      onClick={() => setReviewTask(t)}
                    >
                      Review & Sign-off
                    </button>
                  ) : t.status === 'Completed' ? (
                    <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 600 }}>✓ Verified</span>
                  ) : (
                    <button
                      type="button"
                      style={{
                        background: '#F4F4F5',
                        border: '1px solid #E4E4E7',
                        color: '#09090B',
                        padding: '0.25rem 0.55rem',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => onUpdateTaskStatus(t.id, 'Completed')}
                    >
                      Mark Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── REVIEW & SIGN-OFF MODAL ── */}
      {reviewTask && (
        <div className="ceo-modal-overlay" onClick={() => setReviewTask(null)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Executive Deliverable Review</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                onClick={() => setReviewTask(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="ceo-modal-body">
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#09090B' }}>
                  {reviewTask.title}
                </h4>
                <div style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  Project: {reviewTask.projectName} • Assignee: {reviewTask.assigneeName}
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '6px', fontSize: '0.78rem' }}>
                <strong style={{ display: 'block', marginBottom: '4px', color: '#09090B' }}>
                  Submitted Work & Verification Link:
                </strong>
                <a
                  href={reviewTask.submissionLink || '#'}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#2563EB', wordBreak: 'break-all' }}
                >
                  {reviewTask.submissionLink || 'Direct code review submitted to core repo.'}
                </a>
                <p style={{ marginTop: '6px', color: '#52525B', fontStyle: 'italic' }}>
                  "{reviewTask.submissionNotes || 'All edge benchmark tests passed without regressions.'}"
                </p>
              </div>

              <div className="ceo-form-group">
                <label className="ceo-form-label">Feedback / Revision Guidance (if requesting changes):</label>
                <textarea
                  className="ceo-form-textarea"
                  placeholder="Specify required adjustments, performance constraints, or code fixes..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="ceo-modal-footer">
              <button
                type="button"
                style={{
                  background: '#FEE2E2',
                  color: '#DC2626',
                  border: '1px solid #FECACA',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={() => handleRequestRevision(reviewTask.id)}
              >
                Request Revision
              </button>
              <button
                type="button"
                className="ceo-action-btn-red"
                style={{ background: '#16A34A' }}
                onClick={() => handleApprove(reviewTask.id)}
              >
                Approve Deliverable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE TASK MODAL ── */}
      {showCreateModal && (
        <div className="ceo-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="ceo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ceo-modal-header">
              <h3 className="ceo-modal-title">Assign Deliverable Task</h3>
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
                  <label className="ceo-form-label">Task Deliverable Title</label>
                  <input
                    type="text"
                    required
                    className="ceo-form-input"
                    placeholder="e.g. Implement WebGL Fallback for 3D Cloth Drape"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Associated Project</label>
                  <select
                    className="ceo-form-select"
                    value={newTask.projectId}
                    onChange={(e) => {
                      const p = projects.find((prj) => prj.id === e.target.value);
                      setNewTask({
                        ...newTask,
                        projectId: e.target.value,
                        projectName: p?.name || '',
                      });
                    }}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Assignee</label>
                    <select
                      className="ceo-form-select"
                      value={newTask.assigneeName}
                      onChange={(e) => {
                        const emp = employees.find((em) => em.name === e.target.value);
                        setNewTask({
                          ...newTask,
                          assigneeName: e.target.value,
                          assigneeEmail: emp?.email || '',
                          department: emp?.department || '',
                        });
                      }}
                    >
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.name}>{emp.name} ({emp.department})</option>
                      ))}
                    </select>
                  </div>

                  <div className="ceo-form-group">
                    <label className="ceo-form-label">Priority</label>
                    <select
                      className="ceo-form-select"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Deadline</label>
                  <input
                    type="text"
                    className="ceo-form-input"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>

                <div className="ceo-form-group">
                  <label className="ceo-form-label">Task Instructions & Criteria</label>
                  <textarea
                    className="ceo-form-textarea"
                    placeholder="Provide exact deliverables, repo links, and testing benchmarks..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
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
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskModule;
