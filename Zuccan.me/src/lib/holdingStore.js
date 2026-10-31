/**
 * ═══════════════════════════════════════════════════════════════
 * ZUCCANO HOLDING COMPANY — MASTER WORKSPACE DATA STORE & SERVICES
 * Central parent-company governance, multi-subsidiary registry,
 * authentic cap tables, parent approvals, and intercompany oversight.
 * ═══════════════════════════════════════════════════════════════
 */

import subsidiaryStore from './subsidiaryStore';

const INITIAL_HOLDING_DATA = {
  identity: {
    legalName: 'Zuccano Group Holdings Private Limited',
    brandName: 'Zuccano',
    holdingType: 'Parent Holding & Corporate Governance Entity',
    cin: 'U72900KA2025PTC184920',
    incorporationDate: '12 Jan 2025',
    registeredOffice: 'Zuccano Towers, Level 14, Outer Ring Road, Bengaluru, Karnataka 560103, India',
    authorizedCapital: 100000000, // ₹10.00 Cr
    paidUpCapital: 25000000,     // ₹2.50 Cr
    totalShares: 1000000,
    currency: 'INR',
    currencySymbol: '₹',
  },

  // ── ZUCCANO PARENT HOLDING OWNERSHIP (CAP TABLE) ──
  // Naseer: 51%, Pavan: 40%, Other Shareholders: 9%
  parentCapTable: [
    {
      id: 'sh-1',
      name: 'Naseer',
      role: 'Founding Shareholder',
      shares: 510000,
      percentage: 51.0,
      shareClass: 'Class A Equity (Voting)',
      certificateNumber: 'ZUC-SH-001',
      dateAcquired: '12 Jan 2025',
      authorizedSignatory: true,
      notes: 'Majority equity holder in Zuccano Group Holdings. Does NOT personally hold 51% of ZFIT; the stake is owned by Zuccano itself.',
    },
    {
      id: 'sh-2',
      name: 'Pavan',
      role: 'Co-Founding Shareholder & Director',
      shares: 400000,
      percentage: 40.0,
      shareClass: 'Class A Equity (Voting)',
      certificateNumber: 'ZUC-SH-002',
      dateAcquired: '12 Jan 2025',
      authorizedSignatory: true,
      notes: 'Co-Founding shareholder in parent holding entity. Also serves as CEO of ZFIT subsidiary.',
    },
    {
      id: 'sh-3',
      name: 'Other Shareholders (Collective Pool)',
      role: 'Minority Equity Pool',
      shares: 90000,
      percentage: 9.0,
      shareClass: 'Class B Equity',
      certificateNumber: 'ZUC-SH-003',
      dateAcquired: '12 Jan 2025',
      authorizedSignatory: false,
      notes: 'Collective minority equity pool as per parent incorporation charter.',
    },
  ],

  // Ownership Transaction Audit History
  ownershipTransactions: [
    {
      id: 'tx-001',
      entity: 'Zuccano Group Holdings',
      date: '2025-01-12',
      type: 'Initial Share Allocation',
      transferor: 'Zuccano Treasury',
      transferee: 'Naseer (51%), Pavan (40%), Other Shareholders (9%)',
      shares: 1000000,
      parValue: '₹10 per share',
      resolutionRef: 'BR-2025-01',
      authorizedBy: 'Board of Directors',
      supportingDocument: 'AoA & Share Subscription Agreement v1',
    },
  ],

  // ── SUBSIDIARIES DIRECTORY ──
  subsidiaries: [
    {
      id: 'zfit',
      name: 'ZFIT Technologies Private Limited',
      shortName: 'ZFIT',
      tagline: 'AI Optical Mirror & Virtual Fitting Infrastructure',
      status: 'Active',
      incorporationDate: '15 Jan 2025',
      cin: 'U72900KA2025PTC184988',
      ceoName: 'Pavan Zuccano',
      ceoEmail: 'pavan.ceo@zfit.zuccano.me',
      zuccanoOwnership: 51.0, // Zuccano owns 51% of ZFIT. Naseer does NOT personally own this.
      otherOwnershipConfigured: false, // Remaining 49% is NOT configured. Do not invent.
      otherOwnershipNotes: 'Remaining 49% ownership structure is currently unconfigured in parent cap table registry.',
      headcount: 42,
      activeProjects: 4,
      fiscalBudget: 45000000,
      utilizedBudget: 28400000,
      lastReportDate: '2026-10-29',
      lastReportTitle: 'Q2 Performance, Latency Breakthrough & Retail Expansion',
      leadershipCount: 5,
      governanceStatus: 'In Good Standing',
      description: 'Autonomous subsidiary developing next-generation computer vision virtual try-on mirrors and smart retail hardware.',
    },
    {
      id: 'consumer',
      name: 'Zuccano Consumer Technologies Private Limited',
      shortName: 'Consumer',
      tagline: 'Connected Smart Rings, Biometric Hardware & Health OS',
      status: 'Active',
      incorporationDate: '10 Feb 2025',
      cin: 'U72900KA2025PTC185102',
      ceoName: 'Rohan Verma',
      ceoEmail: 'rohan.ceo@consumer.zuccano.me',
      zuccanoOwnership: 100.0, // Wholly owned subsidiary
      otherOwnershipConfigured: true,
      otherOwnershipNotes: '100% owned and held directly by Zuccano Group Holdings.',
      headcount: 38,
      activeProjects: 3,
      fiscalBudget: 38000000,
      utilizedBudget: 22100000,
      lastReportDate: '2026-10-22',
      lastReportTitle: 'Smart Ring OS 1.9 & Battery Benchmark Sign-off',
      leadershipCount: 3,
      governanceStatus: 'In Good Standing',
      description: 'Direct-to-consumer hardware subsidiary developing smart rings, health telemetry sensors, and mobile software.',
    },
    {
      id: 'business',
      name: 'Zuccano Business & Enterprise IoT Private Limited',
      shortName: 'Business',
      tagline: 'Retail Store Automation & Edge Fleet Gateways',
      status: 'Active',
      incorporationDate: '10 Feb 2025',
      cin: 'U72900KA2025PTC185103',
      ceoName: 'Kavita Rao',
      ceoEmail: 'kavita.ceo@business.zuccano.me',
      zuccanoOwnership: 100.0,
      otherOwnershipConfigured: true,
      otherOwnershipNotes: '100% owned and held directly by Zuccano Group Holdings.',
      headcount: 32,
      activeProjects: 3,
      fiscalBudget: 32000000,
      utilizedBudget: 19500000,
      lastReportDate: '2026-10-25',
      lastReportTitle: 'Retail Fleet 99.98% SLA & Enterprise Expansion',
      leadershipCount: 3,
      governanceStatus: 'In Good Standing',
      description: 'Enterprise B2B subsidiary providing IoT edge gateways, store automation hardware, and telemetry infrastructure.',
    },
  ],

  // ── PARENT-LEVEL APPROVALS QUEUE ──
  parentApprovals: [
    {
      id: 'appr-101',
      title: 'International Patent Filing Authorization (US & EU Drape Estimation)',
      requestingCompany: 'ZFIT Technologies',
      requestedBy: 'Pavan Zuccano (CEO, ZFIT)',
      date: '2026-10-29',
      category: 'Intellectual Property & International Filing',
      financialImpact: 1800000, // ₹18 Lakhs legal & filing fees
      description: 'Formal request to parent holding company for board approval to file PCT and international patents across US and European jurisdictions for the multi-spectral fabric drape estimation neural model.',
      status: 'Under Review',
      reviewHistory: [
        { date: '2026-10-30', reviewer: 'Legal Counsel (Zuccano Parent)', comment: 'Initial patent draft reviewed; recommended for board sign-off.' }
      ],
      supportingDocument: 'Patent_Draft_PCT_ZFIT_v2.pdf',
    },
    {
      id: 'appr-102',
      title: 'Capex Buffer Pre-booking for Sony IMX Optical Image Sensors',
      requestingCompany: 'ZFIT Technologies',
      requestedBy: 'Pavan Zuccano (CEO, ZFIT)',
      date: '2026-10-25',
      category: 'Capex Buffer Reallocation',
      financialImpact: 2500000, // ₹25 Lakhs
      description: 'Request to pre-book 300 Sony IMX optical sensors due to global foundry lead time extension from 4 to 7 weeks.',
      status: 'Approved',
      reviewHistory: [
        { date: '2026-10-26', reviewer: 'Zuccano Board of Directors', comment: 'Approved under reserved operational buffer policy. Treasury disbursed allocation.' }
      ],
      supportingDocument: 'Sony_Foundry_Notification_Q3.pdf',
    },
    {
      id: 'appr-103',
      title: 'Establishment of Future Subsidiary D (Spatial Retail Analytics)',
      requestingCompany: 'Zuccano Holding',
      requestedBy: 'Naseer (Founding Shareholder)',
      date: '2026-10-20',
      category: 'Corporate Subsidiary Expansion',
      financialImpact: 5000000, // ₹50 Lakhs seed allocation
      description: 'Board resolution proposal to incorporate a dedicated subsidiary for spatial retail compute and in-store footfall AI.',
      status: 'Pending',
      reviewHistory: [],
      supportingDocument: 'Subsidiary_D_Concept_Charter.pdf',
    },
  ],

  // ── PARENT-LEVEL FINANCE & INTERCOMPANY INVESTMENTS ──
  parentFinance: {
    reservesCash: 35000000, // ₹3.50 Cr liquid parent holding reserves
    totalInvestedInSubsidiaries: 115000000, // ₹11.50 Cr total capital deployed
    parentAnnualBudget: 12000000, // ₹1.20 Cr parent operating budget
    parentOperatingSpend: 6800000,
    intercompanyInvestments: [
      {
        id: 'inv-1',
        subsidiary: 'ZFIT Technologies',
        type: 'Series Equity Capital Infusion',
        amount: 45000000,
        date: '15 Jan 2025',
        equityAcquired: '51.0% Equity Stake',
        terms: 'Class A Voting Shares. 1 board seat reserved for Parent Holding.',
        status: 'Active',
      },
      {
        id: 'inv-2',
        subsidiary: 'Zuccano Consumer Technologies',
        type: 'Wholly-Owned Entity Seed Capital',
        amount: 38000000,
        date: '10 Feb 2025',
        equityAcquired: '100% Equity Stake',
        terms: 'Wholly owned operating subsidiary.',
        status: 'Active',
      },
      {
        id: 'inv-3',
        subsidiary: 'Zuccano Business & Enterprise IoT',
        type: 'Wholly-Owned Entity Seed Capital',
        amount: 32000000,
        date: '10 Feb 2025',
        equityAcquired: '100% Equity Stake',
        terms: 'Wholly owned operating subsidiary.',
        status: 'Active',
      },
    ],
    parentExpenses: [
      {
        id: 'pex-1',
        title: 'Statutory Corporate Audit & Regulatory RoC Compliance FY25-26',
        vendor: 'Deloitte Touche Tohmatsu India',
        amount: 1450000,
        date: '2026-10-15',
        category: 'Legal & Regulatory Audit',
        status: 'Paid',
      },
      {
        id: 'pex-2',
        title: 'Zuccano Global Trademark & IP Portfolio Legal Retainer',
        vendor: 'Shardul Amarchand Mangaldas & Co',
        amount: 850000,
        date: '2026-10-01',
        category: 'IP & Legal',
        status: 'Paid',
      },
      {
        id: 'pex-3',
        title: 'Holding Company Executive Cloud Infrastructure & Security Telemetry',
        vendor: 'AWS Enterprise Support',
        amount: 420000,
        date: '2026-10-28',
        category: 'Technology & Security',
        status: 'Paid',
      },
    ],
  },

  // ── CORPORATE DOCUMENTS REPOSITORY (PARENT LEVEL) ──
  corporateDocuments: [
    {
      id: 'pdoc-1',
      title: 'Zuccano Group Holdings — Certificate of Incorporation',
      category: 'Incorporation & Statutory',
      fileSize: '2.4 MB',
      date: '2025-01-12',
      confidentiality: 'Board Members & Counsel',
      format: 'PDF',
      refNumber: 'CIN-U72900KA2025PTC184920',
    },
    {
      id: 'pdoc-2',
      title: 'Articles of Association (AoA) & Memorandum of Association (MoA)',
      category: 'Governance Charter',
      fileSize: '3.8 MB',
      date: '2025-01-12',
      confidentiality: 'Board Members & Counsel',
      format: 'PDF',
      refNumber: 'ZUC-AOA-2025-01',
    },
    {
      id: 'pdoc-3',
      title: 'ZFIT Shareholders Agreement (SHA) & 51% Holding Agreement',
      category: 'Subsidiary Equity & Investment',
      fileSize: '4.6 MB',
      date: '2025-01-15',
      confidentiality: 'Parent Board & ZFIT CEO',
      format: 'PDF',
      refNumber: 'SHA-ZFIT-51-2025',
    },
    {
      id: 'pdoc-4',
      title: 'Board Resolution BR-2026-08: Delegated Subsidiary Executive Authority',
      category: 'Board Resolutions',
      fileSize: '1.1 MB',
      date: '2026-08-10',
      confidentiality: 'Company-Wide Governance',
      format: 'PDF',
      refNumber: 'BR-2026-08',
    },
  ],

  // ── GOVERNANCE & STATUTORY COMPLIANCE ──
  complianceCalendar: [
    {
      id: 'cmp-1',
      title: 'RoC Annual Return Filing (Form MGT-7)',
      authority: 'Ministry of Corporate Affairs (MCA), India',
      dueDate: '2026-11-29',
      status: 'On Track',
      responsibleOfficer: 'Company Secretary & Finance Officer',
    },
    {
      id: 'cmp-2',
      title: 'Financial Statements Filing (Form AOC-4)',
      authority: 'MCA Registrar of Companies',
      dueDate: '2026-11-20',
      status: 'In Audit Preparation',
      responsibleOfficer: 'Deloitte / Parent Finance Officer',
    },
    {
      id: 'cmp-3',
      title: 'Q3 Zuccano Group Holdings Board of Directors Formal Session',
      authority: 'Internal Board Governance',
      dueDate: '2026-11-14',
      status: 'Scheduled',
      responsibleOfficer: 'Board Secretariat',
    },
    {
      id: 'cmp-4',
      title: 'Intercompany Service Level Agreement (SLA) Review',
      authority: 'Corporate Governance Council',
      dueDate: '2026-12-05',
      status: 'Drafting',
      responsibleOfficer: 'Legal Counsel',
    },
  ],

  // ── PARENT-LEVEL AUDIT LOGS ──
  auditLogs: [
    {
      id: 'paud-01',
      actor: 'System / Registrar',
      action: 'SYSTEM_INITIALIZED',
      target: 'Zuccano Group Holdings Master Workspace',
      timestamp: '2026-10-31 09:00:00',
      details: 'Established high-security parent holding operating environment with strict subsidiary isolation.',
    },
    {
      id: 'paud-02',
      actor: 'Board of Directors',
      action: 'APPROVED_REQUEST',
      target: 'Capex Buffer Pre-booking for Sony IMX Sensors (₹25,00,000)',
      timestamp: '2026-10-26 14:15:00',
      details: 'Ratified emergency component buffer allocation for ZFIT subsidiary.',
    },
    {
      id: 'paud-03',
      actor: 'Governance Council',
      action: 'REVIEWED_REPORT',
      target: 'ZFIT October 2026 Performance Report #REP-901',
      timestamp: '2026-10-30 11:45:00',
      details: 'Acknowledged optical tracking latency breakthrough and authorized patent review.',
    },
  ],

  // ── PARENT WORKSPACE AUTHORIZED ACCESS USERS ──
  workspaceUsers: [
    {
      id: 'usr-p1',
      name: 'Naseer',
      email: 'naseer@zuccano.me',
      role: 'Founding Shareholder & Board Member',
      systemRole: 'Parent Executive',
      ownershipStake: '51% in Zuccano',
      status: 'Active',
      lastLogin: 'Today, 10:45 AM',
    },
    {
      id: 'usr-p2',
      name: 'Pavan',
      email: 'pavan@zuccano.me',
      role: 'Co-Founding Shareholder & Director',
      systemRole: 'Parent Executive & Subsidiary CEO (ZFIT)',
      ownershipStake: '40% in Zuccano',
      status: 'Active',
      lastLogin: 'Today, 05:12 PM',
    },
    {
      id: 'usr-p3',
      name: 'Corporate Secretariat',
      email: 'secretariat@zuccano.me',
      role: 'Company Secretary & Legal Officer',
      systemRole: 'Parent Governance Officer',
      ownershipStake: '0%',
      status: 'Active',
      lastLogin: 'Yesterday, 04:30 PM',
    },
  ],

  // ── PARENT TO SUBSIDIARY COMMUNICATIONS ──
  communications: [
    {
      id: 'pcom-1',
      target: 'All Subsidiaries',
      subject: 'Annual Statutory Audit & Governance Submission Protocol FY26-27',
      sender: 'Zuccano Corporate Secretariat',
      date: '2026-10-28',
      content: 'All subsidiary CEOs and CFOs are advised to ensure preliminary ledger reconciliations are completed prior to November 15 for consolidated group reporting.',
    },
  ],
};

