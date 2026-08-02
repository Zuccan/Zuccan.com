import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import showcaseVideo from '../assets/videos/Cinematic_website_showcase_film_1080p_202608021420.mp4';

const Work = () => {
  const c = { text: '#3b0764', accent: '#9333ea', border: 'rgba(59,7,100,0.15)', hoverText: '#7c3aed' };

  const [activeProject, setActiveProject] = useState(null);
  const navigate = useNavigate();
  const videoRefs = useRef([]);

  useEffect(() => {
    projects.forEach((_, i) => {
      const video = videoRefs.current[i];
      if (video) {
        if (activeProject === i) {
          video.play().catch(e => console.log("Video play interrupted", e));
        } else {
          video.pause();
          // Optional: reset video to start when paused
          // video.currentTime = 0; 
        }
      }
    });
  }, [activeProject]);
  
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
          {projects.map((project, i) => (
            <li
              key={project.id}
              onClick={() => navigate('/project/' + project.id)}
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-12 border-b-2 cursor-pointer"
              style={{ borderColor: c.border }}
            >
              <div className="flex-1">
                <span style={{ color: c.text, opacity: 0.5 }} className="text-sm md:text-lg font-mono mb-2 md:mb-4 block transition-colors duration-800">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 
                  style={{ color: c.text }} 
                  className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter transition-colors duration-800 group-hover:pl-4 group-hover:text-purple-600"
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
        className="fixed top-0 left-0 w-[400px] h-[500px] md:w-[600px] md:h-[450px] pointer-events-none z-50 overflow-hidden rounded-[2rem] shadow-2xl hidden md:flex items-center justify-center bg-white p-2"
      >
        {/* Inner Screen Area */}
        <div className="w-full h-full relative overflow-hidden rounded-[1.5rem] bg-black shadow-inner">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: activeProject === i ? 1 : 0,
                y: activeProject === i ? 0 : 50,
                scale: activeProject === i ? 1 : 1.1
              }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Video only plays when hovered to save resources */}
              <video 
                ref={el => videoRefs.current[i] = el}
                src={showcaseVideo}
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(Work);
