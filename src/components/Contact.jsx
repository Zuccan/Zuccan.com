import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock, Heart } from 'lucide-react';
import LogoIcon from './LogoIcon';

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Contact = () => {
  // Using purple theme values matching App.jsx for consistency
  const c = { 
    text: '#2E1065', 
    accent: '#7C3AED', 
    border: '#E9D5FF', 
    bgLight: '#FFFFFF',
    textMuted: '#6B7280'
  };

  return (
    <section id="contact" className="w-full min-h-screen pt-32 pb-8 flex flex-col items-center justify-between bg-transparent transition-colors duration-800 px-6 md:px-12 relative overflow-hidden z-10">
      
      {/* Massive CTA Section */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-8 relative z-10 flex-1 justify-center text-center mt-12 md:mt-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-3"
          style={{ color: c.accent }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          LET'S WORK TOGETHER
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ color: c.text }} 
          className="text-[12vw] md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.9] uppercase mt-4 mb-4"
        >
          LET'S BUILD<br/>SOMETHING<br/>
          <span style={{ color: c.accent }}>EXCEPTIONAL<span style={{ color: c.text }}>.</span></span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col items-center gap-6"
        >
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noreferrer"
            className="px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform text-sm md:text-base bg-[#0f172a] text-white shadow-xl hover:shadow-2xl"
          >
            Start Your Project <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
          
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium" style={{ color: c.textMuted }}>
            <Lock className="w-3.5 h-3.5" /> We reply within 24 hours. Let's make it happen.
          </div>
        </motion.div>

      </div>

      {/* 4-Column Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-[1400px] mx-auto mt-24 md:mt-32 pt-16 border-t flex flex-col gap-16 relative z-10"
        style={{ borderColor: c.border }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2 flex flex-col gap-4 lg:pr-12">
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-2" style={{ color: c.text }}>
              <LogoIcon className="w-8 h-8 md:w-10 md:h-10 shrink-0" fill={c.text} />
              <div className="flex items-end">
                ZUCCANO<span style={{ color: c.accent }}>.</span>
              </div>
            </h3>
            <p className="max-w-xs text-sm font-medium leading-relaxed" style={{ color: c.textMuted }}>
              Crafting digital experiences<br/>that drive real results.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-xs uppercase tracking-widest" style={{ color: c.text }}>Services</h4>
            <div className="flex flex-col gap-4 text-sm font-medium" style={{ color: c.textMuted }}>
              <a href="#" className="hover:text-[#2E1065] transition-colors">Web Design</a>
              <a href="#" className="hover:text-[#2E1065] transition-colors">Web Development</a>
              <a href="#" className="hover:text-[#2E1065] transition-colors">Brand Identity</a>
              <a href="#" className="hover:text-[#2E1065] transition-colors">SEO Optimization</a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-xs uppercase tracking-widest" style={{ color: c.text }}>Company</h4>
            <div className="flex flex-col gap-4 text-sm font-medium" style={{ color: c.textMuted }}>
              <a href="#" className="hover:text-[#2E1065] transition-colors">About Us</a>
              <a href="#" className="hover:text-[#2E1065] transition-colors">Our Process</a>
              <a href="#" className="hover:text-[#2E1065] transition-colors">Case Studies</a>
              <a href="#" className="hover:text-[#2E1065] transition-colors">Careers</a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-xs uppercase tracking-widest" style={{ color: c.text }}>Resources</h4>
            <div className="flex flex-col gap-4 text-sm font-medium" style={{ color: c.textMuted }}>
              <a href="#" className="hover:text-[#2E1065] transition-colors">Blog</a>
              <a href="#" className="hover:text-[#2E1065] transition-colors">Guides</a>
              <a href="#" className="hover:text-[#2E1065] transition-colors">FAQs</a>
              <a href="#contact" className="hover:text-[#2E1065] transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-xs uppercase tracking-widest" style={{ color: c.text }}>Follow Us</h4>
            <div className="flex items-center gap-4 text-sm font-medium" style={{ color: c.text }}>
              <a href="#" className="hover:scale-110 transition-transform"><InstagramIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:scale-110 transition-transform"><TwitterIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:scale-110 transition-transform"><GithubIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:scale-110 transition-transform"><LinkedinIcon className="w-5 h-5" /></a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t text-xs font-semibold" style={{ borderColor: c.border, color: c.textMuted }}>
          <div>
            © {new Date().getFullYear()} Zuccano Studio. All rights reserved.
          </div>
          
          <div className="flex items-center gap-3">
            Built in India <span style={{ color: c.accent }}>•</span> Bangalore, India
          </div>

          <div className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5" style={{ color: c.accent, fill: c.accent }} /> and lots of coffee
          </div>
        </div>

      </motion.footer>

    </section>
  );
};

export default React.memo(Contact);
