import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Menu, Code2, ExternalLink, Users, Calendar, Trophy, Rocket } from 'lucide-react';
import { projects } from '../data/projects';

const iconMap = {
  users: Users,
  calendar: Calendar,
  trophy: Trophy,
  rocket: Rocket,
};

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === parseInt(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div>Project not found</div>;

  const [activeSection, setActiveSection] = useState('Overview');
  const sections = ['Overview', 'The Challenge', 'The Solution', 'Key Features', 'Tech Stack', 'Results'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full bg-[#f8f9fa] overflow-x-hidden text-gray-900 font-sans"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-20 px-8 md:px-16 flex items-center justify-between bg-[#f8f9fa]/90 backdrop-blur-md z-[110] border-b border-gray-200">
        <div className="text-2xl font-black tracking-tight text-black">ZUCCANO.</div>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" /> BACK TO WORK
        </button>
        <div className="flex items-center gap-8">
          <button className="hidden md:flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black transition-colors">
            NEXT PROJECT <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center"><ArrowRight className="w-3 h-3" /></div>
          </button>
          <button aria-label="Share project" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-black">
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full min-h-screen pt-32 px-8 md:px-16 flex flex-col lg:flex-row relative z-10 max-w-[1800px] mx-auto">
        {/* Left: Info */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center pb-20 lg:pb-0 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-purple-600 font-bold tracking-wider text-sm mb-4 block font-mono">0{project.id} / 04</span>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none mb-4 text-black">
              {project.title.split(' ')[0]} <span className="text-gray-900">{project.title.split(' ').slice(1).join(' ')}.</span>
            </h1>
            <h2 className="text-lg md:text-xl font-bold tracking-widest uppercase mb-8 text-gray-800">
              {project.category}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
              {project.description}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 py-8">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div> ROLE</span>
                <span className="text-sm font-medium text-gray-900">{project.role}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div> TIMELINE</span>
                <span className="text-sm font-medium text-gray-900">{project.timeline}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div> YEAR</span>
                <span className="text-sm font-medium text-gray-900">{project.year}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div> CATEGORY</span>
                <span className="text-sm font-medium text-gray-900 capitalize">{project.category.toLowerCase()}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide flex items-center gap-3 hover:bg-gray-800 transition-colors shadow-xl shadow-black/20">
                Live Project <ExternalLink className="w-4 h-4" />
              </button>
              <button className="bg-white text-black border border-gray-200 px-8 py-4 rounded-full font-bold text-sm tracking-wide flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-sm">
                View Code <Code2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right: Mockups */}
        <div className="w-full lg:w-[55%] relative h-[500px] lg:h-auto flex items-center justify-center mt-12 lg:mt-0">
          {/* Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-purple-200/50 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[800px] h-[500px] flex items-center justify-center"
          >
            {/* Laptop Mockup (Pure CSS) */}
            <div className="absolute left-[5%] w-[80%] aspect-[16/10] bg-[#1a1a1a] rounded-t-2xl rounded-b-md shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-[10px] border-[#1a1a1a] relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="w-full h-full overflow-hidden bg-black rounded-sm relative">
                {/* Macbook Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#1a1a1a] rounded-b-xl z-20"></div>
                <img src={project.mockups.desktop} alt="Desktop preview" className="w-full h-full object-cover object-top opacity-90" />
              </div>
              {/* Laptop Base */}
              <div className="absolute -bottom-6 -left-[5%] w-[110%] h-6 bg-[#2a2a2a] rounded-b-2xl rounded-t-sm border-t border-[#3a3a3a] shadow-2xl flex justify-center items-start pt-1">
                <div className="w-24 h-1.5 bg-[#1a1a1a] rounded-b-md"></div>
              </div>
            </div>

            {/* Phone Mockup (Pure CSS) */}
            <div className="absolute -bottom-10 right-[5%] w-[22%] aspect-[9/19] bg-[#1a1a1a] rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-[6px] border-[#2a2a2a] relative z-20 transform rotate-6 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="w-full h-full overflow-hidden bg-black rounded-[2rem] relative">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[35%] h-5 bg-black rounded-full z-20"></div>
                <img src={project.mockups.mobile} alt="Mobile preview" className="w-full h-full object-cover opacity-90" />
              </div>
              {/* Phone Volume Buttons */}
              <div className="absolute top-20 -left-[8px] w-[2px] h-10 bg-[#3a3a3a] rounded-l-md"></div>
              <div className="absolute top-36 -left-[8px] w-[2px] h-10 bg-[#3a3a3a] rounded-l-md"></div>
              {/* Phone Power Button */}
              <div className="absolute top-24 -right-[8px] w-[2px] h-14 bg-[#3a3a3a] rounded-r-md"></div>
            </div>
            
            {/* Minimal Pedestal Base Shadow */}
            <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-t from-gray-200 to-transparent rounded-t-full opacity-50 blur-xl pointer-events-none z-0"></div>
          </motion.div>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full bg-white relative z-20 py-24 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16 flex flex-col md:flex-row gap-16 relative">
          
          {/* Big Background Number */}
          <div className="hidden lg:block absolute top-0 right-16 text-[15rem] font-black text-gray-50 leading-none pointer-events-none select-none z-0 tracking-tighter">
            0{project.id}
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full md:w-1/4 md:sticky top-32 h-fit relative z-10">
            <ul className="flex flex-col gap-6">
              {sections.map((section) => (
                <li key={section}>
                  <button 
                    onClick={() => setActiveSection(section)}
                    className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-4 transition-colors duration-300 ${activeSection === section ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <div className={`transition-all duration-300 ${activeSection === section ? 'w-1.5 h-1.5 bg-purple-600 rounded-full scale-100' : 'w-1.5 h-1.5 bg-transparent border border-gray-300 rounded-full scale-75'}`}></div>
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4 max-w-4xl relative z-10">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div> OVERVIEW
              </h3>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8">
                {activeSection === 'Overview' ? 'Project Overview' : `The ${activeSection}`}
              </h2>
              
              <div className="text-base md:text-lg text-gray-600 leading-relaxed space-y-6 mb-16 max-w-3xl">
                <p>{project.overview}</p>
                {/* Fallback dummy text for other sections */}
                {activeSection !== 'Overview' && (
                  <p>Through innovative design and robust engineering, we overcame the technical hurdles to deliver a product that exceeds industry standards. The solution integrates seamlessly into existing workflows while providing scalable infrastructure for future growth.</p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {project.stats.map((stat, i) => {
                  const IconComponent = iconMap[stat.icon] || Trophy;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.4 }}
                      className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-purple-200 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(147,51,234,0.08)] group"
                    >
                      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-100 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="text-2xl md:text-3xl font-black text-gray-900 mb-1 tracking-tight">{stat.value}</div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectPage;
