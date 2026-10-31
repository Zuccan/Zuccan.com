import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Filter,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';

export const LeaveModule = ({ data, onApproveLeave }) => {
  const { leaveRequests } = data;
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLeaves = leaveRequests.filter(
    (l) => statusFilter === 'All' || l.status === statusFilter
  );

  return (
    <div className="ceo-leave-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Leave Management & Approvals</h1>
          <p className="ceo-module-desc">
            Review departmental time-off requests. Delegated authority allows Department Heads and CFO to sign off on their teams, while executive leaves escalate to the CEO.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-neutral">Leave Policy: 24 Paid Days / Year</span>
        </div>
      </div>

      {/* ── Status Tabs ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
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

      {/* ── Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Calendar size={15} style={{ color: '#09090B' }} />
            <span>Leave Requests Queue</span>
            <span className="ceo-table-count">{filteredLeaves.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Reason & Justification</th>
              <th>Designated Approver</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((lev) => (
              <tr key={lev.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{lev.employeeName}</strong>
                </td>
                <td>{lev.department}</td>
                <td>
                  <span className="badge-neutral">{lev.type}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{lev.days} Days</div>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>
                    {lev.startDate} to {lev.endDate}
                  </div>
                </td>
                <td style={{ color: '#52525B', maxWidth: '240px' }}>
                  "{lev.reason}"
                </td>
                <td style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  {lev.approver || 'Department Head'}
                </td>
                <td>
                  {lev.status === 'Approved' && <span className="badge-active">Approved</span>}
                  {lev.status === 'Pending' && <span className="badge-pending">Pending</span>}
                  {lev.status === 'Rejected' && <span className="badge-rejected">Rejected</span>}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {lev.status === 'Pending' ? (
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
                        onClick={() => onApproveLeave(lev.id, true)}
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
                        onClick={() => onApproveLeave(lev.id, false)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#71717A' }}>Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveModule;
