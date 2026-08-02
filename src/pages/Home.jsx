import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Loader from '../components/Loader';

// Lazy load below-the-fold components to reduce main bundle size and fix TBT
const LazyAbout = React.lazy(() => import('../components/About'));
const LazyServices = React.lazy(() => import('../components/Services'));
const LazyWork = React.lazy(() => import('../components/Work'));
const LazyPricing = React.lazy(() => import('../components/Pricing'));
const LazyContact = React.lazy(() => import('../components/Contact'));

// Noise Overlay Component
const NoiseOverlay = React.memo(() => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 w-full h-full opacity-[0.15] mix-blend-soft-light hidden md:block"
    style={{ 
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', 
      backgroundRepeat: 'repeat',
      transform: 'translateZ(0)',
      willChange: 'transform'
    }}
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
  const [isLoading, setIsLoading] = useState(() => window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const containerRef = useRef(null);

  // Scroll to top on mount for consistent loading experience
  useEffect(() => {
    window.scrollTo(0, 0);
    // Initialize initial theme
    updateTheme('purple');
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Locomotive Scroll dynamically on desktop
  useEffect(() => {
    if (window.innerWidth < 768) return;
    
    let locomotiveScroll;
    import('locomotive-scroll').then((module) => {
      const LocomotiveScroll = module.default;
      locomotiveScroll = new LocomotiveScroll();
    });

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader setLoading={setIsLoading} />}
      </AnimatePresence>

      {!isMobile && <NoiseOverlay />}
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
      {!isMobile && (
        <div 
           className="absolute -right-[20%] -bottom-[20%] w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full hidden md:block"
           style={{ 
             backgroundColor: 'var(--sphere-color)',
             filter: 'blur(12px)',
             transform: 'scale(10) translateZ(0)',
             willChange: 'transform'
           }}
        />
      )}

      {/* Background Soft 3D Sphere 2 (Smaller Top Left) */}
      {!isMobile && (
        <div 
           className="absolute -left-[10%] top-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full hidden md:block"
           style={{ 
             backgroundColor: 'var(--sphere-color)',
             filter: 'blur(10px)',
             transform: 'scale(10) translateZ(0)',
             willChange: 'transform',
             opacity: 0.6
           }}
        />
      )}

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

        <React.Suspense fallback={<div className="h-screen w-full"></div>}>
          {/* Services Section */}
          <SectionTracker themeName="chocolate">
            <LazyServices />
          </SectionTracker>

          {/* About Section */}
          <SectionTracker themeName="chocolate">
            <LazyAbout />
          </SectionTracker>

          {/* Work Section */}
          <SectionTracker themeName="violet">
            <LazyWork />
          </SectionTracker>

          {/* Pricing Section */}
          <SectionTracker themeName="teal">
            <LazyPricing />
          </SectionTracker>

          <SectionTracker themeName="purple">
            <LazyContact />
          </SectionTracker>
        </React.Suspense>
      </div>
    </div>
    </>
  );
}

export default Home;
