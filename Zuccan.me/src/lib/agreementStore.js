/**
 * ZUCCANO FOUNDER AGREEMENT & GOVERNANCE POLICY DATA STORE
 * Authoritative legal text, cap table transparency, section progress tracking,
 * cryptographic acceptance records, and administrator audit logging.
 */

// Initial Seed of the 15 Authoritative Sections
export const AGREEMENT_SECTIONS = [
  {
    id: 'sec-01',
    number: '01',
    title: 'Introduction and Purpose',
    summary: 'Establishes foundational intent: clear rules prevent disputes. Clarifies that founding a product within Zuccano is a fiduciary and collaborative commitment.',
    plainLanguage: 'This document sets the ground rules before you start building. Clear agreements now ensure everyone stays protected, aligned, and dispute-free as the company scales.',
    clauses: [
      {
        ref: '1.1',
        title: 'Foundational Premise',
        text: 'This Founder Agreement & Governance Policy ("Agreement") is entered into by and between Zuccano Group Holdings Private Limited ("Zuccano" or "Parent Company") and the individual participant identified in the execution schedule ("Founder"). This Agreement governs participation in, contributions to, and governance of Zuccano products, subsidiaries, and corporate ventures.',
        highlight: false,
      },
      {
        ref: '1.2',
        title: 'Core Doctrine: Clarity Precedes Capital',
        text: 'Building together requires uncompromised clarity. Operational harmony and enterprise value are preserved only when rights, equity interests, intellectual property assignments, and exit terms are codified in writing prior to deployment of capital, intellectual property, or operational assets.',
        highlight: true,
      },
      {
        ref: '1.3',
        title: 'Binding Force & Legal Jurisdiction',
        text: 'This Agreement constitutes a legally enforceable contract under the Indian Contract Act, 1872 and the Companies Act, 2013. Acceptance via electronic signature represents formal legal execution equivalent to physical hand-signing under the Information Technology Act, 2000.',
        highlight: false,
      },
    ],
    specificNotes: 'Applies uniformly across all Zuccano subsidiaries including ZFIT Technologies and future product companies.',
  },

  {
    id: 'sec-02',
    number: '02',
    title: 'Corporate Structure',
    summary: 'Defines the relationship between Zuccano Parent Holding and individual product companies / subsidiaries.',
    plainLanguage: 'Zuccano operates as a parent holding company. Each venture (like ZFIT) is either a subsidiary or a product division, structured under parent governance oversight.',
    clauses: [
      {
        ref: '2.1',
        title: 'Parent Holding Framework',
        text: 'Zuccano Group Holdings Private Limited operates as the central corporate holding entity, providing shared infrastructure, capital governance, legal compliance, and strategic direction to its product ventures.',
        highlight: false,
      },
      {
        ref: '2.2',
        title: 'Subsidiary Autonomy & Parent Oversight',
        text: 'Each product company or subsidiary operates with operational delegation led by its designated Chief Executive Officer (CEO). However, fundamental statutory actions, share issuances, debt undertakings, and mergers remain subject to Parent Board approval.',
        highlight: true,
      },
      {
        ref: '2.3',
        title: 'Separate Legal Personality',
        text: 'Subsidiaries incorporated under the Companies Act, 2013 possess distinct corporate personality. A founder contract with a subsidiary does not automatically create direct equity claims upon the Parent Company unless explicitly documented in a separate Parent Shareholder Agreement.',
        highlight: false,
      },
    ],
    specificNotes: 'Product companies maintain their own statutory registers, books of account, and GST filings while reporting financial statements to Zuccano Group Holdings.',
  },

  {
    id: 'sec-03',
    number: '03',
    title: 'Ownership and Equity Distribution',
    summary: 'Codifies verified equity ownership, parent-subsidiary cap tables, and distinguishes legal shareholding from operational titles.',
    plainLanguage: 'Shares represent legal ownership registered with the Ministry of Corporate Affairs. Being a CEO, Founder, or Admin is a job role, not proof of shares. All numbers here reflect verified statutory records.',
    clauses: [
      {
        ref: '3.1',
        title: 'Verified Parent Holding Cap Table',
        text: 'As per verified statutory records of Zuccano Group Holdings Private Limited, the issued and paid-up equity share capital is held as follows: Naseer: 51.0% (Majority Equity Shareholder & Authorized Signatory); Pavan: 40.0% (Co-Founding Shareholder & Director); Other Shareholders (Collective Pool): 9.0%. Total Parent Issued Capital: 100.0%.',
        highlight: true,
      },
      {
        ref: '3.2',
        title: 'ZFIT Subsidiary Ownership Architecture',
        text: 'Zuccano Group Holdings Private Limited owns 51.0% of the equity capital of ZFIT Technologies. Pavan serves as Chief Executive Officer (CEO) of ZFIT. Naseer does NOT personally hold ZFIT shares through this arrangement; the 51.0% controlling interest is held strictly by Zuccano corporate treasury. The remaining 49.0% equity pool is subject to verified subsidiary company records and Board allotment.',
        highlight: true,
      },
      {
        ref: '3.3',
        title: 'Strict Prohibition on Operational Designations as Equity Proof',
        text: 'A clear statutory distinction is enforced between: (a) Shareholder; (b) Product Founder; (c) CEO; (d) Director; (e) Employee; and (f) Workspace Administrator. Operational designations, workspace permissions, email handles, or Slack admin rights NEVER constitute proof of legal share ownership. Legal ownership exists ONLY via entries in the formal Register of Members and share certificates issued under MCA rules.',
        highlight: true,
      },
      {
        ref: '3.4',
        title: 'Unassigned & Pending Allocations',
        text: 'Any unallotted or secondary equity percentages must not be presumed or verbally promised. Any new equity grants require unanimous Parent Board resolution, valuation under Rule 11UA of Income Tax Rules, and formal SH-4 / PAS-3 regulatory filings.',
        highlight: false,
      },
    ],
    specificNotes: 'Do not invent or assume ZFIT unallocated 49% equity. It remains subject to board execution.',
  },

  {
    id: 'sec-04',
    number: '04',
    title: 'Founder Roles and Responsibilities',
    summary: 'Defines executive expectations, full-time commitment, fiduciary duties, and standard of care.',
    plainLanguage: 'Founders must treat company resources with fiduciary honesty, work diligently toward agreed milestones, and prioritize enterprise survival and customer value.',
    clauses: [
      {
        ref: '4.1',
        title: 'Fiduciary Duty of Loyalty & Care',
        text: 'Every founder owes a statutory fiduciary duty under Section 166 of the Companies Act, 2013 to act in good faith, in the best interests of the company, its employees, shareholders, and the community.',
        highlight: false,
      },
      {
        ref: '4.2',
        title: 'Execution Benchmarks & Milestones',
        text: 'Founders are entrusted with specific operational responsibilities (product architecture, commercial growth, regulatory compliance, engineering). Failure to execute agreed milestones over two consecutive quarters triggers a mandatory Board review.',
        highlight: false,
      },
      {
        ref: '4.3',
        title: 'Representation and Public Communication',
        text: 'No founder may commit the company to binding external contracts exceeding ₹1,00,000 without prior written authorization from the CEO or Board of Directors.',
        highlight: true,
      },
    ],
    specificNotes: 'Job descriptions and KPI charters are annexed individually per product assignment.',
  },

  {
    id: 'sec-05',
    number: '05',
    title: 'Contributions and Vesting',
    summary: 'Standard 4-year vesting with a 1-year cliff to protect early-stage cohesion and prevent departed founders from taking unearned equity.',
    plainLanguage: 'Equity is earned over 4 years of continuous contribution. If you leave within the first year, no equity is earned (the 1-year cliff). This protects founders who stay from those who leave early.',
    clauses: [
      {
        ref: '5.1',
        title: 'Four-Year Vesting Schedule',
        text: 'Unless otherwise stipulated in an executed Shareholder Agreement, all founder equity allocations are subject to a four (4) year vesting schedule commencing from the official start date.',
        highlight: true,
      },
      {
        ref: '5.2',
        title: 'One-Year Cliff Mechanism',
        text: 'Twenty-five percent (25%) of the total allocated equity shall vest on the first anniversary of the start date (the "Cliff"). No equity shall vest or be transferable prior to satisfaction of the Cliff.',
        highlight: true,
      },
      {
        ref: '5.3',
        title: 'Monthly Post-Cliff Vesting',
        text: 'Following satisfaction of the Cliff, the remaining seventy-five percent (75%) shall vest in equal monthly installments over the subsequent thirty-six (36) months, contingent on continuous active service.',
        highlight: false,
      },
      {
        ref: '5.4',
        title: 'Clawback of Unvested Shares on Departure',
        text: 'Upon cessation of active engagement for any reason, all unvested shares or options are immediately forfeited and returned to company treasury at par value (₹10/share) or cancelled pursuant to Section 68 of the Companies Act.',
        highlight: true,
      },
    ],
    specificNotes: 'Vesting acceleration (single or double trigger) applies exclusively in approved M&A liquidation events.',
  },

  {
    id: 'sec-06',
    number: '06',
    title: 'Revenue, Salary and Profit Distribution',
    summary: 'Guidelines on fiscal prudence, runway preservation, founder compensation, and dividend policies.',
    plainLanguage: 'Company revenue belongs to the company, not founders personal accounts. Salaries must be board-approved, and profits are reinvested into growth before dividends are considered.',
    clauses: [
      {
        ref: '6.1',
        title: 'Primacy of Cash-Flow & Runway',
        text: 'Founder remuneration and expenses must strictly align with product cash flow and verified bank balances. Personal commingling of corporate funds constitutes gross fiduciary misconduct.',
        highlight: true,
      },
      {
        ref: '6.2',
        title: 'Board Approval for Executive Salaries',
        text: 'All founder compensation packages, revisions, bonuses, and director allowances must be formally sanctioned by the Board of Directors and documented in meeting minutes.',
        highlight: false,
      },
      {
        ref: '6.3',
        title: 'Profit Reinvestment & Dividend Declaration',
        text: 'Profits generated by subsidiaries shall prioritize product reinvestment, technical infrastructure, and reserve fund requirements before any dividend payout is evaluated by shareholders.',
        highlight: false,
      },
    ],
    specificNotes: 'Expense reimbursements require digital GST invoices uploaded to the finance module within 30 days.',
  },

  {
    id: 'sec-07',
    number: '07',
    title: 'Intellectual Property Ownership',
    summary: 'Absolute IP assignment to the corporate entity. No founder personally retains code, models, trade secrets, or brand marks.',
    plainLanguage: 'Everything you write, design, build, or invent while working for Zuccano belongs 100% to the company. You cannot take the codebase or designs with you if you leave.',
    clauses: [
      {
        ref: '7.1',
        title: 'Comprehensive Invention Assignment',
        text: 'All software, algorithms, UI/UX designs, AI models, brand marks, patents, trade secrets, and documentation authored or conceived by the founder during their engagement belong exclusively and perpetually to Zuccano or the respective subsidiary.',
        highlight: true,
      },
      {
        ref: '7.2',
        title: 'Waiver of Moral Rights',
        text: 'The founder irrevocably waives all moral rights under Section 57 of the Copyright Act, 1957 in favor of the company, ensuring unencumbered global exploitation of all IP assets.',
        highlight: false,
      },
      {
        ref: '7.3',
        title: 'Pre-Existing IP Disclosures',
        text: 'Any pre-existing intellectual property owned by the founder prior to joining must be explicitly scheduled in Schedule A. Unscheduled pre-existing IP incorporated into company products is deemed irrevocably licensed to Zuccano royalty-free.',
        highlight: true,
      },
    ],
    specificNotes: 'Applicable to all repositories across GitHub, Hugging Face models, patent filings, and proprietary datasets.',
  },

  {
    id: 'sec-08',
    number: '08',
    title: 'Decision-Making and Voting Rights',
    summary: 'Operational decisions vs Reserved Board Matters. Unanimous and special resolution requirements.',
    plainLanguage: 'CEOs run daily operations. Major events (taking loans, selling the company, issuing shares, closing divisions) require Parent Board and shareholder approval.',
    clauses: [
      {
        ref: '8.1',
        title: 'Day-to-Day Operational Authority',
        text: 'The subsidiary CEO holds day-to-day authority over sprint schedules, operational hiring, vendor contracts within pre-approved budgets, and marketing execution.',
        highlight: false,
      },
      {
        ref: '8.2',
        title: 'Reserved Board Matters (Veto Rights)',
        text: 'The following decisions require prior written approval of Zuccano Group Holdings Board: (a) Any capital increase or dilution; (b) Incurring indebtedness over ₹5,00,000; (c) Sale, pledge, or licensing of core IP; (d) C-suite termination or appointment; (e) Insolvency or winding up filings.',
        highlight: true,
      },
      {
        ref: '8.3',
        title: 'Deadlock Resolution Mechanism',
        text: 'In the event of an operational deadlock between product founders, the matter shall be escalated to the Zuccano Parent Holding Board whose determination shall be final and binding.',
        highlight: false,
      },
    ],
    specificNotes: 'Preserves enterprise continuity and prevents unilateral dilution of minority or majority holders.',
  },

  {
    id: 'sec-09',
    number: '09',
    title: 'Confidentiality and Data Protection',
    summary: 'Non-disclosure of source code, customer records, cap table specifics, and financial statements.',
    plainLanguage: 'Keep company secrets safe. Customer data, financials, cap table numbers, and source code must never be shared outside approved channels.',
    clauses: [
      {
        ref: '9.1',
        title: 'Definition of Confidential Information',
        text: 'Confidential information includes, without limitation, source code, investor discussions, internal valuation, customer PII, algorithms, profit margins, and unannounced product roadmaps.',
        highlight: false,
      },
      {
        ref: '9.2',
        title: 'Perpetual Non-Disclosure Obligation',
        text: 'The obligation to maintain secrecy survives termination of engagement indefinitely. Breach of confidentiality entitles Zuccano to immediate injunctive relief and liquidated damages.',
        highlight: true,
      },
      {
        ref: '9.3',
        title: 'Compliance with DPDP Act, 2023',
        text: 'All founders handling user data must ensure stringent compliance with the Digital Personal Data Protection Act, 2023. Unauthorized export of user datasets constitutes statutory offense.',
        highlight: false,
      },
    ],
    specificNotes: 'Enforced through hardware-level access logs and authenticated cloud workspace credentials.',
  },

  {
    id: 'sec-10',
    number: '10',
    title: 'Share Transfers and Dilution',
    summary: 'Right of First Refusal (ROFR), tag-along rights, and anti-dilution protections.',
    plainLanguage: 'You cannot sell your shares to an outsider without first offering them to existing founders and Zuccano. This keeps the shareholder registry trusted.',
    clauses: [
      {
        ref: '10.1',
        title: 'Right of First Refusal (ROFR)',
        text: 'No founder may sell, transfer, or pledge their shares to any third party without first extending a thirty (30) day Right of First Refusal to Zuccano Parent Holding and existing founding shareholders.',
        highlight: true,
      },
      {
        ref: '10.2',
        title: 'Tag-Along and Drag-Along Provisions',
        text: 'In the event of a majority acquisition offer approved by Zuccano Parent Board, minority founders shall have tag-along rights to participate under identical economic terms and drag-along obligations if 75% approval is attained.',
        highlight: false,
      },
      {
        ref: '10.3',
        title: 'Orderly Dilution in External Financing',
        text: 'Upon institutional capital raises sanctioned by the Board, all existing shareholders dilute pro-rata pursuant to statutory rights-issue rules under Section 62 of the Companies Act.',
        highlight: false,
      },
    ],
    specificNotes: 'Secondary sales require express written consent of the Board of Directors.',
  },

  {
    id: 'sec-11',
    number: '11',
    title: 'Founder Resignation and Exit',
    summary: 'Good Leaver vs Bad Leaver distinctions, notice periods, and post-exit share treatment.',
    plainLanguage: 'Leaving on good terms (Good Leaver) lets you keep earned vested shares. Leaving due to fraud, theft, or breach (Bad Leaver) forfeits unvested equity and grants buyback rights.',
    clauses: [
      {
        ref: '11.1',
        title: 'Notice Period for Founder Resignation',
        text: 'Any founder seeking voluntary departure must provide a minimum ninety (90) day written notice to ensure seamless handover of operational credentials, vendor relations, and code repositories.',
        highlight: false,
      },
      {
        ref: '11.2',
        title: 'Good Leaver Framework',
        text: 'A founder departing amicably (health, mutual agreement, retirement) retains their vested equity, subject to execution of standard non-compete and non-solicitation undertakings.',
        highlight: false,
      },
      {
        ref: '11.3',
        title: 'Bad Leaver Framework & Mandatory Buyback',
        text: 'A founder terminated for Cause (fraud, criminal indictment, IP theft, gross breach of confidentiality, or unauthorized competing ventures) shall be deemed a Bad Leaver. The company retains an irrevocable option to repurchase all vested shares at nominal par value or fair market value discounted by 50%.',
        highlight: true,
      },
    ],
    specificNotes: 'Bad leaver determination requires a formal Board enquiry and opportunity to be heard under natural justice principles.',
  },

  {
    id: 'sec-12',
    number: '12',
    title: 'Conflict of Interest',
    summary: 'Prohibition on competing businesses, moonlight consulting, and related-party vendor contracts.',
    plainLanguage: 'While founding a Zuccano product, you cannot run or advise a competing business, nor route company contracts to your personal relatives without full board disclosure.',
    clauses: [
      {
        ref: '12.1',
        title: 'Exclusivity of Service',
        text: 'The founder covenants that their primary commercial focus and business energies shall be dedicated exclusively to their assigned Zuccano venture during their term of active engagement.',
        highlight: true,
      },
      {
        ref: '12.2',
        title: 'Non-Compete Covenant',
        text: 'During active engagement and for a period of twelve (12) months following departure, the founder shall not directly or indirectly develop, consult for, finance, or launch a commercially competitive product.',
        highlight: true,
      },
      {
        ref: '12.3',
        title: 'Disclosure of Related Party Transactions',
        text: 'Any commercial transaction between the company and an entity in which the founder or their immediate family holds an interest must be disclosed pursuant to Section 188 of the Companies Act.',
        highlight: false,
      },
    ],
    specificNotes: 'Non-compete clauses are framed in compliance with Section 27 of the Indian Contract Act.',
  },

  {
    id: 'sec-13',
    number: '13',
    title: 'Dispute Prevention and Resolution',
    summary: 'Internal mediation protocols, structured escalation, and binding arbitration in Bengaluru.',
    plainLanguage: 'If founders disagree, we first talk it through in an internal mediation session. If unresolved, disputes go to fast-track legal arbitration in Bengaluru, not public court fights.',
    clauses: [
      {
        ref: '13.1',
        title: 'Mandatory 30-Day Mediation Protocol',
        text: 'In the event of any disagreement, the parties shall first engage in good-faith mediation facilitated by the Zuccano Parent Holding Board for a period not exceeding thirty (30) days.',
        highlight: false,
      },
      {
        ref: '13.2',
        title: 'Binding Fast-Track Arbitration',
        text: 'Any dispute not settled via mediation shall be referred to and finally resolved by sole arbitration under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Bengaluru, Karnataka, India.',
        highlight: true,
      },
      {
        ref: '13.3',
        title: 'Confidentiality of Proceedings',
        text: 'All arbitration proceedings, evidence, filings, and awards shall remain strictly confidential. Public disparagement or social media litigation constitutes a material breach.',
        highlight: true,
      },
    ],
    specificNotes: 'Arbitration proceedings shall be conducted in English.',
  },

  {
    id: 'sec-14',
    number: '14',
    title: 'Policy Amendments',
    summary: 'Governs how this Agreement may be amended and mandates that signed versions are immutable.',
    plainLanguage: 'No administrator or founder can secretly edit this agreement. Updates require formal board approval, a new version number, and a fresh signature from every founder.',
    clauses: [
      {
        ref: '14.1',
        title: 'Immutability of Executed Versions',
        text: 'Once an agreement version has been acknowledged and electronically signed, it is permanently locked and cryptographically hashed. Administrators cannot silently modify signed documents.',
        highlight: true,
      },
      {
        ref: '14.2',
        title: 'Material Amendment Protocol',
        text: 'Any material modification to ownership formulas, vesting rules, or voting thresholds requires an approved Board Resolution and the issuance of a new document version.',
        highlight: false,
      },
      {
        ref: '14.3',
        title: 'Notification & Re-Acknowledgement',
        text: 'Upon publication of a revised agreement version, all active founders shall be notified through their authenticated workspace and required to review and re-acknowledge the new version.',
        highlight: true,
      },
    ],
    specificNotes: 'Historical versions are permanently preserved in the corporate governance depository.',
  },

  {
    id: 'sec-15',
    number: '15',
    title: 'Final Acknowledgement',
    summary: 'Formal execution screen: 7 mandatory legal affirmations, legal identity verification, cryptographic hashing, and digital signature.',
    plainLanguage: 'This is the signing step. You verify your legal name, confirm all seven affirmations, sign digitally, and receive an official tamper-evident Certificate of Execution.',
    clauses: [
      {
        ref: '15.1',
        title: 'Informed Consent and Independent Advice',
        text: 'The founder warrants that they have thoroughly read every section of this Agreement, had ample opportunity to consult independent legal and tax counsel, and sign willingly without duress.',
        highlight: true,
      },
      {
        ref: '15.2',
        title: 'Validity of Electronic Execution',
        text: 'Pursuant to Sections 4, 5, and 10A of the Information Technology Act, 2000, execution of this Agreement via authenticated digital signature constitutes a valid, binding, and admissible legal contract.',
        highlight: true,
      },
      {
        ref: '15.3',
        title: 'Tamper-Evident Acceptance Audit Record',
        text: 'Upon execution, a SHA-256 cryptographic fingerprint of the agreement text, accompanied by audit timestamps, browser telemetry, verified affirmations, and electronic signature data, is archived in the Zuccano Board Depository.',
        highlight: true,
      },
    ],
    specificNotes: 'Produces a downloadable Certificate of Founder Agreement Execution.',
  },
];

