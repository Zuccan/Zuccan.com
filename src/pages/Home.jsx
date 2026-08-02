import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Work from '../components/Work';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import Loader from '../components/Loader';

// Noise Overlay Component
const NoiseOverlay = React.memo(() => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 w-full h-full opacity-[0.15] mix-blend-soft-light"
    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
  />
));

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
  },
  rose: {
    bg: '#fff1f2',
    text: '#881337',
    selectionBg: '#e11d48',
    selectionText: '#ffffff',
    sphereGrad: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #ffe4e6 40%, #fecdd3 100%)',
    sphereShadow: '-30px -30px 80px rgba(255,255,255,1), 40px 40px 80px rgba(225,29,72,0.15)',
    particle: '#fb7185'
  },
  charcoal: {
    bg: '#0f172a',
    text: '#f8fafc',
    selectionBg: '#facc15',
    selectionText: '#0f172a',
    sphereGrad: 'radial-gradient(circle at 35% 35%, #334155 0%, #1e293b 40%, #0f172a 100%)',
    sphereShadow: '-30px -30px 80px rgba(51,65,85,0.2), 40px 40px 80px rgba(30,41,59,0.3)',
    particle: '#facc15'
  }
};

const cursorSvg = (color) => `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%23${color.replace('#', '')}" stroke="white" stroke-width="1.5" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.84c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.85.35Z"/></svg>`;

const updateTheme = (themeName) => {
  const currentTheme = themeConfig[themeName] || themeConfig.purple;
  document.documentElement.style.setProperty('--selection-bg', currentTheme.selectionBg);
  document.documentElement.style.setProperty('--selection-text', currentTheme.selectionText);
  document.documentElement.style.setProperty('--cursor-url', `url('${cursorSvg(currentTheme.selectionBg)}') 5 5, auto`);
  document.documentElement.style.setProperty('--theme-bg', currentTheme.bg);
  document.documentElement.style.setProperty('--theme-text', currentTheme.text);
  document.documentElement.style.setProperty('--theme-primary', currentTheme.text);
  document.documentElement.style.setProperty('--theme-accent', currentTheme.selectionBg);
  document.documentElement.style.setProperty('--theme-border', currentTheme.selectionBg);
  document.documentElement.style.setProperty('--sphere-color', currentTheme.particle);
};

// Helper component to track which section is in view
const SectionTracker = ({ children, themeName }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      updateTheme(themeName);
    }
  }, [isInView, themeName]);

  return <div ref={ref} className="w-full">{children}</div>;
};

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // Scroll to top on mount for consistent loading experience
  useEffect(() => {
    window.scrollTo(0, 0);
    // Initialize initial theme
    updateTheme('purple');
  }, []);

  // Initialize Locomotive Scroll
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader setLoading={setIsLoading} />}
      </AnimatePresence>

      <div 
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{ 
          backgroundColor: 'var(--theme-bg)', 
          transition: 'background-color 0.8s ease-in-out',
          willChange: 'background-color'
        }}
      />

      <div 
        ref={containerRef}
        className={`w-full font-sans relative overflow-x-hidden flex flex-col`}
        style={{ color: 'var(--theme-text)' }}
      >

        <NoiseOverlay />
      
      {/* Background Soft 3D Sphere 1 (Massive Bottom Right) */}
      <div 
         style={{ 
           backgroundColor: 'var(--sphere-color)',
           filter: 'blur(12px)',
           transform: 'scale(10) translateZ(0)',
           willChange: 'background-color',
           transition: 'background-color 0.8s ease-in-out'
         }}
         className="fixed top-[40%] right-[10%] w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full z-0 pointer-events-none opacity-40 origin-center"
      />

      {/* Background Soft 3D Sphere 2 (Small Top Right) */}
      <div 
         style={{ 
           backgroundColor: 'var(--sphere-color)',
           filter: 'blur(8px)',
           transform: 'scale(10) translateZ(0)',
           willChange: 'background-color',
           transition: 'background-color 0.8s ease-in-out'
         }}
         className="fixed top-[15%] right-[20%] w-[20px] h-[20px] md:w-[35px] md:h-[35px] rounded-full z-0 pointer-events-none opacity-40 origin-center"
      />

      <div className="relative z-10 w-full flex flex-col">
        
        {/* Container for Navbar */}
        <div className="px-6 md:px-12 w-full">
            <Navbar />
        </div>

        {/* Hero Section */}
        <SectionTracker themeName="purple">
          <div className="min-h-screen flex flex-col max-w-[1400px] mx-auto px-6 md:px-12 w-full">
            <div className="flex-1 w-full flex items-center relative">
                <Hero />
            </div>
          </div>
        </SectionTracker>

        {/* Services Section */}
        <SectionTracker themeName="chocolate">
          <Services />
        </SectionTracker>

        {/* About Section */}
        <SectionTracker themeName="chocolate">
          <About />
        </SectionTracker>

        {/* Work Section */}
        <SectionTracker themeName="violet">
          <Work />
        </SectionTracker>

        {/* Pricing Section */}
        <SectionTracker themeName="teal">
          <Pricing />
        </SectionTracker>

        <SectionTracker themeName="purple">
          <Contact />
        </SectionTracker>
      </div>
    </div>
    </>
  );
}

export default Home;
