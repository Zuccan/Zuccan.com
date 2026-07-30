import React from 'react';
import { motion } from 'framer-motion';
import { Mouse, ArrowUpRight } from 'lucide-react';

const Hero = () => {
  const c = {
    primary: '#2E1065',
    accent: '#7C3AED',
    text: '#6B7280',
    bg: '#FFFFFF',
    border: '#E9D5FF'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const textItemVariants = {
    hidden: { y: "120%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between h-full w-full pt-20 md:pt-5 pb-20 relative z-10 gap-16 lg:gap-8 perspective-1000">
      
      {/* Left Content */}
      <div className="flex flex-col w-full lg:w-[55%] xl:w-1/2 relative z-20">
        
        {/* Main Headline (Text Reveal) */}
        <motion.h1 
          className="text-6xl md:text-7xl lg:text-[85px] font-medium leading-[1.05] tracking-[-0.04em] mb-8"
          initial="hidden" animate="show" variants={containerVariants}
        >
          <div className="overflow-hidden"><motion.div variants={textItemVariants} animate={{ color: c.primary }}>We build</motion.div></div>
          <div className="overflow-hidden"><motion.div variants={textItemVariants} animate={{ color: c.primary }}>websites that</motion.div></div>
          <div className="overflow-hidden">
            <motion.div variants={textItemVariants} className="flex items-center gap-4">
              <span style={{ color: c.primary }}>drive</span> 
              <motion.span animate={{ color: c.accent }} className="font-serif italic font-light">results.</motion.span>
            </motion.div>
          </div>
        </motion.h1>

        {/* Sub-headline */}
        <motion.div className="overflow-hidden mb-12" initial="hidden" animate="show" variants={containerVariants}>
          <motion.p variants={textItemVariants} animate={{ color: c.text }} className="text-lg md:text-xl leading-relaxed max-w-lg">
            We help brands scale globally with modern, fast, and conversion-focused digital experiences.
          </motion.p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center gap-6"
        >
          <motion.button 
            animate={{ backgroundColor: c.primary, color: c.bg }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 rounded-md text-[14px] font-medium flex items-center shadow-xl relative group transition-all"
          >
            <span className="relative z-10 flex items-center">
              Get in touch
              <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </span>
          </motion.button>

          <motion.button 
            animate={{ color: c.primary }}
            whileHover={{ y: -2 }}
            className="group relative flex items-center gap-1.5 text-[14px] font-medium pb-1 transition-transform"
          >
            View Our Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span 
              className="absolute left-0 bottom-0 h-[1px] w-full origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" 
              style={{ backgroundColor: c.primary }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Right Content - 3D Browser Showcase */}
      <motion.div 
        initial={{ opacity: 0, rotateY: 20, x: 50 }}
        animate={{ opacity: 1, rotateY: -15, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="w-full lg:w-[50%] xl:w-1/2 relative h-[400px] md:h-[500px] flex items-center justify-center mt-12 lg:mt-0"
      >
        <div 
          className="w-full h-full rounded-2xl shadow-2xl border-2 flex flex-col overflow-hidden glass-card-dark relative z-10"
          style={{ backgroundColor: c.bg, borderColor: c.border, boxShadow: `0 30px 60px ${c.border}` }}
        >
          {/* Browser Header */}
          <div className="h-10 w-full border-b-2 flex items-center px-4 gap-3 shrink-0" style={{ borderColor: c.border }}>
             <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
             <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
             
             {/* Address Bar */}
             <div className="flex-1 mx-4 h-6 rounded-md flex items-center justify-center text-[10px] font-mono tracking-widest opacity-70 border" style={{ backgroundColor: c.border, color: c.primary, borderColor: c.primary }}>
               DeveloperOS
             </div>
             <div className="w-8"></div> {/* Spacer to balance dots */}
          </div>
          
          {/* Iframe Content */}
          <div className="flex-1 w-full bg-white relative overflow-hidden">
            {/* Animate a slight initial bump to indicate it's a webpage */}
            <motion.div
              animate={{ y: [0, -60, 0] }}
              transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-[calc(100%+60px)]"
            >
              <iframe 
                 src="http://naseer-047.github.io/DeveloperOS-offical-website/" 
                 className="absolute top-0 left-0 h-full border-none"
                 style={{ width: 'calc(100% + 20px)' }}
                 title="Live Website Preview"
                 sandbox="allow-scripts allow-same-origin"
              />
            </motion.div>
            
            {/* Scroll Indicator Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center gap-2"
            >
              <div className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-2">
                <Mouse className="w-3 h-3 animate-bounce" /> Scroll to explore
              </div>
            </motion.div>
            
            {/* A subtle shadow overlay */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] border-t-2" style={{ borderColor: c.border }}></div>
          </div>
        </div>

        {/* Small Floating Accent Orbs */}
        <motion.div 
          className="absolute -top-10 -right-5 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none z-0"
          style={{ backgroundColor: c.accent }}
        />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none z-0"
          style={{ backgroundColor: c.primary }}
        />

      </motion.div>
    </div>
  );
};

export default React.memo(Hero);
