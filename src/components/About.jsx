import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const About = ({ theme }) => {
  const colors = {
    purple: { text: '#2E1065', accent: '#7C3AED' },
    chocolate: { text: '#27140c', accent: '#f59e0b' },
    violet: { text: '#3b0764', accent: '#9333ea' },
    teal: { text: '#115e59', accent: '#0d9488' },
    rose: { text: '#881337', accent: '#e11d48' },
    charcoal: { text: '#f8fafc', accent: '#facc15' }
  };
  const c = colors[theme] || colors.charcoal;

  const containerRef = useRef(null);

  const wordContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }
    }
  };

  const wordItem = {
    hidden: { y: "120%", rotate: 4, opacity: 0 },
    show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const renderWords = (text, isAccent = false) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="inline-block overflow-hidden pb-2 mr-[2vw] md:mr-5">
        <motion.span 
          variants={wordItem} 
          className={`inline-block ${isAccent ? 'font-serif italic font-light' : 'font-medium'}`}
          style={{ color: isAccent ? c.accent : c.text }}
        >
          {word}
        </motion.span>
      </span>
    ));
  };

  return (
    <section ref={containerRef} id="about" className="w-full min-h-screen py-32 md:py-48 flex items-center justify-center bg-transparent relative z-10 px-6 md:px-12">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Intro Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex items-center gap-6"
        >
          <div className="w-16 h-px bg-current opacity-30" style={{ color: c.text }}></div>
          <span style={{ color: c.accent }} className="font-bold text-xs md:text-sm uppercase tracking-[0.3em]">Who We Are</span>
          <div className="w-16 h-px bg-current opacity-30" style={{ color: c.text }}></div>
        </motion.div>

        {/* Massive Text Reveal */}
        <motion.div 
          variants={wordContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-6xl lg:text-[75px] xl:text-[90px] leading-[1.2] md:leading-[1.1] tracking-[-0.03em] max-w-[100%] xl:max-w-[90%] text-center flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center items-center w-full">
            {renderWords("We are a digital agency that")}
          </div>
          <div className="flex flex-wrap justify-center items-center w-full">
            {renderWords("refuses to", true)}
            {renderWords("blend in. We craft")}
          </div>
          <div className="flex flex-wrap justify-center items-center w-full">
            {renderWords("immersive experiences that elevate")}
          </div>
          <div className="flex flex-wrap justify-center items-center w-full">
            {renderWords("brands, engage audiences, and")}
          </div>
          <div className="flex flex-wrap justify-center items-center w-full">
            {renderWords("drive")}
            {renderWords("measurable results.", true)}
          </div>

          <div className="mt-20 md:mt-32 flex flex-wrap justify-center items-center w-full text-3xl md:text-5xl lg:text-[60px] opacity-90">
             {renderWords("No fluff. Just")}
             {renderWords("raw creativity", true)}
          </div>
          <div className="flex flex-wrap justify-center items-center w-full text-3xl md:text-5xl lg:text-[60px] opacity-90">
             {renderWords("and pixel-perfect engineering.")}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