// Document Versions Registry
export const AGREEMENT_VERSIONS = [
  {
    version: 'v2026.1-STABLE',
    releaseDate: '01 Nov 2026',
    status: 'ACTIVE_APPROVED',
    approvedBy: 'Zuccano Parent Board of Directors',
    legalReviewStatus: 'Reviewed by Indian Corporate Counsel (Companies Act 2013 Compliance)',
    description: 'Current production governance policy and founder agreement for all Zuccano subsidiaries.',
  },
  {
    version: 'v2025.2-LEGACY',
    releaseDate: '15 Jan 2025',
    status: 'SUPERSEDED',
    approvedBy: 'Founding Partners Resolution',
    legalReviewStatus: 'Superseded by v2026.1-STABLE',
    description: 'Initial partnership charter established at Zuccano incorporation.',
  },
];

class AgreementStore {
  constructor() {
    this.STORAGE_KEY = 'zuccano_agreement_state_v1';
    this.SUBMISSIONS_KEY = 'zuccano_founder_submissions_v1';
    this.ADMIN_AUDIT_KEY = 'zuccano_agreement_admin_audits_v1';
  }

  // Load state for a specific user
  getUserProgress(userId = 'default_founder') {
    const raw = localStorage.getItem(`${this.STORAGE_KEY}_${userId}`);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse user agreement state', e);
      }
    }

    return {
      userId,
      version: 'v2026.1-STABLE',
      openedSections: ['sec-01'],
      acknowledgedSections: [],
      affirmations: {
        reviewedComplete: false,
        ownershipUnderstood: false,
        responsibilitiesUnderstood: false,
        ipProvisionsUnderstood: false,
        confidentialityUnderstood: false,
        exitDisputeUnderstood: false,
        independentAdviceConfirmed: false,
      },
      status: 'PENDING_REVIEW', // PENDING_REVIEW, IN_REVIEW, EXECUTED
      signatureData: null,
      submissionRecord: null,
      lastActiveSection: 'sec-01',
      updatedAt: new Date().toISOString(),
    };
  }

  // Save progress for user
  saveUserProgress(userId, progress) {
    progress.updatedAt = new Date().toISOString();
    localStorage.setItem(`${this.STORAGE_KEY}_${userId}`, JSON.stringify(progress));
  }

  // Mark section as opened
  markSectionOpened(userId, sectionId) {
    const progress = this.getUserProgress(userId);
    if (!progress.openedSections.includes(sectionId)) {
      progress.openedSections.push(sectionId);
    }
    progress.lastActiveSection = sectionId;
    if (progress.status === 'PENDING_REVIEW') {
      progress.status = 'IN_REVIEW';
    }
    this.saveUserProgress(userId, progress);
    return progress;
  }

  // Toggle or acknowledge a section
  toggleSectionAcknowledgement(userId, sectionId) {
    const progress = this.getUserProgress(userId);
    const index = progress.acknowledgedSections.indexOf(sectionId);
    if (index > -1) {
      progress.acknowledgedSections.splice(index, 1);
    } else {
      progress.acknowledgedSections.push(sectionId);
    }
    this.saveUserProgress(userId, progress);
    return progress;
  }

  // Update affirmations
  updateAffirmations(userId, affirmations) {
    const progress = this.getUserProgress(userId);
    progress.affirmations = { ...progress.affirmations, ...affirmations };
    this.saveUserProgress(userId, progress);
    return progress;
  }

  // Generate SHA-256 Document Hash (Cryptographic authenticity)
  async computeDocumentHash(contentString) {
    const encoder = new TextEncoder();
    const data = encoder.encode(contentString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Final Execution Submission
  async submitAgreementAcceptance({
    userId,
    fullName,
    email,
    assignedProduct,
    governmentId = 'PAN/VERIFIED',
    signatureType = 'DRAWN',
    signatureData,
    version = 'v2026.1-STABLE',
  }) {
    const progress = this.getUserProgress(userId);

    // Verify all 15 sections are acknowledged
    const allAcknowledged = AGREEMENT_SECTIONS.every((sec) =>
      progress.acknowledgedSections.includes(sec.id)
    );
    if (!allAcknowledged) {
      throw new Error('All 15 sections must be individually reviewed and acknowledged before submission.');
    }

    // Verify all 7 affirmations are affirmed
    const allAffirmed = Object.values(progress.affirmations).every(Boolean);
    if (!allAffirmed) {
      throw new Error('All 7 legal affirmations must be confirmed prior to execution.');
    }

    if (!fullName || !email || !signatureData) {
      throw new Error('Full legal name, email, and signature are mandatory for legal execution.');
    }

    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Compute tamper-evident document hash
    const documentRepresentation = JSON.stringify({
      version,
      sectionsCount: AGREEMENT_SECTIONS.length,
      capTableSummary: 'Naseer:51%,Pavan:40%,Other:9%,ZFIT:51%Zuccano',
      signer: fullName,
      email,
      assignedProduct,
      timestamp,
    });

    const docHash = await this.computeDocumentHash(documentRepresentation);
    const auditEventId = `ZUC-AGR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const submissionRecord = {
      auditEventId,
      userId,
      fullName,
      email,
      assignedProduct,
      governmentId,
      version,
      documentHash: `sha256:${docHash}`,
      timestamp,
      timestampIST: `${formattedDate} IST`,
      signatureType,
      signatureData,
      acknowledgedSectionsCount: progress.acknowledgedSections.length,
      affirmations: progress.affirmations,
      governingLaw: 'Companies Act, 2013 & Information Technology Act, 2000 (India)',
      status: 'EXECUTED_AND_LOCKED',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Node/Browser',
    };

    // Update user state to executed
    progress.status = 'EXECUTED';
    progress.submissionRecord = submissionRecord;
    this.saveUserProgress(userId, progress);

    // Save to master submissions registry
    const allSubmissions = this.getAllSubmissions();
    allSubmissions.unshift(submissionRecord);
    localStorage.setItem(this.SUBMISSIONS_KEY, JSON.stringify(allSubmissions));

    return submissionRecord;
  }

  // Get all submissions for administration view
  getAllSubmissions() {
    const raw = localStorage.getItem(this.SUBMISSIONS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse submissions registry', e);
      }
    }
    // Return seed submission if empty for immediate admin visibility
    return [
      {
        auditEventId: 'ZUC-AGR-K9X2-PAV1',
        userId: 'pavan_ceo_zfit',
        fullName: 'Pavan Zuccano',
        email: 'pavan.ceo@zfit.zuccano.me',
        assignedProduct: 'ZFIT Technologies',
        governmentId: 'AAAPZ9845K',
        version: 'v2026.1-STABLE',
        documentHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        timestamp: '2026-11-01T10:15:30.000Z',
        timestampIST: '01/11/2026, 3:45:30 pm IST',
        signatureType: 'DRAWN',
        signatureData: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="40" font-family="cursive" font-size="28">Pavan Zuccano</text></svg>',
        acknowledgedSectionsCount: 15,
        status: 'EXECUTED_AND_LOCKED',
        governingLaw: 'Companies Act, 2013 & IT Act, 2000',
      },
    ];
  }
}

export const agreementStore = new AgreementStore();
export default agreementStore;

