import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  User,
  GraduationCap,
  Globe,
  Sparkles,
  X,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import './ApplyJob.css';

const AVAILABLE_ROLES = [
  { id: 'se-fullstack', title: 'Senior Full Stack Engineer (React / Node / Go)', department: 'Engineering', type: 'Full-time', location: 'Bengaluru / Hybrid' },
  { id: 'ai-engineer', title: 'AI & Systems Research Engineer', department: 'Artificial Intelligence', type: 'Full-time', location: 'Bengaluru / Remote' },
  { id: 'embedded-lead', title: 'Embedded Systems & IoT Hardware Lead', department: 'Hardware & IoT', type: 'Full-time', location: 'Bengaluru, India' },
  { id: 'uiux-designer', title: 'Lead Product & Experience Designer', department: 'Product Design', type: 'Full-time', location: 'Bengaluru / Hybrid' },
  { id: 'product-mgr', title: 'Product Manager — NextGen Platforms', department: 'Product', type: 'Full-time', location: 'Bengaluru, India' },
  { id: 'devops-infra', title: 'Cloud Infrastructure & Security Architect', department: 'DevOps & SecOps', type: 'Full-time', location: 'Remote / Hybrid' },
  { id: 'intern-tech', title: 'Engineering & Research Fellowship (Summer 2026)', department: 'Campus & Early Career', type: 'Internship', location: 'Bengaluru, India' },
  { id: 'other', title: 'Open Application (General Talent Pool)', department: 'General', type: 'Flexible', location: 'Global' }
];

const SUGGESTED_SKILLS = [
  'React.js', 'TypeScript', 'Node.js', 'Python', 'Next.js', 
  'GraphQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 
  'Embedded C', 'Hardware Prototyping', 'Figma', 'System Design', 
  'Machine Learning', 'PyTorch', 'Rust'
];

