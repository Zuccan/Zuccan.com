import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, progress, range, isAccent, c }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="inline-block pb-2 mr-[2vw] md:mr-5">
      <motion.span 
        style={{ opacity, color: isAccent ? c.accent : c.text }}
        className={`inline-block transition-colors duration-800 ${isAccent ? 'font-serif italic font-light' : 'font-medium'}`}
      >
        {children}
      </motion.span>
    </span>
  );
};

const About = () => {
  const c = {
    primary: '#27140c',
    accent: '#f59e0b',
    text: '#78462b',
    bg: '#fffbeb',
    border: '#fde68a'
  };

  const containerRef = useRef(null);
  
  // Track scroll progress within the container for the highlight effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"]
  });

  const textBlocks = [
    { text: "We are a digital agency that", isAccent: false },
    { text: "refuses to", isAccent: true },
    { text: "blend in. We craft", isAccent: false },
    { text: "immersive experiences that elevate", isAccent: false },
    { text: "brands, engage audiences, and", isAccent: false },
    { text: "drive", isAccent: false },
    { text: "measurable results.", isAccent: true },
    { text: "No fluff. Just", isAccent: false },
    { text: "raw creativity", isAccent: true },
    { text: "and pixel-perfect engineering.", isAccent: false }
  ];

  // Flatten into individual words to calculate scroll ranges
  const words = [];
  textBlocks.forEach(block => {
    block.text.split(" ").forEach(word => {
      if(word) words.push({ word, isAccent: block.isAccent });
    });
  });

  const totalWords = words.length;

  return (
    <section id="about" className="w-full min-h-screen py-32 md:py-48 flex items-center justify-center bg-transparent relative z-10 px-6 md:px-12 transition-colors duration-800">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Intro Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex items-center gap-6"
        >
          <div className="w-16 h-px bg-current opacity-30 transition-colors duration-800" style={{ color: c.text }}></div>
          <span style={{ color: c.accent }} className="font-bold text-xs md:text-sm uppercase tracking-[0.3em] transition-colors duration-800">Who We Are</span>
          <div className="w-16 h-px bg-current opacity-30 transition-colors duration-800" style={{ color: c.text }}></div>
        </motion.div>

        {/* Massive Text Highlight */}
        <div 
          ref={containerRef}
          className="text-4xl md:text-6xl lg:text-[75px] xl:text-[90px] leading-[1.2] md:leading-[1.1] tracking-[-0.03em] max-w-[100%] xl:max-w-[90%] text-center flex flex-wrap justify-center items-center w-full"
        >
          {words.map((item, i) => {
            const start = i / totalWords;
            const end = start + (1 / totalWords);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} isAccent={item.isAccent} c={c}>
                {item.word}
              </Word>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default React.memo(About);
