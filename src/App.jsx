import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Pricing from './components/Pricing';

// Noise Overlay Component
const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 w-full h-full opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
    </svg>
  </div>
);

// Helper component to track which section is in view
const SectionTracker = ({ children, setTheme, themeName }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setTheme(themeName);
    }
  }, [isInView, setTheme, themeName]);

  return <div ref={ref} className="w-full">{children}</div>;
};

const cursorSvg = (color) => `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%23${color.replace('#', '')}" stroke="white" stroke-width="1.5" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.84c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.85.35Z"/></svg>`;

// Floating Particles
const FloatingParticles = ({ color }) => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-30"
          style={{
            backgroundColor: color,
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const containerRef = useRef(null);
  
  // Smooth scroll tracking using window
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [theme, setTheme] = useState('purple');

  const themeConfig = {
    purple: {
      bg: '#FFFFFF',
      text: '#2E1065',
      selectionBg: '#7C3AED',
      selectionText: '#FFFFFF',
      sphereGrad: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f3e8ff 40%, #e9d5ff 100%)',
      sphereShadow: '-30px -30px 80px rgba(255,255,255,1), 40px 40px 80px rgba(124,58,237,0.15)',
      particle: '#7C3AED'
    },
    chocolate: {
      bg: '#fffbeb',
      text: '#27140c',
      selectionBg: '#27140c',
      selectionText: '#fffbeb',
      sphereGrad: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fef3c7 40%, #fde68a 100%)',
      sphereShadow: '-30px -30px 80px rgba(255,255,255,1), 40px 40px 80px rgba(217,119,6,0.15)',
      particle: '#f59e0b'
    },
    violet: {
      bg: '#faf5ff',
      text: '#3b0764',
      selectionBg: '#9333ea',
      selectionText: '#ffffff',
      sphereGrad: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e9d5ff 40%, #c4b5fd 100%)',
      sphereShadow: '-30px -30px 80px rgba(255,255,255,1), 40px 40px 80px rgba(147,51,234,0.15)',
      particle: '#a855f7'
    },
    teal: {
      bg: '#f0fdfa',
      text: '#115e59',
      selectionBg: '#0d9488',
      selectionText: '#ffffff',
      sphereGrad: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #ccfbf1 40%, #99f6e4 100%)',
      sphereShadow: '-30px -30px 80px rgba(255,255,255,1), 40px 40px 80px rgba(13,148,136,0.15)',
      particle: '#2dd4bf'
    }
  };

  const currentTheme = themeConfig[theme];

  // Map scroll progress to the massive sphere to make it move down and swallow the screen
  const sphereY = useTransform(smoothProgress, [0, 0.5], ['0%', '100%']);
  const sphereScale = useTransform(smoothProgress, [0, 0.5], [1, 3]);

  return (
    <motion.div 
      ref={containerRef}
      initial={false}
      animate={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`w-full font-sans relative overflow-x-hidden flex flex-col`}
    >
      <style>{`
        ::selection { background-color: ${currentTheme.selectionBg}; color: ${currentTheme.selectionText}; }
        body, a, button, input, select, textarea { cursor: url('${cursorSvg(currentTheme.selectionBg)}') 5 5, auto !important; }
      `}</style>

      <NoiseOverlay />
      <FloatingParticles color={currentTheme.particle} />
      
      {/* Background Soft 3D Sphere 1 (Massive Bottom Right) */}
      <motion.div 
         animate={{ background: currentTheme.sphereGrad, boxShadow: currentTheme.sphereShadow }}
         style={{ y: sphereY, scale: sphereScale }}
         transition={{ 
           background: { duration: 0.8, ease: "easeInOut" },
           boxShadow: { duration: 0.8, ease: "easeInOut" }
         }}
         className="fixed top-[20%] right-[-10%] w-[800px] h-[800px] md:w-[1300px] md:h-[1300px] rounded-full z-0 pointer-events-none"
      >
        <div className="w-full h-full rounded-full" />
      </motion.div>

      {/* Background Soft 3D Sphere 2 (Small Top Right) */}
      <motion.div 
         animate={{ background: currentTheme.sphereGrad, boxShadow: currentTheme.sphereShadow }}
         transition={{ 
           background: { duration: 0.8, ease: "easeInOut" },
           boxShadow: { duration: 0.8, ease: "easeInOut" }
         }}
         className="fixed top-[5%] right-[10%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full flex flex-col">
        
        {/* Container for Navbar */}
        <div className="px-6 md:px-12 w-full">
            <Navbar theme={theme} />
        </div>

        {/* Hero Section */}
        <SectionTracker setTheme={setTheme} themeName="purple">
          <div className="min-h-screen flex flex-col max-w-[1400px] mx-auto px-6 md:px-12 w-full">
            <div className="flex-1 w-full flex items-center relative">
                <Hero theme={theme} scrollProgress={smoothProgress} />
            </div>
          </div>
        </SectionTracker>

        {/* Services Section */}
        <SectionTracker setTheme={setTheme} themeName="chocolate">
          <Services theme={theme} scrollProgress={smoothProgress} />
        </SectionTracker>

        {/* Work Section */}
        <SectionTracker setTheme={setTheme} themeName="violet">
          <Work theme={theme} />
        </SectionTracker>

        {/* Pricing Section */}
        <SectionTracker setTheme={setTheme} themeName="teal">
          <Pricing theme={theme} />
        </SectionTracker>

      </div>
    </motion.div>
  );
}

export default App;
