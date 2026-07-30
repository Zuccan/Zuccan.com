import React, { useEffect, useState } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';

import LogoIcon from './LogoIcon';

const Loader = ({ setLoading }) => {
  const [counter, setCounter] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showDot, setShowDot] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [showText, setShowText] = useState(false);
  const fullText = "ZUCCANO";

  useEffect(() => {
    // Hide icon after 800ms
    const hideIconTimeout = setTimeout(() => {
      setShowIcon(false);
    }, 800);

    // Start typing after 1100ms
    const typingTimeout = setTimeout(() => {
      setShowText(true);
      let i = 0;
      const interval = setInterval(() => {
        if(i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setShowDot(true);
        }
      }, 80); // Speed of typing
      return () => clearInterval(interval);
    }, 1100); // Wait for logo to hide

    return () => {
      clearTimeout(hideIconTimeout);
      clearTimeout(typingTimeout);
    };
  }, []);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Animate the counter from 0 to 100
    const controls = animate(0, 100, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (value) => {
        setCounter(Math.round(value));
      },
      onComplete: () => {
        // Wait a tiny bit at 100% before triggering exit
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = 'auto'; // restore scroll
        }, 300);
      }
    });

    return () => {
      controls.stop();
      document.body.style.overflow = 'auto';
    };
  }, [setLoading]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fdfdfd] text-[#0f172a] overflow-hidden"
    >
      {/* Background Soft 3D Spheres */}
      <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 0.5 }}
         transition={{ duration: 1 }}
         style={{ backgroundColor: '#7C3AED', filter: 'blur(90px)' }}
         className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full z-0 pointer-events-none"
      />
      <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 0.6 }}
         transition={{ duration: 1, delay: 0.2 }}
         style={{ backgroundColor: '#7C3AED', filter: 'blur(50px)' }}
         className="absolute top-[30%] left-[10%] w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full z-0 pointer-events-none"
      />

      <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-sm px-8">
        
        {/* Logo and Typed Text */}
        <div className="text-5xl md:text-7xl font-black tracking-tighter flex items-center justify-center w-full mb-2 h-[80px]">
          <AnimatePresence mode="wait">
            {showIcon && (
              <motion.div
                key="logo-icon"
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="shrink-0"
              >
                <LogoIcon className="w-30 h-30 md:w-40 md:h-40" fill="#0f172a" />
              </motion.div>
            )}
            
            {!showIcon && showText && (
              <motion.div 
                key="logo-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end pt-1"
              >
                {typedText}
                {showDot && (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="text-[#7C3AED]"
                  >
                    .
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-bold text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#0f172a]"
        >
          Loading Your Experience
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full flex flex-col items-center gap-3 mt-2">
          {/* Progress Bar Track */}
          <div className="w-full h-1 md:h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#7C3AED] rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"
              style={{ width: `${counter}%` }} // Using style for fast updates
            />
          </div>
          
          {/* Percentage */}
          <div className="font-bold text-xs tracking-wider text-[#7C3AED] tabular-nums">
            {counter}%
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Loader;