export const ApplyJob = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    // Role selection
    selectedRoleId: 'se-fullstack',
    department: 'Engineering',
    employmentType: 'Full-time',
    noticePeriod: 'Immediate (0-15 days)',
    workModel: 'Hybrid (Bengaluru)',
    
    // Personal Details
    fullName: '',
    email: '',
    phoneCode: '+91',
    phone: '',
    city: '',
    country: 'India',
    willingToRelocate: 'Yes',

    // Professional Background
    totalExperience: '3-5 years',
    currentCompany: '',
    currentDesignation: '',
    highestEducation: 'Bachelor of Technology (B.Tech / B.E.)',
    collegeUniversity: '',
    graduationYear: '2023',
    selectedSkills: ['React.js', 'TypeScript', 'Node.js', 'System Design'],
    customSkillInput: '',

    // Online Profiles
    linkedin: '',
    github: '',
    portfolio: '',
    otherLink: '',

    // Cover Letter & Compensation
    whyZuccano: '',
    notableAchievement: '',
    currentSalary: '',
    expectedSalary: '',
    currency: 'INR (₹ Lakhs/yr)',

    // Declarations
    agreeTerms: false,
    confirmAccuracy: false
  });

  // Resume File State
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');

  // UI Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [activeTab, setActiveTab] = useState('application'); // 'application' | 'openings'

  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Skill tag management
  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const exists = prev.selectedSkills.includes(skill);
      return {
        ...prev,
        selectedSkills: exists
          ? prev.selectedSkills.filter((s) => s !== skill)
          : [...prev.selectedSkills, skill]
      };
    });
  };

  const handleAddCustomSkill = (e) => {
    if (e.key === 'Enter' && formData.customSkillInput.trim()) {
      e.preventDefault();
      const newSkill = formData.customSkillInput.trim();
      if (!formData.selectedSkills.includes(newSkill)) {
        setFormData((prev) => ({
          ...prev,
          selectedSkills: [...prev.selectedSkills, newSkill],
          customSkillInput: ''
        }));
      }
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.filter((s) => s !== skill)
    }));
  };

  // Resume File Handling
  const handleFileSelect = (file) => {
    setFileError('');
    if (!file) return;

    // Check size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10MB limit. Please upload a smaller file.');
      return;
    }

    // Check format (PDF, DOC, DOCX)
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setFileError('Invalid file format. Please upload a PDF, DOC, or DOCX document.');
      return;
    }

    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setFileError('Please upload your resume to proceed.');
      const resumeEl = document.getElementById('resume-section');
      if (resumeEl) resumeEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!formData.confirmAccuracy || !formData.agreeTerms) {
      alert('Please accept the candidate terms and accuracy declaration.');
      return;
    }

    setIsSubmitting(true);

    // Simulate high-end corporate backend submission
    setTimeout(() => {
      const generatedId = `ZUC-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const currentRoleObj = AVAILABLE_ROLES.find(r => r.id === formData.selectedRoleId) || AVAILABLE_ROLES[0];

  return (
    <div className="career-page-root">
      {/* ── Top Navigation Bar ── */}
      <header className="career-navbar">
        <div className="navbar-container">
          <div className="navbar-brand-col">
            <Link to="/" className="brand-link">
              <span className="brand-text">zuccano</span>
              <span className="brand-dot">.</span>
            </Link>
            <span className="brand-divider">/</span>
            <span className="brand-portal-tag">Careers & Talent Portal</span>
          </div>

          <div className="navbar-action-col">
            <button 
              type="button" 
              className="back-login-btn"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={16} />
              <span>Back to Portal Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="career-main-content">
        {/* Banner Hero */}
        <section className="career-hero-banner">
         
          <h1 className="hero-main-title">
            Build What's Next<span className="hero-accent-dot">.</span>
          </h1>
          <p className="hero-lead-text">
            We are engineering the future of intelligent lifestyle hardware, digital platforms, and next-generation commerce ecosystems. Submit your comprehensive credentials below.
          </p>

          <div className="hero-quick-stats">
            <div className="stat-pill">
              <Building size={14} className="stat-icon" />
              <span>HQ: Bengaluru, India</span>
            </div>
            <div className="stat-pill">
              <Briefcase size={14} className="stat-icon" />
              <span>14+ Open Roles</span>
            </div>
            <div className="stat-pill">
              <Sparkles size={14} className="stat-icon" />
              <span>Tier-1 Compensation & Equity</span>
            </div>
          </div>
        </section>

        {isSuccess ? (
          /* ════════════ SUCCESS SUBMISSION CARD ════════════ */
          <div className="success-confirmation-card">
            <div className="success-icon-badge">
              <CheckCircle2 size={48} className="success-check-svg" />
            </div>
            <h2 className="success-title">Application Received!</h2>
            <p className="success-desc">
              Thank you, <strong>{formData.fullName}</strong>. Your profile has been directly logged into the Zuccano Talent Acquisition system.
            </p>

            <div className="app-id-banner">
              <span className="app-id-label">Application Tracking Reference</span>
              <span className="app-id-code">{applicationId}</span>
            </div>

            <div className="app-details-summary">
              <div className="summary-row">
                <span className="summary-key">Applied Position:</span>
                <span className="summary-val">{currentRoleObj.title}</span>
              </div>
              <div className="summary-row">
                <span className="summary-key">Department:</span>
                <span className="summary-val">{currentRoleObj.department}</span>
              </div>
              <div className="summary-row">
                <span className="summary-key">Contact Email:</span>
                <span className="summary-val">{formData.email}</span>
              </div>
              <div className="summary-row">
                <span className="summary-key">Resume Attached:</span>
                <span className="summary-val">{resumeFile?.name}</span>
              </div>
              <div className="summary-row">
                <span className="summary-key">Current Status:</span>
                <span className="summary-val status-badge-review">
                  <span className="status-ping" /> Screening in Progress
                </span>
              </div>
            </div>

            <div className="success-next-steps">
              <h4>What happens next?</h4>
              <ol>
                <li>Our engineering / executive hiring lead reviews your resume and github/portfolio within 48-72 business hours.</li>
                <li>Shortlisted candidates will receive a Google Meet invitation for an initial technical & culture discovery conversation.</li>
                <li>Keep an eye on <strong>{formData.email}</strong> for updates and scheduling links.</li>
              </ol>
            </div>

            <div className="success-actions-row">
              <button 
                type="button" 
                className="btn-primary-dark"
                onClick={() => navigate('/')}
              >
                <span>Return to Portal Login</span>
                <ArrowRight size={16} />
              </button>
              <button 
                type="button" 
                className="btn-secondary-outline"
                onClick={() => {
                  setIsSuccess(false);
                  setResumeFile(null);
                  setFormData(prev => ({ ...prev, fullName: '', email: '', phone: '', currentCompany: '' }));
                }}
              >
                <span>Submit Another Application</span>
              </button>
            </div>
          </div>
        ) : (
          /* ════════════ COMPREHENSIVE APPLICATION FORM ════════════ */
          <form onSubmit={handleSubmit} className="application-full-form" noValidate>
            
            {/* ── CARD 1: ROLE & EMPLOYMENT DETAILS ── */}
            <div className="form-card-section">
              <div className="section-header">
                <div className="section-number">01</div>
                <div>
                  <h3 className="section-title">Position & Engagement Details</h3>
                  <p className="section-desc">Select the role and working arrangement that matches your expertise.</p>
                </div>
              </div>

              <div className="section-body">
                <div className="form-row-full">
                  <label className="field-label" htmlFor="selectedRoleId">
                    Target Role / Opening <span className="req-star">*</span>
                  </label>
                  <select 
                    id="selectedRoleId"
                    name="selectedRoleId"
                    className="custom-select-input"
                    value={formData.selectedRoleId}
                    onChange={(e) => {
                      const selected = AVAILABLE_ROLES.find(r => r.id === e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        selectedRoleId: e.target.value,
                        department: selected ? selected.department : prev.department
                      }));
                    }}
                    required
                  >
                    {AVAILABLE_ROLES.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.title} — [{role.department}] ({role.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-grid-3">
                  <div className="form-field">
                    <label className="field-label">Department</label>
                    <input 
                      type="text" 
                      name="department"
                      className="custom-text-input readonly-input" 
                      value={formData.department} 
                      readOnly 
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="noticePeriod">
                      Notice Period / Availability <span className="req-star">*</span>
                    </label>
                    <select
                      id="noticePeriod"
                      name="noticePeriod"
                      className="custom-select-input"
                      value={formData.noticePeriod}
                      onChange={handleChange}
                    >
                      <option value="Immediate (0-15 days)">Immediate (0 - 15 days)</option>
                      <option value="30 days">30 Days</option>
                      <option value="45 days">45 Days</option>
                      <option value="60 days">60 Days</option>
                      <option value="Serving Notice Period">Currently Serving Notice</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="workModel">
                      Work Preference
                    </label>
                    <select
                      id="workModel"
                      name="workModel"
                      className="custom-select-input"
                      value={formData.workModel}
                      onChange={handleChange}
                    >
                      <option value="Hybrid (Bengaluru)">Hybrid (Bengaluru)</option>
                      <option value="In-Office (Bengaluru)">Full In-Office</option>
                      <option value="Remote">Remote (Role Dependent)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 2: PERSONAL & CONTACT INFORMATION ── */}
            <div className="form-card-section">
              <div className="section-header">
                <div className="section-number">02</div>
                <div>
                  <h3 className="section-title">Personal & Contact Information</h3>
                  <p className="section-desc">We use these credentials to communicate interview schedules and offers.</p>
                </div>
              </div>

              <div className="section-body">
                <div className="form-grid-2">
                  <div className="form-field">
                    <label className="field-label" htmlFor="fullName">
                      Full Legal Name <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <User size={16} className="field-icon" />
                      <input 
                        id="fullName"
                        type="text" 
                        name="fullName"
                        className="custom-text-input"
                        placeholder="e.g. Aryan Kulkarni"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="email">
                      Primary Email Address <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={16} className="field-icon" />
                      <input 
                        id="email"
                        type="email" 
                        name="email"
                        className="custom-text-input"
                        placeholder="e.g. aryan@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-field">
                    <label className="field-label" htmlFor="phone">
                      Mobile / WhatsApp Number <span className="req-star">*</span>
                    </label>
                    <div className="phone-input-combo">
                      <select 
                        name="phoneCode" 
                        className="phone-code-select"
                        value={formData.phoneCode}
                        onChange={handleChange}
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+971">+971 (UAE)</option>
                        <option value="+65">+65 (SG)</option>
                        <option value="+49">+49 (DE)</option>
                      </select>
                      <input 
                        id="phone"
                        type="tel" 
                        name="phone"
                        className="custom-text-input phone-number-input"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="city">
                      Current City <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <MapPin size={16} className="field-icon" />
                      <input 
                        id="city"
                        type="text" 
                        name="city"
                        className="custom-text-input"
                        placeholder="e.g. Bengaluru, Mumbai, Pune"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="willingToRelocate">
                      Willing to Relocate to Bengaluru?
                    </label>
                    <select
                      id="willingToRelocate"
                      name="willingToRelocate"
                      className="custom-select-input"
                      value={formData.willingToRelocate}
                      onChange={handleChange}
                    >
                      <option value="Yes">Yes, willing to relocate</option>
                      <option value="Already in Bengaluru">Already living in Bengaluru</option>
                      <option value="Remote Only">Prefer remote only</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 3: PROFESSIONAL BACKGROUND & SKILLS ── */}
            <div className="form-card-section">
              <div className="section-header">
                <div className="section-number">03</div>
                <div>
                  <h3 className="section-title">Professional Experience & Technical Skills</h3>
                  <p className="section-desc">Highlight your domain capabilities, past impact, and core stack.</p>
                </div>
              </div>

              <div className="section-body">
                <div className="form-grid-3">
                  <div className="form-field">
                    <label className="field-label" htmlFor="totalExperience">
                      Total Experience <span className="req-star">*</span>
                    </label>
                    <select
                      id="totalExperience"
                      name="totalExperience"
                      className="custom-select-input"
                      value={formData.totalExperience}
                      onChange={handleChange}
                    >
                      <option value="Fresher / 0-1 years">Fresher / 0-1 years (College grad)</option>
                      <option value="1-3 years">1 - 3 years</option>
                      <option value="3-5 years">3 - 5 years</option>
                      <option value="5-8 years">5 - 8 years</option>
                      <option value="8+ years">8+ years (Senior / Staff)</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="currentCompany">
                      Current / Most Recent Employer
                    </label>
                    <input 
                      id="currentCompany"
                      type="text" 
                      name="currentCompany"
                      className="custom-text-input"
                      placeholder="e.g. Infosys, Swiggy, Freelance"
                      value={formData.currentCompany}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="currentDesignation">
                      Current Job Title / Designation
                    </label>
                    <input 
                      id="currentDesignation"
                      type="text" 
                      name="currentDesignation"
                      className="custom-text-input"
                      placeholder="e.g. SDE-2 / Product Designer"
                      value={formData.currentDesignation}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label className="field-label" htmlFor="highestEducation">
                      Highest Degree / Education <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <GraduationCap size={16} className="field-icon" />
                      <select
                        id="highestEducation"
                        name="highestEducation"
                        className="custom-select-input"
                        value={formData.highestEducation}
                        onChange={handleChange}
                      >
                        <option value="Bachelor of Technology (B.Tech / B.E.)">B.Tech / B.E. (Computer Science / IT / ECE / Mech)</option>
                        <option value="Master of Technology (M.Tech / M.E.)">M.Tech / M.S.</option>
                        <option value="Bachelor of Computer Applications (BCA / B.Sc)">BCA / B.Sc CS</option>
                        <option value="Master of Computer Applications (MCA)">MCA</option>
                        <option value="MBA / Master of Business Administration">MBA</option>
                        <option value="Design / Fine Arts Degree (B.Des / M.Des)">B.Des / M.Des</option>
                        <option value="Self-Taught / Other">Self-Taught / Non-traditional</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="collegeUniversity">
                      College / University Name & Graduation Year
                    </label>
                    <input 
                      id="collegeUniversity"
                      type="text" 
                      name="collegeUniversity"
                      className="custom-text-input"
                      placeholder="e.g. IIT Bombay / BITS Pilani (2023)"
                      value={formData.collegeUniversity}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Technical Skills Selection */}
                <div className="form-row-full skills-picker-block">
                  <label className="field-label">
                    Primary Skills & Tools <span className="sub-label">(Click to add or type custom skill and press Enter)</span>
                  </label>
                  
                  {/* Selected Tags */}
                  <div className="selected-tags-tray">
                    {formData.selectedSkills.map((skill) => (
                      <span key={skill} className="skill-chip active-chip">
                        <span>{skill}</span>
                        <button type="button" onClick={() => removeSkill(skill)} aria-label="Remove skill">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    
                    <input 
                      type="text"
                      name="customSkillInput"
                      className="tag-inline-input"
                      placeholder="+ Type skill & press Enter"
                      value={formData.customSkillInput}
                      onChange={handleChange}
                      onKeyDown={handleAddCustomSkill}
                    />
                  </div>

                  {/* Suggestions pills */}
                  <div className="suggested-chips-row">
                    <span className="suggested-hint">Suggested:</span>
                    {SUGGESTED_SKILLS.filter(s => !formData.selectedSkills.includes(s)).slice(0, 8).map((s) => (
                      <button 
                        type="button" 
                        key={s} 
                        className="skill-pill-btn"
                        onClick={() => toggleSkill(s)}
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 4: PORTFOLIO & ONLINE PROFILES ── */}
            <div className="form-card-section">
              <div className="section-header">
                <div className="section-number">04</div>
                <div>
                  <h3 className="section-title">Online Presence, Code & Portfolios</h3>
                  <p className="section-desc">Proof of work speaks louder than bullet points. Share your public profiles.</p>
                </div>
              </div>

              <div className="section-body">
                <div className="form-grid-2">
                  <div className="form-field">
                    <label className="field-label" htmlFor="github">
                      GitHub / GitLab URL
                    </label>
                    <div className="input-with-icon">
                      <Globe size={16} className="field-icon" />
                      <input 
                        id="github"
                        type="url" 
                        name="github"
                        className="custom-text-input"
                        placeholder="https://github.com/yourusername"
                        value={formData.github}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="linkedin">
                      LinkedIn Profile URL <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Globe size={16} className="field-icon" />
                      <input 
                        id="linkedin"
                        type="url" 
                        name="linkedin"
                        className="custom-text-input"
                        placeholder="https://linkedin.com/in/yourhandle"
                        value={formData.linkedin}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label className="field-label" htmlFor="portfolio">
                      Personal Portfolio / Dribbble / Behance
                    </label>
                    <input 
                      id="portfolio"
                      type="url" 
                      name="portfolio"
                      className="custom-text-input"
                      placeholder="https://yourdomain.com or Figma/Dribbble link"
                      value={formData.portfolio}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="otherLink">
                      Other Profile (X / Twitter / Kaggle / Publications)
                    </label>
                    <input 
                      id="otherLink"
                      type="url" 
                      name="otherLink"
                      className="custom-text-input"
                      placeholder="https://x.com/yourhandle"
                      value={formData.otherLink}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 5: RESUME ATTACHMENT UPLOADER ── */}
            <div className="form-card-section" id="resume-section">
              <div className="section-header">
                <div className="section-number">05</div>
                <div>
                  <h3 className="section-title">Resume / CV Document <span className="req-star">*</span></h3>
                  <p className="section-desc">Upload your updated resume in PDF, DOC, or DOCX format (Max 10MB).</p>
                </div>
              </div>

              <div className="section-body">
                {fileError && (
                  <div className="file-error-alert">
                    <AlertCircle size={16} />
                    <span>{fileError}</span>
                  </div>
                )}

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />

                {resumeFile ? (
                  <div className="uploaded-file-banner">
                    <div className="file-icon-box">
                      <FileText size={28} className="file-svg-icon" />
                    </div>
                    <div className="file-meta-col">
                      <span className="file-name">{resumeFile.name}</span>
                      <span className="file-size">
                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Uploaded & Verified
                      </span>
                    </div>
                    <button 
                      type="button" 
                      className="remove-file-btn"
                      onClick={() => setResumeFile(null)}
                      title="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div 
                    className={`dropzone-container ${isDragging ? 'drag-active' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="dropzone-icon-circle">
                      <Upload size={22} className="upload-arrow-svg" />
                    </div>
                    <h4 className="dropzone-title">Click to upload or drag & drop your resume</h4>
                    <p className="dropzone-sub">PDF, DOCX, or DOC (Maximum file size: 10 MB)</p>
                    <button type="button" className="browse-files-btn">
                      Browse Local Files
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── CARD 6: MOTIVATION & COMPENSATION EXPECTATIONS ── */}
            <div className="form-card-section">
              <div className="section-header">
                <div className="section-number">06</div>
                <div>
                  <h3 className="section-title">Candidate Statement & Expectations</h3>
                  <p className="section-desc">Help us understand your motivation and career trajectory.</p>
                </div>
              </div>

              <div className="section-body">
                <div className="form-row-full">
                  <label className="field-label" htmlFor="whyZuccano">
                    Why do you want to join Zuccano? What excites you about our vision?
                  </label>
                  <textarea 
                    id="whyZuccano"
                    name="whyZuccano"
                    rows={4}
                    className="custom-textarea"
                    placeholder="Tell us what draws you to our ecosystem and what kind of problems you want to solve here..."
                    value={formData.whyZuccano}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row-full">
                  <label className="field-label" htmlFor="notableAchievement">
                    Highlight 1 or 2 achievements, systems, or projects you built that you are most proud of:
                  </label>
                  <textarea 
                    id="notableAchievement"
                    name="notableAchievement"
                    rows={3}
                    className="custom-textarea"
                    placeholder="e.g. Scaled an ingestion pipeline to 1M req/s, architected the design system from scratch, or built an autonomous IoT module..."
                    value={formData.notableAchievement}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-grid-3">
                  <div className="form-field">
                    <label className="field-label" htmlFor="currency">Currency / Metric</label>
                    <select
                      id="currency"
                      name="currency"
                      className="custom-select-input"
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value="INR (₹ Lakhs/yr)">INR (₹ Lakhs per year)</option>
                      <option value="USD ($ / yr)">USD ($ / year)</option>
                      <option value="EUR (€ / yr)">EUR (€ / year)</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="currentSalary">Current Annual CTC (Optional)</label>
                    <input 
                      id="currentSalary"
                      type="text" 
                      name="currentSalary"
                      className="custom-text-input"
                      placeholder="e.g. 18 LPA or N/A"
                      value={formData.currentSalary}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label" htmlFor="expectedSalary">Expected Annual CTC <span className="req-star">*</span></label>
                    <input 
                      id="expectedSalary"
                      type="text" 
                      name="expectedSalary"
                      className="custom-text-input"
                      placeholder="e.g. 24 LPA or Negotiable"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 7: DECLARATIONS & LEGAL CONSENT ── */}
            <div className="form-card-section legal-section">
              <div className="section-body">
                <label className="legal-checkbox-label">
                  <input 
                    type="checkbox" 
                    name="confirmAccuracy"
                    checked={formData.confirmAccuracy}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    I hereby certify that all information submitted in this application is true, complete, and accurate to the best of my knowledge.
                  </span>
                </label>

                <label className="legal-checkbox-label">
                  <input 
                    type="checkbox" 
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    I authorize Zuccano Technologies Pvt. Ltd. and its recruiting affiliates to process my resume and application data for evaluation and talent pooling in compliance with company data policies.
                  </span>
                </label>

                <div className="submit-action-tray">
                  <button 
                    type="submit" 
                    className="submit-application-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-loader" />
                        <span>Submitting Application to Talent Pipeline...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Official Application</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p className="privacy-micro-note">
                    <ShieldCheck size={14} className="privacy-shield-icon" />
                    <span>Your application data is 256-bit encrypted and exclusively accessible to Zuccano hiring managers.</span>
                  </p>
                </div>
              </div>
            </div>

          </form>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="career-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">zuccano.</span>
            <span className="footer-copy">&copy; {new Date().getFullYear()} Zuccano Technologies. All rights reserved.</span>
          </div>
          <div className="footer-links">
            <button type="button" onClick={() => navigate('/')}>Portal Login</button>
            <span className="dot-sep">&bull;</span>
            <a href="https://zuccano.com" target="_blank" rel="noreferrer">Corporate Website</a>
            <span className="dot-sep">&bull;</span>
            <span>Bengaluru &bull; San Francisco</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApplyJob;
