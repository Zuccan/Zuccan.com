/**
 * ═══════════════════════════════════════════════════════════════
 * ZUCCANO SUBSIDIARY OPERATING SYSTEM — DATA STORE & SERVICES
 * Enforces strict subsidiary isolation, autonomous CEO delegation,
 * dynamic leadership hierarchy, and parent governance bridge.
 * ═══════════════════════════════════════════════════════════════
 */

// Initial Seed Data for Subsidiaries
const INITIAL_SUBSIDIARY_DATA = {
  zfit: {
    identity: {
      id: 'zfit',
      name: 'ZFIT Technologies',
      shortName: 'ZFIT',
      tagline: 'AI Optical Mirror & Virtual Try-On Infrastructure',
      parentCompany: 'Zuccano Holding Group',
      fiscalYear: 'FY 2026-27',
      currency: 'INR',
      currencySymbol: '₹',
      totalHeadcount: 42,
      activeProjects: 8,
      fiscalBudget: 45000000, // 4.5 Cr
      utilizedBudget: 28400000,
    },
    leadership: [
      {
        id: 'lead-1',
        name: 'Pavan Zuccano',
        designation: 'Chief Executive Officer (CEO)',
        roleType: 'CEO',
        department: 'Executive Office',
        email: 'pavan.ceo@zfit.zuccano.me',
        phone: '+91 98450 11200',
        reportingTo: 'Board of Directors (Zuccano Parent)',
        joinDate: '15 Jan 2025',
        status: 'Active',
        avatar: 'PZ',
        appointedBy: 'Zuccano Holding Group',
        responsibilities: 'Full operational governance of ZFIT, capital allocation, executive appointments, parent liaison.',
      },
      {
        id: 'lead-2',
        name: 'Sameer K. Ali',
        designation: 'Chief Financial Officer (CFO)',
        roleType: 'CFO',
        department: 'Finance & Accounts',
        email: 'sameer.cfo@zfit.zuccano.me',
        phone: '+91 98450 22301',
        reportingTo: 'Pavan Zuccano (CEO)',
        joinDate: '01 Feb 2025',
        status: 'Active',
        avatar: 'SA',
        appointedBy: 'CEO (Delegated Authority)',
        responsibilities: 'Financial audit, retail unit economics, vendor settlement, fiscal compliance, capex.',
      },
      {
        id: 'lead-3',
        name: 'Ananya Deshmukh',
        designation: 'Chief Marketing Officer (CMO)',
        roleType: 'CMO',
        department: 'Brand & Growth Marketing',
        email: 'ananya.cmo@zfit.zuccano.me',
        phone: '+91 98450 33402',
        reportingTo: 'Pavan Zuccano (CEO)',
        joinDate: '10 Feb 2025',
        status: 'Active',
        avatar: 'AD',
        appointedBy: 'CEO (Delegated Authority)',
        responsibilities: 'Omnichannel mirror retail launches, luxury brand partnerships, consumer engagement.',
      },
      {
        id: 'lead-4',
        name: 'Vikramaditya Roy',
        designation: 'Head of Optical AI & Computer Vision',
        roleType: 'Department Head',
        department: 'Computer Vision & AI',
        email: 'vikram.ai@zfit.zuccano.me',
        phone: '+91 98450 44503',
        reportingTo: 'Pavan Zuccano (CEO)',
        joinDate: '15 Jan 2025',
        status: 'Active',
        avatar: 'VR',
        appointedBy: 'CEO (Delegated Authority)',
        responsibilities: '3D mesh estimation, cloth simulation rendering pipeline, real-time edge inference latency.',
      },
      {
        id: 'lead-5',
        name: 'Kavita Sundaram',
        designation: 'Head of Hardware Engineering & Mirror OS',
        roleType: 'Department Head',
        department: 'Hardware & OS Engineering',
        email: 'kavita.hw@zfit.zuccano.me',
        phone: '+91 98450 55604',
        reportingTo: 'Pavan Zuccano (CEO)',
        joinDate: '20 Jan 2025',
        status: 'Active',
        avatar: 'KS',
        appointedBy: 'CEO (Delegated Authority)',
        responsibilities: '4K micro-LED display calibration, multi-spectral camera sensors, thermal dispersion.',
      },
    ],
    departments: [
      {
        id: 'dept-cv',
        name: 'Computer Vision & AI',
        headName: 'Vikramaditya Roy',
        headId: 'lead-4',
        code: 'CV-AI',
        memberCount: 14,
        allocatedBudget: 15000000,
        utilizedBudget: 11200000,
        activeProjects: 3,
        description: 'Edge Neural Networks for body topology reconstruction and drape dynamics.',
      },
      {
        id: 'dept-hw',
        name: 'Hardware & OS Engineering',
        headName: 'Kavita Sundaram',
        headId: 'lead-5',
        code: 'HW-OS',
        memberCount: 11,
        allocatedBudget: 18000000,
        utilizedBudget: 10400000,
        activeProjects: 2,
        description: 'Smart mirror industrial design, embedded Linux architecture, sensor arrays.',
      },
      {
        id: 'dept-fin',
        name: 'Finance & Accounts',
        headName: 'Sameer K. Ali',
        headId: 'lead-2',
        code: 'FIN-ACC',
        memberCount: 4,
        allocatedBudget: 3000000,
        utilizedBudget: 1800000,
        activeProjects: 1,
        description: 'Corporate accounts, subsidiary ledger maintenance, capex audit, taxation.',
      },
      {
        id: 'dept-mkt',
        name: 'Brand & Growth Marketing',
        headName: 'Ananya Deshmukh',
        headId: 'lead-3',
        code: 'MKT-GRW',
        memberCount: 8,
        allocatedBudget: 7000000,
        utilizedBudget: 4200000,
        activeProjects: 2,
        description: 'B2B luxury brand integrations, experiential retail pop-ups, digital campaigns.',
      },
      {
        id: 'dept-ops',
        name: 'Supply Chain & Field Operations',
        headName: 'Pavan Zuccano (Acting Head)',
        headId: 'lead-1',
        code: 'OPS-SCM',
        memberCount: 5,
        allocatedBudget: 2000000,
        utilizedBudget: 800000,
        activeProjects: 1,
        description: 'Glass assembly warehousing, freight logistics, store deployment SLAs.',
      },
    ],
    employees: [
      {
        id: 'emp-101',
        name: 'Aryan Kulkarni',
        email: 'aryan.k@zfit.zuccano.me',
        department: 'Computer Vision & AI',
        designation: 'Senior Neural Mesh Engineer',
        reportingManager: 'Vikramaditya Roy',
        joinDate: '01 Mar 2025',
        status: 'Active',
        attendanceRate: '98%',
        assignedTasks: 4,
        salaryBand: 'L5',
        phone: '+91 97310 44102',
      },
      {
        id: 'emp-102',
        name: 'Priya Sen',
        email: 'priya.s@zfit.zuccano.me',
        department: 'Computer Vision & AI',
        designation: '3D Cloth Simulation Shader Lead',
        reportingManager: 'Vikramaditya Roy',
        joinDate: '15 Mar 2025',
        status: 'Active',
        attendanceRate: '96%',
        assignedTasks: 3,
        salaryBand: 'L5',
        phone: '+91 97310 44103',
      },
      {
        id: 'emp-103',
        name: 'Rohan Mehra',
        email: 'rohan.m@zfit.zuccano.me',
        department: 'Hardware & OS Engineering',
        designation: 'Firmware Architect (ARM Cortex)',
        reportingManager: 'Kavita Sundaram',
        joinDate: '10 Feb 2025',
        status: 'Active',
        attendanceRate: '100%',
        assignedTasks: 2,
        salaryBand: 'L6',
        phone: '+91 97310 44104',
      },
      {
        id: 'emp-104',
        name: 'Tanvi Joshi',
        email: 'tanvi.j@zfit.zuccano.me',
        department: 'Brand & Growth Marketing',
        designation: 'B2B Retail Partnerships Manager',
        reportingManager: 'Ananya Deshmukh',
        joinDate: '20 Feb 2025',
        status: 'Active',
        attendanceRate: '94%',
        assignedTasks: 5,
        salaryBand: 'L4',
        phone: '+91 97310 44105',
      },
      {
        id: 'emp-105',
        name: 'Harish Chandra',
        email: 'harish.c@zfit.zuccano.me',
        department: 'Finance & Accounts',
        designation: 'Senior Corporate Accountant',
        reportingManager: 'Sameer K. Ali',
        joinDate: '05 Feb 2025',
        status: 'Active',
        attendanceRate: '99%',
        assignedTasks: 2,
        salaryBand: 'L4',
        phone: '+91 97310 44106',
      },
      {
        id: 'emp-106',
        name: 'Sneha Patel',
        email: 'sneha.p@zfit.zuccano.me',
        department: 'Hardware & OS Engineering',
        designation: 'Optical Sensor Calibration Tech',
        reportingManager: 'Kavita Sundaram',
        joinDate: '12 Mar 2025',
        status: 'Active',
        attendanceRate: '97%',
        assignedTasks: 3,
        salaryBand: 'L3',
        phone: '+91 97310 44107',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'Smart Mirror Gen 3 — 4K Micro-LED Calibration',
        code: 'ZFIT-PRJ-01',
        department: 'Hardware & OS Engineering',
        manager: 'Kavita Sundaram',
        priority: 'High',
        status: 'In Progress',
        progress: 82,
        startDate: '01 Jan 2026',
        targetDate: '30 Apr 2026',
        budget: 9500000,
        objective: 'Reduce optical reflection latency to under 16ms and integrate HDR ambient luminance sensors.',
        deliverablesCount: 14,
        completedDeliverables: 11,
      },
      {
        id: 'proj-2',
        name: 'Neural Mesh Cloth Dynamics Engine v2.6',
        code: 'ZFIT-PRJ-02',
        department: 'Computer Vision & AI',
        manager: 'Vikramaditya Roy',
        priority: 'High',
        status: 'In Progress',
        progress: 74,
        startDate: '15 Jan 2026',
        targetDate: '15 May 2026',
        budget: 8200000,
        objective: 'Real-time raytraced drape simulation for silk, denim, and layered garments in 60fps.',
        deliverablesCount: 18,
        completedDeliverables: 13,
      },
      {
        id: 'proj-3',
        name: 'DLF Mall of India Flagship Mirror Store Pilot',
        code: 'ZFIT-PRJ-03',
        department: 'Brand & Growth Marketing',
        manager: 'Ananya Deshmukh',
        priority: 'Medium',
        status: 'Planning',
        progress: 35,
        startDate: '10 Feb 2026',
        targetDate: '30 Jun 2026',
        budget: 4500000,
        objective: 'Deploy 6 interactive fitting booths with Zara & H&M garment catalog synchronization.',
        deliverablesCount: 8,
        completedDeliverables: 3,
      },
      {
        id: 'proj-4',
        name: 'Enterprise Telemetry & Over-The-Air Fleet Gateway',
        code: 'ZFIT-PRJ-04',
        department: 'Hardware & OS Engineering',
        manager: 'Rohan Mehra',
        priority: 'Low',
        status: 'In Progress',
        progress: 60,
        startDate: '01 Feb 2026',
        targetDate: '30 Jul 2026',
        budget: 2500000,
        objective: 'Centralized telemetry daemon reporting uptime, crash logs, and sensor drift to HQ.',
        deliverablesCount: 6,
        completedDeliverables: 4,
      },
    ],
    tasks: [
      {
        id: 'tsk-201',
        title: 'Optimize ARM Cortex Edge Shader Pipeline for 60fps',
        projectName: 'Smart Mirror Gen 3 — 4K Micro-LED Calibration',
        projectId: 'proj-1',
        assigneeName: 'Aryan Kulkarni',
        assigneeEmail: 'aryan.k@zfit.zuccano.me',
        department: 'Computer Vision & AI',
        priority: 'High',
        status: 'Under Review',
        dueDate: '05 Nov 2026',
        description: 'Optimize vertex buffer allocations to eliminate stutter during rapid arm and shoulder motion.',
        submissionLink: 'https://github.com/zuccano/zfit-core/pull/184',
        submissionNotes: 'Benchmark reduced frame time from 34ms to 15.8ms on Rockchip 3588.',
      },
      {
        id: 'tsk-202',
        title: 'Calibrate Silk Shaders under 4000K Store Ambient Lumens',
        projectName: 'Neural Mesh Cloth Dynamics Engine v2.6',
        projectId: 'proj-2',
        assigneeName: 'Priya Sen',
        assigneeEmail: 'priya.s@zfit.zuccano.me',
        department: 'Computer Vision & AI',
        priority: 'High',
        status: 'Completed',
        dueDate: '31 Oct 2026',
        description: 'Tune specular reflections so silk behaves naturally without exaggerated mirror glares.',
        submissionLink: 'https://cdn.zuccano.me/assets/shaders/silk_v2.6.bin',
        submissionNotes: 'Validated against physical fabric swatches under halogen and daylight spectrum.',
      },
      {
        id: 'tsk-203',
        title: 'Draft Master Service Agreement for DLF Mall Retail Space',
        projectName: 'DLF Mall of India Flagship Mirror Store Pilot',
        projectId: 'proj-3',
        assigneeName: 'Tanvi Joshi',
        assigneeEmail: 'tanvi.j@zfit.zuccano.me',
        department: 'Brand & Growth Marketing',
        priority: 'Medium',
        status: 'In Progress',
        dueDate: '12 Nov 2026',
        description: 'Review SLA clause 4.2 with DLF legal regarding store power backup and night-time maintenance windows.',
        submissionLink: '',
        submissionNotes: '',
      },
      {
        id: 'tsk-204',
        title: 'Prepare Q3 Capex Reconciliation for Optical Sensors',
        projectName: 'Enterprise Telemetry & Over-The-Air Fleet Gateway',
        projectId: 'proj-4',
        assigneeName: 'Harish Chandra',
        assigneeEmail: 'harish.c@zfit.zuccano.me',
        department: 'Finance & Accounts',
        priority: 'Medium',
        status: 'To Do',
        dueDate: '15 Nov 2026',
        description: 'Reconcile 240 imported Sony IMX sensor invoices against customs clearance receipts.',
        submissionLink: '',
        submissionNotes: '',
      },
    ],
    attendanceRecords: [
      {
        id: 'att-1',
        date: '2026-10-31',
        employeeName: 'Aryan Kulkarni',
        department: 'Computer Vision & AI',
        checkIn: '09:12 AM',
        checkOut: '06:45 PM',
        status: 'Present',
        location: 'Bengaluru Lab',
      },
      {
        id: 'att-2',
        date: '2026-10-31',
        employeeName: 'Priya Sen',
        department: 'Computer Vision & AI',
        checkIn: '09:28 AM',
        checkOut: '06:30 PM',
        status: 'Present',
        location: 'Bengaluru Lab',
      },
      {
        id: 'att-3',
        date: '2026-10-31',
        employeeName: 'Rohan Mehra',
        department: 'Hardware & OS Engineering',
        checkIn: '10:15 AM',
        checkOut: '07:10 PM',
        status: 'Late',
        location: 'Hardware Prototyping Bay',
      },
      {
        id: 'att-4',
        date: '2026-10-31',
        employeeName: 'Tanvi Joshi',
        department: 'Brand & Growth Marketing',
        checkIn: '09:05 AM',
        checkOut: '06:15 PM',
        status: 'Present',
        location: 'Client Site (DLF Mall)',
      },
      {
        id: 'att-5',
        date: '2026-10-31',
        employeeName: 'Harish Chandra',
        department: 'Finance & Accounts',
        checkIn: '—',
        checkOut: '—',
        status: 'On Leave',
        location: 'Medical Leave',
      },
    ],
    leaveRequests: [
      {
        id: 'lev-301',
        employeeName: 'Harish Chandra',
        department: 'Finance & Accounts',
        type: 'Sick Leave',
        startDate: '2026-10-31',
        endDate: '2026-11-01',
        days: 2,
        reason: 'Viral fever and prescribed medical rest.',
        status: 'Approved',
        appliedOn: '2026-10-30',
        approver: 'Sameer K. Ali (CFO)',
      },
      {
        id: 'lev-302',
        employeeName: 'Rohan Mehra',
        department: 'Hardware & OS Engineering',
        type: 'Casual Leave',
        startDate: '2026-11-08',
        endDate: '2026-11-10',
        days: 3,
        reason: 'Family wedding ceremony in Jaipur.',
        status: 'Pending',
        appliedOn: '2026-10-30',
        approver: 'Kavita Sundaram (Dept Head)',
      },
      {
        id: 'lev-303',
        employeeName: 'Sneha Patel',
        department: 'Hardware & OS Engineering',
        type: 'Annual Leave',
        startDate: '2026-11-18',
        endDate: '2026-11-22',
        days: 5,
        reason: 'Annual personal wellness time-off.',
        status: 'Pending',
        appliedOn: '2026-10-31',
        approver: 'Kavita Sundaram (Dept Head)',
      },
    ],
    expenses: [
      {
        id: 'exp-401',
        title: 'Sony IMX Optical Image Sensors Batch #4 (120 units)',
        department: 'Hardware & OS Engineering',
        amount: 840000,
        category: 'R&D Equipment',
        date: '2026-10-24',
        submittedBy: 'Kavita Sundaram',
        status: 'Approved',
        invoiceNumber: 'INV-SNY-9921',
        notes: 'Procured for Gen 3 Smart Mirror pre-production run.',
      },
      {
        id: 'exp-402',
        title: 'GPU Cluster Compute (H100 Cloud Inference Training)',
        department: 'Computer Vision & AI',
        amount: 420000,
        category: 'Cloud Infrastructure',
        date: '2026-10-28',
        submittedBy: 'Vikramaditya Roy',
        status: 'Approved',
        invoiceNumber: 'INV-LAM-4421',
        notes: 'Drape dynamic neural networks fine-tuning.',
      },
      {
        id: 'exp-403',
        title: 'DLF Mall Experiential Booth Fabrication Advance',
        department: 'Brand & Growth Marketing',
        amount: 350000,
        category: 'Marketing & Events',
        date: '2026-10-30',
        submittedBy: 'Ananya Deshmukh',
        status: 'Pending Approval',
        invoiceNumber: 'INV-FAB-108',
        notes: 'Requires Subsidiary CEO sign-off for marketing capex > 2.5L.',
      },
      {
        id: 'exp-404',
        title: 'Thermal Dissipation Coating Samples from Schott Glass',
        department: 'Hardware & OS Engineering',
        amount: 125000,
        category: 'Prototyping',
        date: '2026-10-31',
        submittedBy: 'Rohan Mehra',
        status: 'Pending Approval',
        invoiceNumber: 'INV-SCT-009',
        notes: 'Sample sheets to evaluate touch response under ambient heat.',
      },
    ],
    calendarEvents: [
      {
        id: 'cal-1',
        title: 'ZFIT Executive Leadership Sync (CEO, CFO, CMO)',
        date: '2026-11-02',
        time: '10:00 AM - 11:30 AM',
        type: 'Leadership Meeting',
        location: 'Executive Boardroom & Virtual',
        organizer: 'Pavan Zuccano (CEO)',
      },
      {
        id: 'cal-2',
        title: 'Gen 3 Micro-LED Mirror Optical Benchmark Sign-off',
        date: '2026-11-05',
        time: '02:00 PM - 04:00 PM',
        type: 'Milestone',
        location: 'Bengaluru Optics Lab',
        organizer: 'Vikramaditya Roy & Kavita Sundaram',
      },
      {
        id: 'cal-3',
        title: 'DLF Retail Legal Review & Agreement Finalization',
        date: '2026-11-09',
        time: '11:00 AM - 12:30 PM',
        type: 'Commercial Review',
        location: 'Legal Conference Room',
        organizer: 'Ananya Deshmukh',
      },
      {
        id: 'cal-4',
        title: 'ZFIT All-Hands Company Briefing',
        date: '2026-11-15',
        time: '04:30 PM - 05:30 PM',
        type: 'All-Hands',
        location: 'ZFIT Main Auditorium',
        organizer: 'Pavan Zuccano (CEO)',
      },
    ],
    documents: [
      {
        id: 'doc-1',
        title: 'ZFIT Corporate Operating Charter & Governance Protocol',
        category: 'Corporate Governance',
        fileSize: '1.8 MB',
        uploadedBy: 'Pavan Zuccano (CEO)',
        uploadedAt: '2026-01-20',
        accessRole: 'Leadership Only',
        format: 'PDF',
      },
      {
        id: 'doc-2',
        title: 'Optical Mirror Intellectual Property & Patent Filing v2',
        category: 'Patents & Technology',
        fileSize: '4.2 MB',
        uploadedBy: 'Vikramaditya Roy',
        uploadedAt: '2026-02-14',
        accessRole: 'Leadership Only',
        format: 'PDF',
      },
      {
        id: 'doc-3',
        title: 'ZFIT Employee Code of Conduct, NDA & IP Assignment',
        category: 'HR & People Operations',
        fileSize: '840 KB',
        uploadedBy: 'Sameer K. Ali (CFO)',
        uploadedAt: '2026-01-22',
        accessRole: 'All Employees',
        format: 'PDF',
      },
      {
        id: 'doc-4',
        title: 'Q2 Financial Audit & Tax Ledger Certified by Auditors',
        category: 'Finance & Compliance',
        fileSize: '3.1 MB',
        uploadedBy: 'Sameer K. Ali (CFO)',
        uploadedAt: '2026-10-15',
        accessRole: 'CEO & CFO Only',
        format: 'PDF',
      },
    ],
    announcements: [
      {
        id: 'ann-1',
        title: 'Smart Mirror Gen 3 Prototype Surpasses Internal Latency Targets',
        author: 'Pavan Zuccano (CEO)',
        date: '2026-10-28',
        audience: 'Company-Wide',
        priority: 'High',
        content: 'Team, our hardware and computer vision teams have achieved 15.8ms latency on the ARM edge boards. This is well ahead of our 20ms objective. Congratulations to the optics lab for their tireless testing.',
      },
      {
        id: 'ann-2',
        title: 'Leadership Alignment: CFO Authorized Budget for Q3 Component Sourcing',
        author: 'Sameer K. Ali (CFO)',
        date: '2026-10-25',
        audience: 'Leadership Team',
        priority: 'Normal',
        content: 'Department Heads are requested to submit Q3 component requisition requests before Friday 5 PM for consolidated volume pricing with Sony and Schott.',
      },
    ],
    zuccanoReports: [
      {
        id: 'rep-901',
        month: 'October',
        year: 2026,
        title: 'ZFIT Q2 Performance, Latency Breakthrough & Retail Expansion',
        status: 'Submitted to Parent (Zuccano Board)',
        submittedAt: '2026-10-29 14:30',
        summary: 'ZFIT has achieved breakthrough sub-16ms optical tracking latency on edge silicon, reducing bill of materials by 18%. Commercial talks with DLF Mall of India for 6 smart fitting booths are in advanced documentation.',
        milestones: [
          'Optical edge latency down from 34ms to 15.8ms on Rockchip 3588.',
          '4K micro-LED optical contrast ratio validated in store lighting simulation.',
          'ZFIT core engineering headcount scaled from 28 to 42 without budget variance.',
        ],
        risksAndMitigation: 'Sony IMX sensor lead times extended by 3 weeks due to global foundry maintenance. Mitigated by pre-booking 300 units via approved capex buffer.',
        financialHealth: 'Budget utilized: ₹2.84 Cr / ₹4.50 Cr authorized (63% burn rate, on schedule). Gross margin model projected at 58% per retail mirror installation.',
        resourceRequests: 'Requesting parent-level board approval for international patent filings across US and EU jurisdictions for the multi-spectral fabric drape estimation patent.',
        parentFeedback: 'Acknowledged by Zuccano Group Governance Council on Oct 30. Parent legal council will coordinate the international IP filing.',
      },
    ],
    auditLogs: [
      {
        id: 'aud-1',
        actor: 'Pavan Zuccano (CEO)',
        action: 'APPOINTED_LEADERSHIP',
        target: 'Sameer K. Ali as Chief Financial Officer',
        timestamp: '2026-02-01 10:00:00',
        details: 'CEO delegated operational finance and capex audit authority.',
      },
      {
        id: 'aud-2',
        actor: 'Sameer K. Ali (CFO)',
        action: 'APPROVED_EXPENSE',
        target: 'Sony IMX Optical Image Sensors (₹8,40,000)',
        timestamp: '2026-10-24 16:15:22',
        details: 'Verified against vendor quotation and component requisition form.',
      },
      {
        id: 'aud-3',
        actor: 'Pavan Zuccano (CEO)',
        action: 'SUBMITTED_PARENT_REPORT',
        target: 'Report to Zuccano: October 2026 Executive Performance',
        timestamp: '2026-10-29 14:30:10',
        details: 'Submitted formal governance report to Zuccano Holding Company Board.',
      },
    ],
  },
  consumer: {
    identity: {
      id: 'consumer',
      name: 'Zuccano Consumer Technologies',
      shortName: 'Consumer',
      tagline: 'Connected Smart Rings, Biometric Hardware & Health OS',
      parentCompany: 'Zuccano Holding Group',
      fiscalYear: 'FY 2026-27',
      currency: 'INR',
      currencySymbol: '₹',
      totalHeadcount: 38,
      activeProjects: 6,
      fiscalBudget: 38000000,
      utilizedBudget: 22100000,
    },
    leadership: [
      {
        id: 'lead-c1',
        name: 'Rohan Verma',
        designation: 'Chief Executive Officer (CEO)',
        roleType: 'CEO',
        department: 'Executive Office',
        email: 'rohan.ceo@consumer.zuccano.me',
        phone: '+91 98450 66700',
        reportingTo: 'Board of Directors (Zuccano Parent)',
        joinDate: '10 Jan 2025',
        status: 'Active',
        avatar: 'RV',
        appointedBy: 'Zuccano Holding Group',
        responsibilities: 'Autonomous leadership of Zuccano Consumer division, wearables hardware roadmap, global distribution.',
      },
    ],
    departments: [
      {
        id: 'dept-c-hw',
        name: 'Wearable Hardware & Firmware',
        headName: 'Rohan Verma (Acting)',
        headId: 'lead-c1',
        code: 'W-HW',
        memberCount: 16,
        allocatedBudget: 18000000,
        utilizedBudget: 11000000,
        activeProjects: 3,
        description: 'Titanium chassis milling, PPG optical sensor integration, BLE 5.3 firmware.',
      },
    ],
    employees: [],
    projects: [],
    tasks: [],
    attendanceRecords: [],
    leaveRequests: [],
    expenses: [],
    calendarEvents: [],
    documents: [],
    announcements: [],
    zuccanoReports: [],
    auditLogs: [],
  },
  business: {
    identity: {
      id: 'business',
      name: 'Zuccano Business & Enterprise IoT',
      shortName: 'Business',
      tagline: 'Store Automation, Fleet Edge Gateways & Enterprise SLAs',
      parentCompany: 'Zuccano Holding Group',
      fiscalYear: 'FY 2026-27',
      currency: 'INR',
      currencySymbol: '₹',
      totalHeadcount: 32,
      activeProjects: 5,
      fiscalBudget: 32000000,
      utilizedBudget: 19500000,
    },
    leadership: [
      {
        id: 'lead-b1',
        name: 'Kavita Rao',
        designation: 'Chief Executive Officer (CEO)',
        roleType: 'CEO',
        department: 'Executive Office',
        email: 'kavita.ceo@business.zuccano.me',
        phone: '+91 98450 88900',
        reportingTo: 'Board of Directors (Zuccano Parent)',
        joinDate: '10 Jan 2025',
        status: 'Active',
        avatar: 'KR',
        appointedBy: 'Zuccano Holding Group',
        responsibilities: 'Enterprise B2B growth, client SLA adherence, retail IoT infrastructure deployments.',
      },
    ],
    departments: [],
    employees: [],
    projects: [],
    tasks: [],
    attendanceRecords: [],
    leaveRequests: [],
    expenses: [],
    calendarEvents: [],
    documents: [],
    announcements: [],
    zuccanoReports: [],
    auditLogs: [],
  },
};

