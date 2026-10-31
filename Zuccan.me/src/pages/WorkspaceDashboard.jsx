import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Crown,
  Users,
  Briefcase,
  ArrowLeft,
  LogOut,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Link as LinkIcon,
  Plus,
  TrendingUp,
  Activity,
  Layers,
  ShieldAlert,
  Search,
  Filter,
  Check,
  RotateCcw,
  Sparkles,
  BarChart3,
  Calendar,
  Eye,
  MessageSquare,
  Send,
  Hash,
  Radio,
  Smile,
  ShieldCheck,
  Database
} from 'lucide-react';
import { messageService } from '../lib/messageService';
import { isSupabaseConfigured } from '../lib/supabase';
import './WorkspaceDashboard.css';

const PRODUCT_CONFIG = {
  zfit: {
    id: 'zfit',
    name: 'ZFIT',
    dot: '.',
    tagline: 'Smart Mirror & AI Virtual Fitting Ecosystem',
    accentColor: '#E3262E',
    modules: ['Virtual Fitting AI', 'Smart Mirror OS', '3D Asset Pipeline', 'Styling Engine'],
    defaultKpis: {
      activeMirrors: '12,480 units',
      virtualTryOns: '184.2K this week',
      sprintProgress: '86%',
      teamVelocity: '94 pts',
    }
  },
  consumer: {
    id: 'consumer',
    name: 'Zuccano Consumer',
    dot: '.',
    tagline: 'Direct-to-Consumer Hardware & Connected Wearables',
    accentColor: '#E3262E',
    modules: ['Wearables Firmware', 'Mobile Companion App', 'Supply Chain & Inventory', 'Customer QA'],
    defaultKpis: {
      activeDevices: '48,200 rings/wearables',
      dailySyncs: '312K syncs/day',
      sprintProgress: '78%',
      teamVelocity: '88 pts',
    }
  },
  business: {
    id: 'business',
    name: 'Zuccano Business',
    dot: '.',
    tagline: 'Enterprise IoT & Retail Automation Infrastructure',
    accentColor: '#E3262E',
    modules: ['B2B Client Portals', 'Store IoT Gateway', 'API Gateway & IAM', 'Fleet Health & SLAs'],
    defaultKpis: {
      clientStores: '840 retail locations',
      uptimeSla: '99.98% uptime',
      sprintProgress: '92%',
      teamVelocity: '102 pts',
    }
  }
};

