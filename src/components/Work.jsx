import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce",
    category: "Web Development",
    img: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Fintech App",
    category: "UI/UX Design",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "AI Startup",
    category: "Branding",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    title: "Next-Gen SaaS",
    category: "Full Stack",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  }
];

const Work = () => {
  const c = { text: '#3b0764', accent: '#9333ea', border: 'rgba(59,7,100,0.15)', hoverText: '#7c3aed' };

  const [activeProject, setActiveProject] = useState(null);
  
  // Motion values for exact mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to add that GSAP lag/physics feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Calculate velocity to add a tilt/skew effect based on mouse speed
  const xVelocity = useVelocity(x);
  const rotate = useTransform(xVelocity, [-1000, 1000], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by half of image width/height (w-400, h-500 approx) to center it on cursor
      // Responsive adjustment could be added, but standard 350x450 works beautifully.
      mouseX.set(e.clientX - 175); 
      mouseY.set(e.clientY - 225);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="work" className="w-full py-24 md:py-40 px-6 md:px-12 z-10 relative bg-transparent transition-colors duration-800">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
           <h2 style={{ color: c.text }} className="text-6xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.9] transition-colors duration-800">
             Selected<br/>Work<span style={{ color: c.accent }} className="transition-colors duration-800">.</span>
           </h2>
        </div>
        
        {/* Minimal Typography List */}
        <ul className="w-full flex flex-col border-t transition-colors duration-800" style={{ borderColor: c.border }}>
          {projects.map((project, index) => (
            <li 
              key={project.id}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-b cursor-pointer relative z-10 transition-colors duration-800"
              style={{ borderColor: c.border }}
            >
              <div className="flex items-center gap-8 md:gap-16 transform transition-transform duration-500 ease-out group-hover:translate-x-8">
                <span style={{ color: c.text, opacity: 0.3 }} className="text-xl md:text-3xl font-medium font-mono transition-colors duration-800">0{index + 1}</span>
                <h3 
                  style={{ color: activeProject === index ? c.hoverText : c.text }}
                  className="text-5xl md:text-8xl font-black uppercase tracking-tighter transition-colors duration-500"
                >
                  {project.title}
                </h3>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-6 transform transition-transform duration-500 ease-out group-hover:-translate-x-8">
                <span style={{ color: c.text, opacity: 0.5 }} className="text-lg md:text-2xl font-medium transition-colors duration-800">{project.category}</span>
                <ArrowRight style={{ color: c.accent }} className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out hidden md:block" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Magnetic Image Reveal (App Frame Style) */}
      <motion.div
        style={{
          x,
          y,
          rotate,
        }}
        animate={{
          scale: activeProject !== null ? 1 : 0.5,
          opacity: activeProject !== null ? 1 : 0,
        }}
        transition={{
          scale: springConfig,
          opacity: springConfig,
        }}
        className="fixed top-0 left-0 w-[300px] h-[400px] md:w-[380px] md:h-[480px] pointer-events-none z-50 overflow-hidden rounded-[2rem] shadow-2xl hidden md:flex items-center justify-center bg-white p-2"
      >
        {/* Inner Screen Area */}
        <div className="w-full h-full relative overflow-hidden rounded-[1.5rem] bg-black shadow-inner">
          {projects.map((p, i) => (
            <img 
              key={p.id} 
              src={p.img} 
              alt={p.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${activeProject === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(Work);