/**
 * Subsidiary Store Manager
 */
class SubsidiaryStore {
  constructor() {
    this.listeners = new Set();
  }

  // Get current storage key
  getStorageKey(subsidiaryId) {
    return `zuccano_subsidiary_v3_${subsidiaryId}`;
  }

  // Load subsidiary data with fallback to seeds
  getData(subsidiaryId = 'zfit') {
    const key = this.getStorageKey(subsidiaryId);
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse subsidiary data, resetting to seed:', e);
      }
    }
    const seed = INITIAL_SUBSIDIARY_DATA[subsidiaryId] || INITIAL_SUBSIDIARY_DATA.zfit;
    this.saveData(subsidiaryId, seed);
    return seed;
  }

  // Persist subsidiary data and notify listeners
  saveData(subsidiaryId, data) {
    const key = this.getStorageKey(subsidiaryId);
    localStorage.setItem(key, JSON.stringify(data));
    this.notify(subsidiaryId, data);
  }

  // Subscribe to changes
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(subsidiaryId, data) {
    this.listeners.forEach((listener) => {
      try {
        listener({ subsidiaryId, data });
      } catch (e) {
        console.error('Store listener error:', e);
      }
    });
  }

  // ── Leadership Methods ──
  appointLeadership(subsidiaryId, member) {
    const data = this.getData(subsidiaryId);
    const newMember = {
      ...member,
      id: `lead-${Date.now()}`,
      appointedBy: 'CEO (Delegated Authority)',
      status: 'Active',
      joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      avatar: member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
    };
    data.leadership.push(newMember);

    // Record audit log
    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: 'CEO',
      action: 'APPOINTED_LEADERSHIP',
      target: `${newMember.name} as ${newMember.designation}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Designated for department ${newMember.department}.`,
    });

    this.saveData(subsidiaryId, data);
    return newMember;
  }

  removeLeadership(subsidiaryId, memberId) {
    const data = this.getData(subsidiaryId);
    const target = data.leadership.find((m) => m.id === memberId);
    if (!target) return false;
    if (target.roleType === 'CEO') {
      throw new Error('CEO position cannot be removed via internal workspace.');
    }
    data.leadership = data.leadership.filter((m) => m.id !== memberId);

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: 'CEO',
      action: 'DEACTIVATED_LEADERSHIP',
      target: `${target.name} (${target.designation})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: 'Relieved from subsidiary leadership role by CEO order.',
    });

    this.saveData(subsidiaryId, data);
    return true;
  }

  // ── Department Methods ──
  createDepartment(subsidiaryId, dept) {
    const data = this.getData(subsidiaryId);
    const newDept = {
      ...dept,
      id: `dept-${Date.now()}`,
      memberCount: 0,
      utilizedBudget: 0,
      activeProjects: 0,
    };
    data.departments.push(newDept);

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: 'CEO',
      action: 'CREATED_DEPARTMENT',
      target: `${newDept.name} (${newDept.code})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Allocated Budget: ₹${(newDept.allocatedBudget || 0).toLocaleString('en-IN')}`,
    });

    this.saveData(subsidiaryId, data);
    return newDept;
  }

  // ── Employee Methods ──
  addEmployee(subsidiaryId, emp) {
    const data = this.getData(subsidiaryId);
    const newEmp = {
      ...emp,
      id: `emp-${Date.now()}`,
      status: 'Active',
      joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      attendanceRate: '100%',
      assignedTasks: 0,
    };
    data.employees.push(newEmp);
    data.identity.totalHeadcount += 1;

    // Update department member count
    const dept = data.departments.find((d) => d.name === emp.department);
    if (dept) dept.memberCount += 1;

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: 'CEO / Operations',
      action: 'ONBOARDED_EMPLOYEE',
      target: `${newEmp.name} (${newEmp.designation})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Assigned to department: ${newEmp.department}`,
    });

    this.saveData(subsidiaryId, data);
    return newEmp;
  }

  updateEmployeeStatus(subsidiaryId, employeeId, newStatus) {
    const data = this.getData(subsidiaryId);
    const emp = data.employees.find((e) => e.id === employeeId);
    if (!emp) return false;
    emp.status = newStatus;

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: 'CEO / HR',
      action: 'EMPLOYEE_STATUS_UPDATE',
      target: `${emp.name} -> ${newStatus}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Updated employment status to ${newStatus}`,
    });

    this.saveData(subsidiaryId, data);
    return emp;
  }

  // ── Project Methods ──
  createProject(subsidiaryId, project) {
    const data = this.getData(subsidiaryId);
    const newProj = {
      ...project,
      id: `proj-${Date.now()}`,
      code: `${data.identity.shortName}-PRJ-${data.projects.length + 1}`,
      progress: 0,
      status: project.status || 'Planning',
      deliverablesCount: project.deliverablesCount || 5,
      completedDeliverables: 0,
    };
    data.projects.push(newProj);
    data.identity.activeProjects += 1;

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: 'CEO',
      action: 'INITIATED_PROJECT',
      target: newProj.name,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Assigned to manager ${newProj.manager}. Budget: ₹${(newProj.budget || 0).toLocaleString('en-IN')}`,
    });

    this.saveData(subsidiaryId, data);
    return newProj;
  }

  // ── Task Methods ──
  createTask(subsidiaryId, task) {
    const data = this.getData(subsidiaryId);
    const newTask = {
      ...task,
      id: `tsk-${Date.now()}`,
      status: 'To Do',
      submissionLink: '',
      submissionNotes: '',
    };
    data.tasks.push(newTask);

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: 'Leadership',
      action: 'CREATED_TASK',
      target: newTask.title,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Assigned to ${newTask.assigneeName}. Priority: ${newTask.priority}`,
    });

    this.saveData(subsidiaryId, data);
    return newTask;
  }

  updateTaskStatus(subsidiaryId, taskId, status, notes = '') {
    const data = this.getData(subsidiaryId);
    const task = data.tasks.find((t) => t.id === taskId);
    if (!task) return false;
    task.status = status;
    if (notes) task.submissionNotes = notes;

    this.saveData(subsidiaryId, data);
    return task;
  }

  // ── Leave Methods ──
  approveLeave(subsidiaryId, leaveId, isApproved, reviewerName = 'Pavan Zuccano (CEO)') {
    const data = this.getData(subsidiaryId);
    const leave = data.leaveRequests.find((l) => l.id === leaveId);
    if (!leave) return false;
    leave.status = isApproved ? 'Approved' : 'Rejected';
    leave.approver = reviewerName;

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: reviewerName,
      action: isApproved ? 'LEAVE_APPROVED' : 'LEAVE_REJECTED',
      target: `${leave.employeeName} (${leave.type})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `${leave.days} days from ${leave.startDate} to ${leave.endDate}`,
    });

    this.saveData(subsidiaryId, data);
    return leave;
  }

  // ── Expense Methods ──
  approveExpense(subsidiaryId, expenseId, isApproved, reviewerName = 'Pavan Zuccano (CEO)') {
    const data = this.getData(subsidiaryId);
    const exp = data.expenses.find((e) => e.id === expenseId);
    if (!exp) return false;
    exp.status = isApproved ? 'Approved' : 'Rejected';

    if (isApproved) {
      data.identity.utilizedBudget += exp.amount;
    }

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: reviewerName,
      action: isApproved ? 'EXPENSE_APPROVED' : 'EXPENSE_REJECTED',
      target: `${exp.title} (₹${exp.amount.toLocaleString('en-IN')})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Submitted by ${exp.submittedBy} for department ${exp.department}`,
    });

    this.saveData(subsidiaryId, data);
    return exp;
  }

  addExpense(subsidiaryId, expense) {
    const data = this.getData(subsidiaryId);
    const newExp = {
      ...expense,
      id: `exp-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'Pending Approval',
    };
    data.expenses.push(newExp);
    this.saveData(subsidiaryId, data);
    return newExp;
  }

  // ── Announcement Methods ──
  publishAnnouncement(subsidiaryId, ann) {
    const data = this.getData(subsidiaryId);
    const newAnn = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    data.announcements.unshift(newAnn);

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: ann.author || 'CEO',
      action: 'PUBLISHED_ANNOUNCEMENT',
      target: newAnn.title,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Target Audience: ${newAnn.audience}`,
    });

    this.saveData(subsidiaryId, data);
    return newAnn;
  }

  // ── Report to Zuccano Parent Holding Company ──
  submitReportToZuccano(subsidiaryId, report) {
    const data = this.getData(subsidiaryId);
    const newReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'Submitted to Parent (Zuccano Board)',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      parentFeedback: 'Awaiting parent review at next executive holding session.',
    };
    data.zuccanoReports.unshift(newReport);

    data.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actor: 'CEO',
      action: 'SUBMITTED_PARENT_REPORT',
      target: `Report to Zuccano: ${newReport.title}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: 'Formal governance report delivered to parent company board.',
    });

    this.saveData(subsidiaryId, data);
    return newReport;
  }
}

export const subsidiaryStore = new SubsidiaryStore();
export default subsidiaryStore;