export const WorkspaceDashboard = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Load user session
  const storedUser = localStorage.getItem('zuccano_user');
  const user = storedUser
    ? JSON.parse(storedUser)
    : { role: 'Employee', email: 'employee@zuccano.me', product: 'zfit' };

  const currentProduct = PRODUCT_CONFIG[productId] || PRODUCT_CONFIG.zfit;
  const isCeo = user.role?.toLowerCase() === 'ceo';

  // Check access permission
  const userAssignedProduct = user.product || 'zfit';
  const hasAccess = userAssignedProduct === 'all' || userAssignedProduct === productId;

  // Active Main View Tab: 'overview' | 'messaging'
  const [workspaceView, setWorkspaceView] = useState('overview');

  // ══════════════════ SUPABASE MESSAGING STATE ══════════════════
  const [messages, setMessages] = useState([]);
  const [activeChannel, setActiveChannel] = useState('general-sprint');
  const [messageInput, setMessageInput] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // ══════════════════ WORK SUBMISSIONS STATE ══════════════════
  const storageKey = `zuccano_submissions_${productId}`;
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 'SUB-101',
        title: 'Calibrated real-time optical body mesh for mirror v2.4',
        module: 'Virtual Fitting AI',
        employeeEmail: 'aryan.dev@zuccano.me',
        employeeName: 'Aryan Kulkarni',
        date: '2026-10-31 11:30 AM',
        workLink: 'https://github.com/zuccano/zfit-core/pull/184',
        notes: 'Refactored OpenCV landmarks to reduce latency by 18ms on ARM chip.',
        status: 'Approved',
        reviewedBy: 'CEO',
      },
      {
        id: 'SUB-102',
        title: '3D Silk & Cotton Fabric draping shader physics model',
        module: '3D Asset Pipeline',
        employeeEmail: 'priya.design@zuccano.me',
        employeeName: 'Priya Sen',
        date: '2026-10-31 01:15 PM',
        workLink: 'https://figma.com/file/zfit-fabric-models',
        notes: 'Submitted procedural PBR shaders and texture maps for winter collection.',
        status: 'Pending Review',
        reviewedBy: null,
      }
    ];
  });

  // Employee Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newModule, setNewModule] = useState(currentProduct.modules[0]);
  const [newLink, setNewLink] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Load and Subscribe to Supabase Messages
  useEffect(() => {
    let unsubscribe = () => {};

    const loadMessages = async () => {
      const data = await messageService.fetchMessages(productId);
      setMessages(data);
    };

    loadMessages();

    // Subscribe to realtime updates from Supabase
    unsubscribe = messageService.subscribeToMessages(productId, (newMsg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });

    return () => {
      unsubscribe();
    };
  }, [productId]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (workspaceView === 'messaging') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, workspaceView]);

  // Save submissions whenever changed
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(submissions));
  }, [submissions, storageKey]);

  // Send Message Handler (Supabase)
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    const content = messageInput.trim();
    setMessageInput('');
    setIsSendingMessage(true);

    try {
      await messageService.sendMessage({
        productId,
        senderEmail: user.email,
        senderName: user.name || user.email.split('@')[0],
        senderRole: user.role,
        channel: activeChannel,
        content,
      });
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleQuickTemplate = (templateText) => {
    setMessageInput(templateText);
  };

  // Handle Employee submitting work
  const handleUploadWork = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSubmission = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle.trim(),
      module: newModule,
      employeeEmail: user.email,
      employeeName: user.name || user.email.split('@')[0],
      date: new Date().toLocaleString(),
      workLink: newLink.trim() || 'Internal Artifact',
      notes: newNotes.trim() || 'No additional notes provided.',
      status: 'Pending Review',
      reviewedBy: null,
    };

    setSubmissions([newSubmission, ...submissions]);

    // Also auto-post notification message to Supabase chat!
    messageService.sendMessage({
      productId,
      senderEmail: user.email,
      senderName: user.name || user.email.split('@')[0],
      senderRole: user.role,
      channel: 'general-sprint',
      content: `📦 [Work Submitted] ${newTitle.trim()} (${newModule}) - Submitted for CEO Review.`,
    });

    setNewTitle('');
    setNewLink('');
    setNewNotes('');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  // Handle CEO approving or rejecting work
  const handleStatusChange = (subId, newStatus) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === subId
          ? { ...sub, status: newStatus, reviewedBy: `CEO (${user.email})` }
          : sub
      )
    );

    // Notify team in Supabase chat
    messageService.sendMessage({
      productId,
      senderEmail: user.email,
      senderName: 'CEO Office',
      senderRole: 'CEO',
      channel: 'general-sprint',
      content: `✅ [CEO Review] Submission ${subId} has been marked as "${newStatus}" by ${user.email}.`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('zuccano_user');
    navigate('/login');
  };

  // If user has NO ACCESS to this product
  if (!hasAccess) {
    return (
      <div className="workspace-access-denied">
        <div className="denied-card">
          <div className="denied-icon-circle">
            <ShieldAlert size={42} className="shield-alert-icon" />
          </div>
          <h2>Restricted Access</h2>
          <p>
            You are logged in as <strong>{user.email}</strong> ({user.role}), which is strictly assigned to the <strong>{userAssignedProduct.toUpperCase()}</strong> division.
          </p>
          <p className="denied-subtext">
            You do not have clearance to access the <strong>{currentProduct.name}</strong> workspace.
          </p>
          <div className="denied-actions">
            <button
              type="button"
              className="btn-return-assigned"
              onClick={() => navigate(`/workspace/${userAssignedProduct}`)}
            >
              <span>Go to Your Assigned Workspace ({userAssignedProduct.toUpperCase()})</span>
            </button>
            <button
              type="button"
              className="btn-back-selector"
              onClick={() => navigate('/choose-product')}
            >
              <ArrowLeft size={15} />
              <span>Back to Product Selector</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter messages for current channel
  const filteredMessages = messages.filter((m) => !m.channel || m.channel === activeChannel);

  return (
    <div className="workspace-page-root">
      {/* ── Top Workspace Header ── */}
      <header className="workspace-navbar">
        <div className="workspace-navbar-inner">
          <div className="navbar-left">
            <Link to="/choose-product" className="nav-brand-link">
              <span className="brand-name">zuccano</span>
              <span className="brand-dot">.</span>
            </Link>
            <span className="nav-divider">/</span>
            <span className="product-badge-name">{currentProduct.name}</span>
            <span className="nav-divider">/</span>
            <span className={`role-badge-pill ${isCeo ? 'role-badge-ceo' : 'role-badge-emp'}`}>
              {isCeo ? <Crown size={13} /> : <Users size={13} />}
              <span>{isCeo ? 'CEO Executive Suite' : 'Employee Workspace'}</span>
            </span>
          </div>

          <div className="navbar-right">
            <div className={`supabase-indicator-badge ${isSupabaseConfigured ? 'indicator-live' : 'indicator-ready'}`}>
              <Database size={12} />
              <span>{isSupabaseConfigured ? 'Supabase Live' : 'Supabase Ready'}</span>
            </div>

            <button
              type="button"
              className="switch-product-nav-btn"
              onClick={() => navigate('/choose-product')}
            >
              <ArrowLeft size={14} />
              <span>Change Product</span>
            </button>

            <div className="user-profile-widget">
              <div className="user-avatar-initial">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="user-meta-text">
                <span className="user-meta-email">{user.email}</span>
                <span className="user-meta-role">{user.role} &bull; {currentProduct.name}</span>
              </div>
            </div>

            <button
              type="button"
              className="workspace-logout-btn"
              onClick={handleLogout}
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Dashboard Body ── */}
      <main className="workspace-content-container">
        
        {/* Workspace Title & Live Pulse Header */}
        <section className="workspace-hero-bar">
          <div className="hero-text-col">
            <span className="division-kicker">{currentProduct.name.toUpperCase()} INTERNAL WORKSPACE</span>
            <h1 className="hero-product-title">
              {currentProduct.name}<span className="accent-dot">{currentProduct.dot}</span>
            </h1>
            <p className="hero-tagline">{currentProduct.tagline}</p>
          </div>

          <div className="hero-status-col">
            <div className="live-status-card">
              <div className="pulse-indicator">
                <span className="live-dot-green" />
                <span className="live-text">Live Supabase Database Cluster</span>
              </div>
              <span className="active-role-info">
                Active Session: <strong>{user.role}</strong> ({user.email})
              </span>
            </div>
          </div>
        </section>

        {/* ── High-End Dual Tab Navigation (Overview vs Supabase Team Messaging) ── */}
        <div className="workspace-tab-navigation">
          <button
            type="button"
            className={`workspace-nav-tab ${workspaceView === 'overview' ? 'tab-active' : ''}`}
            onClick={() => setWorkspaceView('overview')}
          >
            <Briefcase size={16} />
            <span>{isCeo ? 'Executive Approvals & Roadmap' : 'Work Submissions & Sprint'}</span>
          </button>

          <button
            type="button"
            className={`workspace-nav-tab ${workspaceView === 'messaging' ? 'tab-active' : ''}`}
            onClick={() => setWorkspaceView('messaging')}
          >
            <MessageSquare size={16} />
            <span>Team Comms & Messaging (Supabase)</span>
            <span className="live-msg-count-pill">{messages.length}</span>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            VIEW 1: SUPABASE TEAM MESSAGING PANEL
            ══════════════════════════════════════════════════════════════ */}
        {workspaceView === 'messaging' && (
          <div className="team-messaging-card">
            {/* Channels Sidebar / Selector */}
            <div className="messaging-sidebar">
              <div className="sidebar-section-title">
                <Hash size={13} />
                <span>CHANNELS</span>
              </div>
              <div className="channels-list">
                <button
                  type="button"
                  className={`channel-pill ${activeChannel === 'general-sprint' ? 'channel-active' : ''}`}
                  onClick={() => setActiveChannel('general-sprint')}
                >
                  <Hash size={14} />
                  <span>general-sprint</span>
                </button>
                <button
                  type="button"
                  className={`channel-pill ${activeChannel === 'code-review' ? 'channel-active' : ''}`}
                  onClick={() => setActiveChannel('code-review')}
                >
                  <Hash size={14} />
                  <span>code-review</span>
                </button>
                <button
                  type="button"
                  className={`channel-pill ${activeChannel === '3d-assets' ? 'channel-active' : ''}`}
                  onClick={() => setActiveChannel('3d-assets')}
                >
                  <Hash size={14} />
                  <span>3d-assets & design</span>
                </button>
                <button
                  type="button"
                  className={`channel-pill ${activeChannel === 'ceo-announcements' ? 'channel-active' : ''}`}
                  onClick={() => setActiveChannel('ceo-announcements')}
                >
                  <Crown size={14} />
                  <span>ceo-announcements</span>
                </button>
              </div>

              <div className="sidebar-section-title" style={{ marginTop: '1.5rem' }}>
                <Users size={13} />
                <span>ACTIVE DIVISION TEAM</span>
              </div>
              <div className="online-users-list">
                <div className="online-user-item">
                  <span className="online-dot" />
                  <span>{user.email} (You)</span>
                </div>
                <div className="online-user-item">
                  <span className="online-dot" />
                  <span>Sameer Ali (ZFIT CEO)</span>
                </div>
                <div className="online-user-item">
                  <span className="online-dot" />
                  <span>Aryan Kulkarni (Core AI)</span>
                </div>
              </div>
            </div>

            {/* Chat Conversation Area */}
            <div className="messaging-main-area">
              <div className="chat-header">
                <div className="chat-header-title">
                  <Hash size={18} className="hash-icon" />
                  <h3>{activeChannel}</h3>
                  <span className="channel-desc-tag">&bull; {currentProduct.name} Real-time Channel</span>
                </div>
                <div className="supabase-sync-badge">
                  <Radio size={12} className="radio-ping-icon" />
                  <span>Realtime Database Active</span>
                </div>
              </div>

              {/* Messages Stream */}
              <div className="chat-messages-stream">
                {filteredMessages.length === 0 ? (
                  <div className="empty-chat-state">
                    <MessageSquare size={32} className="empty-chat-icon" />
                    <h4>No messages yet in #{activeChannel}</h4>
                    <p>Start the conversation! Post an update or ask a question to the {currentProduct.name} team.</p>
                  </div>
                ) : (
                  filteredMessages.map((msg) => {
                    const isMsgCeo = msg.sender_role?.toLowerCase() === 'ceo';
                    const isMyMsg = msg.sender_email === user.email;

                    return (
                      <div
                        key={msg.id}
                        className={`chat-message-bubble ${isMyMsg ? 'msg-own' : ''} ${isMsgCeo ? 'msg-ceo-post' : ''}`}
                      >
                        <div className="msg-avatar">
                          {msg.sender_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="msg-content-col">
                          <div className="msg-meta-row">
                            <span className="msg-sender-name">{msg.sender_name}</span>
                            <span className={`msg-role-tag ${isMsgCeo ? 'role-tag-ceo' : 'role-tag-emp'}`}>
                              {isMsgCeo ? '👑 CEO' : '💼 Employee'}
                            </span>
                            <span className="msg-timestamp">
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="msg-text-body">{msg.content}</div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Template Chips */}
              <div className="quick-templates-bar">
                <span className="templates-label">Quick:</span>
                <button
                  type="button"
                  className="template-chip"
                  onClick={() => handleQuickTemplate(`🚀 PR open for review: [Enter branch/PR link]`)}
                >
                  🚀 PR for Review
                </button>
                <button
                  type="button"
                  className="template-chip"
                  onClick={() => handleQuickTemplate(`⚡ Blocker resolved on ${currentProduct.modules[0]}`)}
                >
                  ⚡ Blocker Resolved
                </button>
                {isCeo && (
                  <button
                    type="button"
                    className="template-chip template-chip-ceo"
                    onClick={() => handleQuickTemplate(`👑 CEO Priority: Please prioritize mirror mesh latency for today's milestone.`)}
                  >
                    👑 CEO Priority Directive
                  </button>
                )}
              </div>

              {/* Message Composer Input */}
              <form onSubmit={handleSendMessage} className="chat-composer-form">
                <input
                  type="text"
                  className="chat-input-field"
                  placeholder={`Message #${activeChannel} as ${user.role} (${user.email})... Press Enter to send`}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  disabled={isSendingMessage}
                />
                <button
                  type="submit"
                  className="chat-send-btn"
                  disabled={!messageInput.trim() || isSendingMessage}
                >
                  <Send size={15} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            VIEW 2: WORKSPACE OVERVIEW & SUBMISSIONS (CEO VS EMPLOYEE)
            ══════════════════════════════════════════════════════════════ */}
        {workspaceView === 'overview' && (
          isCeo ? (
            /* ════════════ CEO EXECUTIVE DASHBOARD ════════════ */
            <div className="ceo-dashboard-layout">
              {/* CEO Executive KPI Ribbon */}
              <div className="kpi-cards-grid">
                <div className="kpi-stat-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Active Deployments</span>
                    <Activity size={18} className="kpi-icon-accent" />
                  </div>
                  <div className="kpi-value">{currentProduct.defaultKpis.activeMirrors || currentProduct.defaultKpis.activeDevices || currentProduct.defaultKpis.clientStores}</div>
                  <span className="kpi-growth-positive">+14.2% MoM growth</span>
                </div>

                <div className="kpi-stat-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Weekly Throughput / Users</span>
                    <TrendingUp size={18} className="kpi-icon-accent" />
                  </div>
                  <div className="kpi-value">{currentProduct.defaultKpis.virtualTryOns || currentProduct.defaultKpis.dailySyncs || currentProduct.defaultKpis.uptimeSla}</div>
                  <span className="kpi-growth-positive">Healthy SLA benchmark</span>
                </div>

                <div className="kpi-stat-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Current Sprint Velocity</span>
                    <BarChart3 size={18} className="kpi-icon-accent" />
                  </div>
                  <div className="kpi-value">{currentProduct.defaultKpis.sprintProgress}</div>
                  <span className="kpi-growth-positive">{currentProduct.defaultKpis.teamVelocity} delivered</span>
                </div>

                <div className="kpi-stat-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Pending Work Approvals</span>
                    <Clock size={18} className="kpi-icon-warning" />
                  </div>
                  <div className="kpi-value">
                    {submissions.filter((s) => s.status === 'Pending Review').length} Tasks
                  </div>
                  <span className="kpi-growth-neutral">Awaiting CEO Sign-off</span>
                </div>
              </div>

              {/* CEO Review Section: Team Work Submissions & Approvals */}
              <div className="ceo-submissions-panel">
                <div className="panel-header-row">
                  <div>
                    <h3 className="panel-title">Team Work Submissions & Executive Approvals</h3>
                    <p className="panel-desc">
                      Review and sign-off on code, design assets, and architecture submitted by {currentProduct.name} employees.
                    </p>
                  </div>
                  <div className="panel-filter-badge">
                    <span>{submissions.length} Total Submissions</span>
                  </div>
                </div>

                {submissions.length === 0 ? (
                  <div className="empty-submissions-box">
                    <FileText size={36} className="empty-icon" />
                    <h4>No submissions yet for {currentProduct.name}</h4>
                    <p>When team members submit code or designs, they will appear here for review.</p>
                  </div>
                ) : (
                  <div className="submissions-table-wrapper">
                    <table className="submissions-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Task / Work Title</th>
                          <th>Module</th>
                          <th>Submitted By</th>
                          <th>Timestamp</th>
                          <th>Status</th>
                          <th>CEO Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions.map((sub) => (
                          <tr key={sub.id} className={`row-status-${sub.status.toLowerCase().replace(' ', '-')}`}>
                            <td className="cell-id">{sub.id}</td>
                            <td className="cell-title">
                              <div className="title-bold">{sub.title}</div>
                              <div className="notes-muted">{sub.notes}</div>
                              {sub.workLink && (
                                <a
                                  href={sub.workLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="external-work-link"
                                >
                                  <LinkIcon size={12} />
                                  <span>{sub.workLink}</span>
                                </a>
                              )}
                            </td>
                            <td className="cell-module">
                              <span className="module-pill">{sub.module}</span>
                            </td>
                            <td className="cell-author">
                              <div className="author-name">{sub.employeeName}</div>
                              <div className="author-email">{sub.employeeEmail}</div>
                            </td>
                            <td className="cell-date">{sub.date}</td>
                            <td className="cell-status">
                              <span className={`status-pill status-${sub.status.toLowerCase().replace(' ', '-')}`}>
                                {sub.status === 'Approved' && <CheckCircle2 size={12} />}
                                {sub.status === 'Pending Review' && <Clock size={12} />}
                                {sub.status === 'Revision Needed' && <AlertCircle size={12} />}
                                <span>{sub.status}</span>
                              </span>
                            </td>
                            <td className="cell-actions">
                              {sub.status === 'Pending Review' ? (
                                <div className="ceo-action-btns">
                                  <button
                                    type="button"
                                    className="btn-approve"
                                    onClick={() => handleStatusChange(sub.id, 'Approved')}
                                    title="Approve Work"
                                  >
                                    <Check size={14} />
                                    <span>Approve</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-revise"
                                    onClick={() => handleStatusChange(sub.id, 'Revision Needed')}
                                    title="Request Revision"
                                  >
                                    <RotateCcw size={14} />
                                    <span>Revise</span>
                                  </button>
                                </div>
                              ) : (
                                <span className="reviewed-by-text">
                                  Verified by {sub.reviewedBy || 'CEO'}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* CEO Strategic Modules Overview */}
              <div className="ceo-strategic-grid">
                <div className="strategic-card">
                  <h4>{currentProduct.name} Division Roadmaps</h4>
                  <div className="modules-list-boxed">
                    {currentProduct.modules.map((m, idx) => (
                      <div key={m} className="module-item-row">
                        <div className="module-left">
                          <span className="module-num">0{idx + 1}</span>
                          <span className="module-name">{m}</span>
                        </div>
                        <span className="module-status-active">● Active Track</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="strategic-card">
                  <h4>Executive Resource Allocation</h4>
                  <p className="card-note-text">
                    Budget allocation & headcounts are strictly controlled under {currentProduct.name} CEO authority.
                  </p>
                  <div className="budget-progress-bar">
                    <div className="bar-fill" style={{ width: '74%' }} />
                  </div>
                  <div className="budget-meta">
                    <span>Q4 Budget Consumed: 74%</span>
                    <span>Runway: 18 Months</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ════════════ EMPLOYEE WORKSPACE DASHBOARD ════════════ */
            <div className="employee-dashboard-layout">
              {/* Top Grid: Work Submission Card + Active Tasks Card */}
              <div className="employee-two-col-grid">
                
                {/* Card 1: Submit Your Work Form */}
                <div className="work-upload-card">
                  <div className="card-top-title">
                    <div className="title-with-icon">
                      <Upload size={20} className="upload-header-icon" />
                      <h3>Submit Your Work / Task Updates</h3>
                    </div>
                    <span className="role-indicator-badge">Employee Portal</span>
                  </div>
                  <p className="card-subtitle-text">
                    Log your daily code, feature PRs, designs, or documentation. Submissions are saved to Supabase and automatically notified to the {currentProduct.name} CEO.
                  </p>

                  {uploadSuccess && (
                    <div className="upload-success-alert">
                      <CheckCircle2 size={16} />
                      <span>Work successfully submitted! Notification sent to team chat.</span>
                    </div>
                  )}

                  <form onSubmit={handleUploadWork} className="work-upload-form">
                    <div className="form-group-field">
                      <label>Task / Feature Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Implemented 3D draping physics on ZFIT Mirror"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                    </div>

                    <div className="form-row-two">
                      <div className="form-group-field">
                        <label>Module / Component *</label>
                        <select
                          value={newModule}
                          onChange={(e) => setNewModule(e.target.value)}
                        >
                          {currentProduct.modules.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group-field">
                        <label>PR / Artifact / Figma Link</label>
                        <input
                          type="url"
                          placeholder="https://github.com/zuccano/... or drive link"
                          value={newLink}
                          onChange={(e) => setNewLink(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group-field">
                      <label>Implementation Summary / Technical Notes</label>
                      <textarea
                        rows={3}
                        placeholder="Describe what was built, performance metrics improved, or testing verification..."
                        value={newNotes}
                        onChange={(e) => setNewNotes(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="submit-work-btn">
                      <Upload size={16} />
                      <span>Submit Work to Dashboard</span>
                    </button>
                  </form>
                </div>

                {/* Card 2: My Assigned Sprint Tasks */}
                <div className="assigned-tasks-card">
                  <div className="card-top-title">
                    <div className="title-with-icon">
                      <Layers size={20} className="tasks-header-icon" />
                      <h3>Current Sprint Objectives</h3>
                    </div>
                    <span className="sprint-tag-pill">Active Sprint 24</span>
                  </div>

                  <div className="sprint-tasks-list">
                    <div className="sprint-task-item">
                      <div className="task-checkbox-mock checked">
                        <Check size={12} />
                      </div>
                      <div className="task-info">
                        <span className="task-title-line line-done">Optical gesture calibration for smart mirror</span>
                        <span className="task-meta-line">Virtual Fitting AI &bull; Completed</span>
                      </div>
                    </div>

                    <div className="sprint-task-item">
                      <div className="task-checkbox-mock" />
                      <div className="task-info">
                        <span className="task-title-line">Optimize 60FPS WebGL canvas renderer</span>
                        <span className="task-meta-line">3D Asset Pipeline &bull; In Progress</span>
                      </div>
                    </div>

                    <div className="sprint-task-item">
                      <div className="task-checkbox-mock" />
                      <div className="task-info">
                        <span className="task-title-line">Bluetooth low-energy pairing protocol test</span>
                        <span className="task-meta-line">Mirror OS Firmware &bull; Scheduled</span>
                      </div>
                    </div>
                  </div>

                  <div className="standup-card-footer">
                    <div className="standup-pulse">
                      <span className="pulse-dot-cyan" />
                      <span>Daily Standup: 10:30 AM IST (Google Meet)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Table: Submissions Log History */}
              <div className="submissions-history-panel">
                <div className="panel-header-row">
                  <div>
                    <h3 className="panel-title">Your Work Log & Review Status</h3>
                    <p className="panel-desc">
                      Live record of all contributions submitted under your account ({user.email}).
                    </p>
                  </div>
                  <span className="badge-count">
                    {submissions.filter((s) => s.employeeEmail === user.email).length} of your submissions
                  </span>
                </div>

                <div className="submissions-table-wrapper">
                  <table className="submissions-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Work Summary</th>
                        <th>Module</th>
                        <th>Submitted Date</th>
                        <th>CEO Review Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions
                        .filter((s) => s.employeeEmail === user.email || !s.employeeEmail)
                        .map((sub) => (
                          <tr key={sub.id}>
                            <td className="cell-id">{sub.id}</td>
                            <td className="cell-title">
                              <div className="title-bold">{sub.title}</div>
                              <div className="notes-muted">{sub.notes}</div>
                              {sub.workLink && (
                                <a
                                  href={sub.workLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="external-work-link"
                                >
                                  <LinkIcon size={12} />
                                  <span>{sub.workLink}</span>
                                </a>
                              )}
                            </td>
                            <td className="cell-module">
                              <span className="module-pill">{sub.module}</span>
                            </td>
                            <td className="cell-date">{sub.date}</td>
                            <td className="cell-status">
                              <span className={`status-pill status-${sub.status.toLowerCase().replace(' ', '-')}`}>
                                {sub.status === 'Approved' && <CheckCircle2 size={12} />}
                                {sub.status === 'Pending Review' && <Clock size={12} />}
                                {sub.status === 'Revision Needed' && <AlertCircle size={12} />}
                                <span>{sub.status}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )
        )}

      </main>
    </div>
  );
};

export default WorkspaceDashboard;
