import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const c = {
    primary: 'var(--theme-primary)',
    accent: 'var(--theme-accent)',
    text: 'var(--theme-text)',
    bg: 'var(--theme-bg)',
    border: 'var(--theme-border)'
  };

  return (
    <motion.nav animate={{ color: c.primary }} transition={{ duration: 0.8, ease: "easeInOut" }} className="w-full py-8 md:py-3 flex items-center justify-between z-50 relative">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <svg width="36" height="36" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(-55.88,3.87) scale(0.60974)">
            <motion.path animate={{ fill: c.primary }} transition={{ duration: 0.8, ease: "easeInOut" }} d="M 749,533 L 589,533 L 618,587 L 621,596 L 585,661 L 566,699 L 652,699 Z M 395,293 L 542,293 L 543,295 L 456,404 L 486,393 L 546,380 L 571,370 L 584,360 L 596,342 L 606,315 L 614,333 L 613,304 L 617,288 L 632,263 L 651,246 L 665,239 L 665,212 L 435,212 Z M 287,293 L 365,293 L 374,275 L 374,273 L 405,212 L 287,212 Z M 724,128 L 702,148 L 689,174 L 688,204 L 697,247 L 690,279 L 676,291 L 662,285 L 661,270 L 672,252 L 645,272 L 632,293 L 628,320 L 633,365 L 622,395 L 603,408 L 584,410 L 604,386 L 606,356 L 593,373 L 566,390 L 475,413 L 431,438 L 274,633 L 274,699 L 536,698 L 578,617 L 405,616 L 517,476 L 550,463 L 619,455 L 654,445 L 690,423 L 711,398 L 731,332 L 747,312 L 723,327 L 703,366 L 691,369 L 685,364 L 686,340 L 720,300 L 734,269 L 732,238 L 708,181 L 710,153 Z" fillRule="evenodd"/>
          </g>
        </svg>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold tracking-tight uppercase">Zuccano</span>
          <motion.span animate={{ color: c.accent }} transition={{ duration: 0.8, ease: "easeInOut" }} className="text-4xl leading-[0] ml-[2px]">.</motion.span>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-10">
        {['Services', 'Work', 'About', 'Process', 'Contact'].map((item) => (
          <motion.a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            animate={{ color: c.text }} 
            whileHover={{ color: c.primary, y: -2 }}
            className="group relative text-[14px] font-semibold tracking-wide transition-all py-1"
          >
            {item}
            <motion.span 
              className="absolute left-0 bottom-0 h-[2px] w-full origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" 
              animate={{ backgroundColor: c.accent }}
            />
          </motion.a>
        ))}
      </div>

      {/* CTA Button */}
      <div className="hidden md:block">
        <motion.button 
          animate={{ backgroundColor: c.primary, color: c.bg }}
          whileHover={{ scale: 1.02 }}
          className="px-7 py-3 rounded-full text-[14px] font-medium flex items-center gap-2 group shadow-md relative overflow-hidden"
        >
          <motion.span 
            className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out z-0" 
            animate={{ backgroundColor: c.accent }}
          />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            Let's Talk
            <svg className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19L19 5M19 5v10M19 5H9" />
            </svg>
          </span>
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
        <motion.svg animate={{ color: c.primary }} transition={{ duration: 0.8, ease: "easeInOut" }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           {isOpen ? (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
           ) : (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
           )}
        </motion.svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          animate={{ backgroundColor: c.bg, borderColor: c.border }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-24 left-0 w-full shadow-xl rounded-2xl p-6 flex flex-col space-y-4 md:hidden border z-50"
        >
          {['Services', 'Work', 'About', 'Process', 'Contact'].map((item) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              animate={{ color: c.text }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-lg font-medium" 
              onClick={() => setIsOpen(false)}
            >
              {item}
            </motion.a>
          ))}
          <motion.button 
            animate={{ backgroundColor: c.primary, color: c.bg }}
            whileHover={{ backgroundColor: c.hoverPrimary }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="px-6 py-3 rounded-full text-lg font-medium w-full mt-4"
          >
            Let's Talk
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
