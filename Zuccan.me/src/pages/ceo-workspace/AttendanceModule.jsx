import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Users,
  MapPin,
  Search,
} from 'lucide-react';

export const AttendanceModule = ({ data }) => {
  const { attendanceRecords, identity } = data;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRecords = attendanceRecords.filter((rec) => {
    const matchesSearch =
      rec.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const presentCount = attendanceRecords.filter((r) => r.status === 'Present').length;
  const lateCount = attendanceRecords.filter((r) => r.status === 'Late').length;
  const leaveCount = attendanceRecords.filter((r) => r.status === 'On Leave').length;

  return (
    <div className="ceo-attendance-view">
      <div className="ceo-module-header">
        <div>
          <h1 className="ceo-module-title">Daily Attendance & Lab Presence</h1>
          <p className="ceo-module-desc">
            Company-wide telemetry of physical lab and remote engineering presence. Monitor on-time check-ins, prototyping bay presence, and automated punch logs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-active">
            ✓ Lab Biometrics Synchronized (09:00 AM IST)
          </span>
        </div>
      </div>

      {/* ── Metric Highlights ── */}
      <div className="ceo-metrics-row">
        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Checked In Today</div>
          <div className="ceo-metric-value" style={{ color: '#16A34A' }}>
            {presentCount + lateCount} / {attendanceRecords.length}
          </div>
          <div className="ceo-metric-subtext">
            <span>{presentCount} on-time arrivals</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Late Arrivals</div>
          <div className="ceo-metric-value" style={{ color: lateCount > 0 ? '#D97706' : '#09090B' }}>
            {lateCount}
          </div>
          <div className="ceo-metric-subtext">
            <span>Arrival after 09:30 AM threshold</span>
          </div>
        </div>

        <div className="ceo-metric-card">
          <div className="ceo-metric-label">Authorized Leaves</div>
          <div className="ceo-metric-value">
            {leaveCount}
          </div>
          <div className="ceo-metric-subtext">
            <span>Approved by CFO / Department Leads</span>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAFAFA',
          border: '1px solid #E4E4E7',
          borderRadius: '8px',
          padding: '0.65rem 1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Present', 'Late', 'On Leave'].map((st) => (
            <button
              key={st}
              type="button"
              style={{
                padding: '0.3rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: '1px solid',
                borderColor: statusFilter === st ? '#09090B' : '#E4E4E7',
                background: statusFilter === st ? '#09090B' : '#FFFFFF',
                color: statusFilter === st ? '#FFFFFF' : '#52525B',
                cursor: 'pointer',
              }}
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '280px' }}>
          <Search size={14} style={{ color: '#71717A' }} />
          <input
            type="text"
            placeholder="Search records by employee or department..."
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

      {/* ── Table ── */}
      <div className="ceo-table-container">
        <div className="ceo-table-header-bar">
          <div className="ceo-table-title">
            <Clock size={15} style={{ color: '#09090B' }} />
            <span>Attendance Log (Date: {new Date().toISOString().slice(0, 10)})</span>
            <span className="ceo-table-count">{filteredRecords.length}</span>
          </div>
        </div>

        <table className="ceo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Physical Location / Station</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong style={{ color: '#09090B' }}>{r.employeeName}</strong>
                </td>
                <td>{r.department}</td>
                <td style={{ fontWeight: 600 }}>{r.checkIn}</td>
                <td style={{ color: '#71717A' }}>{r.checkOut}</td>
                <td style={{ color: '#52525B' }}>
                  <MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#71717A' }} />
                  {r.location}
                </td>
                <td>
                  {r.status === 'Present' && <span className="badge-active">Present</span>}
                  {r.status === 'Late' && <span className="badge-pending">Late Arrival</span>}
                  {r.status === 'On Leave' && <span className="badge-neutral">On Leave</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceModule;