class HoldingStore {
  constructor() {
    this.listeners = new Set();
  }

  getStorageKey() {
    return 'zuccano_master_holding_data_v1';
  }

  getData() {
    const key = this.getStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse holding data, resetting to seed:', e);
      }
    }
    this.saveData(INITIAL_HOLDING_DATA);
    return INITIAL_HOLDING_DATA;
  }

  saveData(data) {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(data));
    this.notify(data);
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(data) {
    this.listeners.forEach((listener) => {
      try {
        listener(data);
      } catch (e) {
        console.error('HoldingStore listener error:', e);
      }
    });
  }

  // ── Subsidiary Management ──
  createSubsidiary(subsidiary) {
    const data = this.getData();
    const newSub = {
      ...subsidiary,
      id: subsidiary.id || `sub-${Date.now()}`,
      status: 'Active',
      incorporationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      headcount: subsidiary.headcount || 1,
      activeProjects: 0,
      fiscalBudget: Number(subsidiary.fiscalBudget) || 10000000,
      utilizedBudget: 0,
      lastReportDate: '—',
      lastReportTitle: 'Initial Incorporation',
      governanceStatus: 'In Good Standing',
    };
    data.subsidiaries.push(newSub);

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: 'Parent Workspace Administrator',
      action: 'CREATED_SUBSIDIARY',
      target: `${newSub.name} (${newSub.shortName})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Registered subsidiary entity with ${newSub.zuccanoOwnership}% Zuccano Holding stake. CEO: ${newSub.ceoName}`,
    });

    this.saveData(data);
    return newSub;
  }

  updateSubsidiary(subsidiaryId, updates) {
    const data = this.getData();
    const sub = data.subsidiaries.find((s) => s.id === subsidiaryId);
    if (!sub) return null;
    Object.assign(sub, updates);

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: 'Parent Workspace Administrator',
      action: 'UPDATED_SUBSIDIARY_RECORD',
      target: sub.name,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Modified corporate parameters for subsidiary ${sub.shortName}.`,
    });

    this.saveData(data);
    return sub;
  }

  // ── Parent Approval Review ──
  updateApprovalStatus(approvalId, newStatus, reviewerComment = '') {
    const data = this.getData();
    const item = data.parentApprovals.find((a) => a.id === approvalId);
    if (!item) return null;
    item.status = newStatus;
    if (reviewerComment) {
      item.reviewHistory.push({
        date: new Date().toISOString().slice(0, 10),
        reviewer: 'Zuccano Holding Board',
        comment: reviewerComment,
      });
    }

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: 'Zuccano Holding Board',
      action: `APPROVAL_${newStatus.toUpperCase().replace(/\s+/g, '_')}`,
      target: item.title,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Status set to ${newStatus}. ${reviewerComment}`,
    });

    this.saveData(data);
    return item;
  }

  // ── Share Transfer / Ownership Transaction ──
  recordShareTransaction(transaction) {
    const data = this.getData();
    const newTx = {
      ...transaction,
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    data.ownershipTransactions.unshift(newTx);

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: transaction.authorizedBy || 'Board of Directors',
      action: 'OWNERSHIP_TRANSACTION_RECORDED',
      target: `${transaction.entity} (${transaction.shares.toLocaleString()} Shares)`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Transferred from ${transaction.transferor} to ${transaction.transferee}. Ref: ${transaction.resolutionRef}`,
    });

    this.saveData(data);
    return newTx;
  }

  // ── Parent Communication Broadcast ──
  sendCommunication(comm) {
    const data = this.getData();
    const newComm = {
      ...comm,
      id: `pcom-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    data.communications.unshift(newComm);

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: comm.sender || 'Zuccano Holding',
      action: 'DISPATCHED_EXECUTIVE_COMMUNICATION',
      target: comm.subject,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Target Audience: ${comm.target}`,
    });

    this.saveData(data);
    return newComm;
  }

  // ── Statutory Compliance Management ──
  addComplianceEvent(event) {
    const data = this.getData();
    const newEvent = {
      ...event,
      id: `cmp-${Date.now()}`,
      status: event.status || 'Pending Review',
    };
    data.complianceCalendar.unshift(newEvent);

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: 'Governance Officer',
      action: 'STATUTORY_FILING_SCHEDULED',
      target: newEvent.title,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Authority: ${newEvent.authority}, Due: ${newEvent.dueDate}`,
    });

    this.saveData(data);
    return newEvent;
  }

  updateComplianceStatus(id, newStatus) {
    const data = this.getData();
    const item = data.complianceCalendar.find(c => c.id === id);
    if (!item) return null;
    item.status = newStatus;

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: 'Governance Officer',
      action: 'STATUTORY_FILING_UPDATED',
      target: item.title,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Filing status transitioned to: ${newStatus}`,
    });

    this.saveData(data);
    return item;
  }

  // ── Access & User Administration ──
  inviteWorkspaceUser(user) {
    const data = this.getData();
    const newUser = {
      ...user,
      id: `usr-p${Date.now()}`,
      status: 'Active',
      lastLogin: 'Never (Invited)',
    };
    data.workspaceUsers.push(newUser);

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: 'Workspace Administrator',
      action: 'USER_ACCESS_GRANTED',
      target: `${newUser.name} (${newUser.email})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Assigned Role: ${newUser.systemRole} | Governance Title: ${newUser.role}`,
    });

    this.saveData(data);
    return newUser;
  }

  updateUserStatus(userId, newStatus) {
    const data = this.getData();
    const u = data.workspaceUsers.find(x => x.id === userId);
    if (!u) return null;
    u.status = newStatus;

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: 'Workspace Administrator',
      action: `USER_ACCESS_${newStatus.toUpperCase()}`,
      target: `${u.name} (${u.email})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Account status updated to ${newStatus}`,
    });

    this.saveData(data);
    return u;
  }

  // ── Corporate Document Repository ──
  uploadCorporateDocument(doc) {
    const data = this.getData();
    const newDoc = {
      ...doc,
      id: `pdoc-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      fileSize: doc.fileSize || '1.8 MB',
      format: doc.format || 'PDF',
    };
    data.corporateDocuments.unshift(newDoc);

    data.auditLogs.unshift({
      id: `paud-${Date.now()}`,
      actor: 'Parent Governance Officer',
      action: 'CORPORATE_DOCUMENT_DEPOSITED',
      target: newDoc.title,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Category: ${newDoc.category} | Access: ${newDoc.confidentiality}`,
    });

    this.saveData(data);
    return newDoc;
  }
}

export const holdingStore = new HoldingStore();
export default holdingStore;
