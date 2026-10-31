import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Crown,
  Users,
  Layers,
  Briefcase,
  CheckCircle2,
  Clock,
  Calendar,
  CreditCard,
  FileText,
  Megaphone,
  BarChart3,
  Send,
  MessageSquare,
  LogOut,
  Shield,
  Search,
  Bell,
  Sparkles,
  ChevronRight,
  Database,
} from 'lucide-react';
import subsidiaryStore from '../../lib/subsidiaryStore';
import { isSupabaseConfigured } from '../../lib/supabase';
import './CeoWorkspace.css';

// Module Components
import OverviewModule from './OverviewModule';
import LeadershipModule from './LeadershipModule';
import EmployeeModule from './EmployeeModule';
import DepartmentModule from './DepartmentModule';
import ProjectModule from './ProjectModule';
import TaskModule from './TaskModule';
import AttendanceModule from './AttendanceModule';
import LeaveModule from './LeaveModule';
import FinanceModule from './FinanceModule';
import CalendarModule from './CalendarModule';
import DocumentModule from './DocumentModule';
import AnnouncementModule from './AnnouncementModule';
import ReportsModule from './ReportsModule';
import ReportToZuccanoModule from './ReportToZuccanoModule';
import CommsModule from './CommsModule';

export const CeoWorkspace = () => {
  const { productId = 'zfit' } = useParams();
  const navigate = useNavigate();

  // Active module navigation
  const [activeModule, setActiveModule] = useState('overview');

  // Load user session
  const storedUser = localStorage.getItem('zuccano_user');
  const user = storedUser
    ? JSON.parse(storedUser)
    : { role: 'CEO', email: 'pavan.ceo@zfit.zuccano.me', name: 'Pavan Zuccano', product: productId };

  // Reactive Subsidiary Data from Store
  const [subsidiaryData, setSubsidiaryData] = useState(() =>
    subsidiaryStore.getData(productId)
  );

  useEffect(() => {
    // Sync when productId changes
    setSubsidiaryData(subsidiaryStore.getData(productId));

    // Subscribe to real-time store changes
    const unsubscribe = subsidiaryStore.subscribe(({ subsidiaryId, data }) => {
      if (subsidiaryId === productId) {
        setSubsidiaryData({ ...data });
      }
    });

    return () => unsubscribe();
  }, [productId]);

  const handleLogout = () => {
    localStorage.removeItem('zuccano_user');
    navigate('/login');
  };

  // Module Actions delegates
  const handleAppointLeadership = (member) => {
    subsidiaryStore.appointLeadership(productId, member);
  };

  const handleRemoveLeadership = (memberId) => {
    try {
      subsidiaryStore.removeLeadership(productId, memberId);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleCreateDepartment = (dept) => {
    subsidiaryStore.createDepartment(productId, dept);
  };

  const handleAddEmployee = (emp) => {
    subsidiaryStore.addEmployee(productId, emp);
  };

  const handleUpdateEmployeeStatus = (employeeId, status) => {
    subsidiaryStore.updateEmployeeStatus(productId, employeeId, status);
  };

  const handleCreateProject = (project) => {
    subsidiaryStore.createProject(productId, project);
  };

  const handleCreateTask = (task) => {
    subsidiaryStore.createTask(productId, task);
  };

  const handleUpdateTaskStatus = (taskId, status, notes) => {
    subsidiaryStore.updateTaskStatus(productId, taskId, status, notes);
  };

  const handleApproveLeave = (leaveId, isApproved) => {
    subsidiaryStore.approveLeave(productId, leaveId, isApproved, user.name || 'Pavan Zuccano (CEO)');
  };

  const handleApproveExpense = (expenseId, isApproved) => {
    subsidiaryStore.approveExpense(productId, expenseId, isApproved, user.name || 'Pavan Zuccano (CEO)');
  };

  const handleAddExpense = (exp) => {
    subsidiaryStore.addExpense(productId, exp);
  };

  const handlePublishAnnouncement = (ann) => {
    subsidiaryStore.publishAnnouncement(productId, ann);
  };

  const handleSubmitReportToZuccano = (report) => {
    subsidiaryStore.submitReportToZuccano(productId, report);
  };

  // Badge counts
  const pendingLeavesCount = subsidiaryData.leaveRequests.filter((l) => l.status === 'Pending').length;
  const pendingExpensesCount = subsidiaryData.expenses.filter((e) => e.status === 'Pending Approval').length;
  const underReviewTasksCount = subsidiaryData.tasks.filter((t) => t.status === 'Under Review').length;

  return (
    <div className="ceo-layout">
      {/* ════════════ EXECUTIVE SIDEBAR ════════════ */}
      <aside className="ceo-sidebar">
        {/* Brand & Subsidiary ID */}
        <div className="ceo-sidebar-header">
          <div className="ceo-brand-row">
            <Link to="/choose-product" className="ceo-parent-brand">
              <span className="ceo-brand-zuccano">zuccano</span>
              <span className="ceo-brand-dot">.</span>
            </Link>
            <span className="ceo-entity-tag">Holding</span>
          </div>

          <div className="ceo-subsidiary-card">
            <div className="ceo-subsidiary-avatar">
              {subsidiaryData.identity.shortName.slice(0, 2)}
            </div>
            <div className="ceo-subsidiary-meta">
              <div className="ceo-subsidiary-name">{subsidiaryData.identity.name}</div>
              <div className="ceo-subsidiary-role">
                <span className="ceo-role-badge-gold">👑 Subsidiary CEO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="ceo-nav-scroll">
          {/* Group 1: Operations */}
          <div className="ceo-nav-group">
            <div className="ceo-nav-label">Operations</div>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveModule('overview')}
            >
              <LayoutDashboard size={16} className="ceo-nav-icon" />
              <span>Overview</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'leadership' ? 'active' : ''}`}
              onClick={() => setActiveModule('leadership')}
            >
              <Crown size={16} className="ceo-nav-icon" />
              <span>Leadership Structure</span>
              <span className="ceo-nav-badge">{subsidiaryData.leadership.length}</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'employees' ? 'active' : ''}`}
              onClick={() => setActiveModule('employees')}
            >
              <Users size={16} className="ceo-nav-icon" />
              <span>Employees</span>
              <span className="ceo-nav-badge">{subsidiaryData.identity.totalHeadcount}</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'departments' ? 'active' : ''}`}
              onClick={() => setActiveModule('departments')}
            >
              <Layers size={16} className="ceo-nav-icon" />
              <span>Departments</span>
              <span className="ceo-nav-badge">{subsidiaryData.departments.length}</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveModule('projects')}
            >
              <Briefcase size={16} className="ceo-nav-icon" />
              <span>Projects</span>
              <span className="ceo-nav-badge">{subsidiaryData.projects.length}</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveModule('tasks')}
            >
              <CheckCircle2 size={16} className="ceo-nav-icon" />
              <span>Tasks & Approvals</span>
              {underReviewTasksCount > 0 && (
                <span className="ceo-nav-badge urgent">{underReviewTasksCount}</span>
              )}
            </button>
          </div>

          {/* Group 2: Governance & Fiscal */}
          <div className="ceo-nav-group">
            <div className="ceo-nav-label">Governance & Fiscal</div>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'attendance' ? 'active' : ''}`}
              onClick={() => setActiveModule('attendance')}
            >
              <Clock size={16} className="ceo-nav-icon" />
              <span>Attendance</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'leave' ? 'active' : ''}`}
              onClick={() => setActiveModule('leave')}
            >
              <Calendar size={16} className="ceo-nav-icon" />
              <span>Leave Requests</span>
              {pendingLeavesCount > 0 && (
                <span className="ceo-nav-badge urgent">{pendingLeavesCount}</span>
              )}
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'finance' ? 'active' : ''}`}
              onClick={() => setActiveModule('finance')}
            >
              <CreditCard size={16} className="ceo-nav-icon" />
              <span>Finance & Capex</span>
              {pendingExpensesCount > 0 && (
                <span className="ceo-nav-badge urgent">{pendingExpensesCount}</span>
              )}
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveModule('calendar')}
            >
              <Calendar size={16} className="ceo-nav-icon" />
              <span>Company Calendar</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveModule('documents')}
            >
              <FileText size={16} className="ceo-nav-icon" />
              <span>Documents Vault</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'announcements' ? 'active' : ''}`}
              onClick={() => setActiveModule('announcements')}
            >
              <Megaphone size={16} className="ceo-nav-icon" />
              <span>Announcements</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveModule('reports')}
            >
              <BarChart3 size={16} className="ceo-nav-icon" />
              <span>Operational Reports</span>
            </button>
          </div>

          {/* Group 3: Holding Bridge & Comms */}
          <div className="ceo-nav-group">
            <div className="ceo-nav-label">Holding & Comms</div>

            <button
              type="button"
              className={`ceo-nav-item ceo-nav-item-zuccano ${activeModule === 'report-to-zuccano' ? 'active' : ''}`}
              onClick={() => setActiveModule('report-to-zuccano')}
            >
              <Send size={16} className="ceo-nav-icon" />
              <span>Report to Zuccano</span>
            </button>

            <button
              type="button"
              className={`ceo-nav-item ${activeModule === 'comms' ? 'active' : ''}`}
              onClick={() => setActiveModule('comms')}
            >
              <MessageSquare size={16} className="ceo-nav-icon" />
              <span>Realtime Team Comms</span>
              <span className="ceo-nav-badge">Supabase</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer User & Logout */}
        <div className="ceo-sidebar-footer">
          <div className="ceo-user-pill">
            <div className="ceo-user-avatar">
              {user.name ? user.name.split(' ').map((n) => n[0]).join('') : 'PZ'}
            </div>
            <div className="ceo-user-info">
              <div className="ceo-user-name">{user.name || 'Pavan Zuccano'}</div>
              <div className="ceo-user-role">Subsidiary CEO</div>
            </div>
          </div>

          <button
            type="button"
            className="ceo-logout-btn"
            title="Sign out of Subsidiary Workspace"
            onClick={handleLogout}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* ════════════ MAIN VIEWPORT ════════════ */}
      <main className="ceo-main-viewport">
        {/* Top App Bar */}
        <header className="ceo-app-bar">
          <div className="ceo-breadcrumbs">
            <span className="ceo-crumb-parent">Zuccano Holding</span>
            <span className="ceo-crumb-sep">/</span>
            <span className="ceo-crumb-parent">{subsidiaryData.identity.shortName}</span>
            <span className="ceo-crumb-sep">/</span>
            <span className="ceo-crumb-active">
              {activeModule.replace(/-/g, ' ').toUpperCase()}
            </span>
          </div>

          <div className="ceo-app-actions">
            <div className="ceo-quick-badge">
              <span className="ceo-status-dot-pulse" />
              <span>{isSupabaseConfigured ? 'Supabase DB Connected' : 'Local Cluster Active'}</span>
            </div>

            <button
              type="button"
              className="ceo-action-btn-outline"
              onClick={() => navigate('/choose-product')}
            >
              Switch Subsidiary
            </button>

            {activeModule !== 'report-to-zuccano' && (
              <button
                type="button"
                className="ceo-action-btn-red"
                style={{ background: '#E3262E' }}
                onClick={() => setActiveModule('report-to-zuccano')}
              >
                <Send size={13} />
                <span>Report to Zuccano</span>
              </button>
            )}
          </div>
        </header>

        {/* Scrollable Module Body */}
        <div className="ceo-module-body">
          {activeModule === 'overview' && (
            <OverviewModule
              data={subsidiaryData}
              onNavigate={(mod) => setActiveModule(mod)}
              onApproveLeave={handleApproveLeave}
              onApproveExpense={handleApproveExpense}
            />
          )}

          {activeModule === 'leadership' && (
            <LeadershipModule
              data={subsidiaryData}
              onAppointLeadership={handleAppointLeadership}
              onRemoveLeadership={handleRemoveLeadership}
            />
          )}

          {activeModule === 'employees' && (
            <EmployeeModule
              data={subsidiaryData}
              onAddEmployee={handleAddEmployee}
              onUpdateEmployeeStatus={handleUpdateEmployeeStatus}
            />
          )}

          {activeModule === 'departments' && (
            <DepartmentModule
              data={subsidiaryData}
              onCreateDepartment={handleCreateDepartment}
            />
          )}

          {activeModule === 'projects' && (
            <ProjectModule
              data={subsidiaryData}
              onCreateProject={handleCreateProject}
            />
          )}

          {activeModule === 'tasks' && (
            <TaskModule
              data={subsidiaryData}
              onCreateTask={handleCreateTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          )}

          {activeModule === 'attendance' && (
            <AttendanceModule data={subsidiaryData} />
          )}

          {activeModule === 'leave' && (
            <LeaveModule
              data={subsidiaryData}
              onApproveLeave={handleApproveLeave}
            />
          )}

          {activeModule === 'finance' && (
            <FinanceModule
              data={subsidiaryData}
              onApproveExpense={handleApproveExpense}
              onAddExpense={handleAddExpense}
            />
          )}

          {activeModule === 'calendar' && (
            <CalendarModule data={subsidiaryData} />
          )}

          {activeModule === 'documents' && (
            <DocumentModule data={subsidiaryData} />
          )}

          {activeModule === 'announcements' && (
            <AnnouncementModule
              data={subsidiaryData}
              onPublishAnnouncement={handlePublishAnnouncement}
            />
          )}

          {activeModule === 'reports' && (
            <ReportsModule data={subsidiaryData} />
          )}

          {activeModule === 'report-to-zuccano' && (
            <ReportToZuccanoModule
              data={subsidiaryData}
              onSubmitReport={handleSubmitReportToZuccano}
            />
          )}

          {activeModule === 'comms' && (
            <CommsModule
              subsidiaryId={productId}
              user={user}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CeoWorkspace;
