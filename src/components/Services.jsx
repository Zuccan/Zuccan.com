import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { PenTool, Code, Sparkles, TrendingUp, Headphones, ArrowRight, Activity, Code2, Paintbrush, Server, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Services = ({ theme, scrollProgress }) => {
  const servicesList = [
    { num: '01', icon: <PenTool className="w-5 h-5" />, title: 'Web Design', desc: 'Beautiful, user-centered designs.' },
    { num: '02', icon: <Code className="w-5 h-5" />, title: 'Web Development', desc: 'Fast, scalable and secure websites.' },
    { num: '03', icon: <Sparkles className="w-5 h-5" />, title: 'Brand Identity', desc: 'Logos, visuals and brand systems.' },
    { num: '04', icon: <TrendingUp className="w-5 h-5" />, title: 'SEO Optimization', desc: 'Rank higher and get found.' },
    { num: '05', icon: <Headphones className="w-5 h-5" />, title: 'Maintenance', desc: 'Ongoing updates and support.' }
  ];

  const colors = {
    purple: {
      primary: '#2E1065',
      accent: '#7C3AED',
      text: '#6B7280',
      bg: '#FFFFFF',
      border: '#E9D5FF',
      cardHoverBg: 'rgba(233, 213, 255, 0.3)',
      darkAccent: '#6D28D9'
    },
    chocolate: {
      primary: '#27140c',
      accent: '#f59e0b',
      text: '#78462b',
      bg: '#fffbeb',
      border: '#fde68a',
      cardHoverBg: 'rgba(253, 230, 138, 0.2)',
      darkAccent: '#d97706'
    }
  };

  const c = colors[theme] || colors.purple;

  // Deck of Cards State (5 Cards)
  const [cards, setCards] = useState([0, 1, 2, 3, 4]);
  const [isHovering, setIsHovering] = useState(false);

  const moveToEnd = () => {
    setCards((prev) => {
       const newCards = [...prev];
       const topCard = newCards.pop();
       newCards.unshift(topCard);
       return newCards;
    });
  };

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      moveToEnd();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering]);

  // Scroll Animations using whileInView instead of global scrollProgress to avoid breaking when page height changes


  const renderCardContent = (id) => {
    // 0: SEO
    if (id === 0) {
      return (
        <div className="w-full h-full rounded-3xl shadow-xl border-4 flex flex-col p-6" style={{ backgroundColor: c.border, borderColor: c.bg }}>
           <div className="flex justify-between items-center mb-6">
             <h4 style={{ color: c.primary }} className="font-bold text-lg flex items-center gap-2">
               <TrendingUp className="w-5 h-5" /> SEO Optimization
             </h4>
             <Activity className="w-5 h-5 text-green-500" />
           </div>
           <div className="flex gap-4 mb-6">
             <div style={{ backgroundColor: c.bg }} className="flex-1 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
               <span style={{ color: c.text }} className="text-xs font-semibold uppercase">Organic Traffic</span>
               <span style={{ color: c.primary }} className="text-3xl font-bold">+240%</span>
             </div>
             <div style={{ backgroundColor: c.bg }} className="flex-1 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
               <span style={{ color: c.text }} className="text-xs font-semibold uppercase">Lighthouse</span>
               <span style={{ color: c.primary }} className="text-3xl font-bold">100</span>
             </div>
           </div>
           <div className="flex-1 relative flex items-end gap-2 overflow-hidden px-2">
             <div style={{ backgroundColor: c.accent }} className="w-full rounded-t-sm h-[40%] transition-colors duration-800"></div>
             <div style={{ backgroundColor: c.primary }} className="w-full rounded-t-sm h-[70%] transition-colors duration-800"></div>
             <div style={{ backgroundColor: c.accent }} className="w-full rounded-t-sm h-[50%] transition-colors duration-800"></div>
             <div style={{ backgroundColor: c.primary }} className="w-full rounded-t-sm h-[90%] transition-colors duration-800"></div>
             <div style={{ backgroundColor: c.accent }} className="w-full rounded-t-sm h-[65%] transition-colors duration-800"></div>
           </div>
        </div>
      );
    }
    // 1: Web Design
    if (id === 1) {
      return (
        <div className="w-full h-full rounded-3xl shadow-xl border-4 flex flex-col overflow-hidden" style={{ backgroundColor: c.bg, borderColor: c.border }}>
           <div className="h-10 border-b flex items-center px-4 justify-between" style={{ borderColor: c.border }}>
              <h4 style={{ color: c.primary }} className="font-bold text-sm flex items-center gap-2">
                <Paintbrush className="w-4 h-4" /> Web Design
              </h4>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
           </div>
           <div className="flex flex-1">
             <div style={{ backgroundColor: c.border }} className="w-[30%] h-full p-4 flex flex-col gap-4">
                <div className="w-8 h-8 rounded-full mb-4" style={{ backgroundColor: c.primary }}></div>
                <div className="h-2 w-full rounded-full" style={{ backgroundColor: c.primary, opacity: 0.3 }}></div>
                <div className="h-2 w-5/6 rounded-full" style={{ backgroundColor: c.primary, opacity: 0.3 }}></div>
                <div className="h-2 w-4/6 rounded-full" style={{ backgroundColor: c.primary, opacity: 0.3 }}></div>
                <div className="h-2 w-full rounded-full" style={{ backgroundColor: c.primary, opacity: 0.3 }}></div>
             </div>
             <div className="w-[70%] h-full p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center w-full mb-2">
                   <div className="h-4 w-1/2 rounded-full" style={{ backgroundColor: c.primary }}></div>
                   <div className="w-6 h-6 rounded-full" style={{ backgroundColor: c.accent }}></div>
                </div>
                <div className="h-20 w-full rounded-xl" style={{ backgroundColor: c.border }}></div>
                <div className="grid grid-cols-2 gap-4 flex-1">
                   <div className="h-full rounded-xl" style={{ backgroundColor: c.primary, opacity: 0.1 }}></div>
                   <div className="h-full rounded-xl" style={{ backgroundColor: c.primary, opacity: 0.1 }}></div>
                </div>
             </div>
           </div>
        </div>
      );
    }
    // 2: Web Dev
    if (id === 2) {
      return (
        <div className="w-full h-full rounded-3xl shadow-2xl border-4 flex flex-col overflow-hidden relative" style={{ backgroundColor: c.primary, borderColor: c.accent }}>
           <div style={{ backgroundColor: c.accent }} className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 transition-colors duration-800"></div>

           <div className="h-12 flex items-center px-6 gap-4 border-b relative z-10" style={{ borderColor: c.darkAccent, backgroundColor: c.darkAccent }}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div style={{ color: c.bg }} className="font-mono text-xs font-bold tracking-wider opacity-80 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Web Development
              </div>
           </div>
           
           <div className="flex-1 p-6 md:p-8 flex flex-col justify-start gap-4 relative z-10 font-mono">
              <div className="flex items-center gap-4 w-full">
                 <span style={{ color: c.accent }} className="text-sm">01</span>
                 <div className="h-3 w-1/4 rounded-full" style={{ backgroundColor: '#c4b5fd' }}></div>
                 <div className="h-3 w-1/3 rounded-full" style={{ backgroundColor: c.bg }}></div>
              </div>
              <div className="flex items-center gap-4 w-full pl-8">
                 <span style={{ color: c.accent }} className="text-sm">02</span>
                 <div className="h-3 w-1/2 rounded-full" style={{ backgroundColor: c.bg, opacity: 0.7 }}></div>
              </div>
              <div className="flex items-center gap-4 w-full pl-8">
                 <span style={{ color: c.accent }} className="text-sm">03</span>
                 <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: c.accent }}></div>
              </div>
              <div className="flex items-center gap-4 w-full pl-16">
                 <span style={{ color: c.accent }} className="text-sm">04</span>
                 <div className="h-3 w-1/2 rounded-full" style={{ backgroundColor: c.bg }}></div>
                 <div className="h-3 w-1/4 rounded-full" style={{ backgroundColor: '#fde68a' }}></div>
              </div>
              <div className="flex items-center gap-4 w-full pl-8">
                 <span style={{ color: c.accent }} className="text-sm">05</span>
                 <div className="h-3 w-1/3 rounded-full" style={{ backgroundColor: c.bg, opacity: 0.7 }}></div>
              </div>
              <div className="flex items-center gap-4 w-full mt-4">
                 <span style={{ color: c.accent }} className="text-sm">06</span>
                 <div className="h-3 w-1/5 rounded-full" style={{ backgroundColor: '#c4b5fd' }}></div>
              </div>
              <div className="mt-auto self-end flex gap-2">
                 <div style={{ backgroundColor: c.bg, color: c.primary }} className="px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors duration-800">React</div>
                 <div style={{ backgroundColor: c.accent, color: c.primary }} className="px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors duration-800">Node.js</div>
              </div>
           </div>
        </div>
      );
    }
    // 3: Brand Identity
    if (id === 3) {
      return (
        <div className="w-full h-full rounded-3xl shadow-xl border-4 flex flex-col overflow-hidden" style={{ backgroundColor: c.bg, borderColor: c.border }}>
           <div className="h-10 border-b flex items-center px-4 justify-between" style={{ borderColor: c.border }}>
              <h4 style={{ color: c.primary }} className="font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Brand Identity
              </h4>
           </div>
           <div className="flex-1 p-6 flex flex-col gap-6 items-center justify-center relative overflow-hidden">
             {/* Typography Symbol */}
             <div className="absolute top-4 left-6 text-8xl font-serif opacity-10" style={{ color: c.primary }}>Aa</div>
             {/* Color Palette */}
             <div className="flex gap-2 w-full justify-end relative z-10">
                <div className="w-10 h-10 rounded-full shadow-md" style={{ backgroundColor: c.primary }}></div>
                <div className="w-10 h-10 rounded-full shadow-md" style={{ backgroundColor: c.accent }}></div>
                <div className="w-10 h-10 rounded-full shadow-md border" style={{ backgroundColor: c.bg, borderColor: c.border }}></div>
             </div>
             {/* Logo Placeholder */}
             <div className="flex items-center justify-center gap-2 mt-4 relative z-10">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center transform rotate-45" style={{ backgroundColor: c.primary }}>
                   <div className="w-4 h-4 transform -rotate-45" style={{ backgroundColor: c.accent }}></div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <div className="h-4 w-32 rounded-full" style={{ backgroundColor: c.primary }}></div>
                  <div className="h-2 w-20 rounded-full" style={{ backgroundColor: c.primary, opacity: 0.5 }}></div>
                </div>
             </div>
           </div>
        </div>
      );
    }
    // 4: Maintenance
    if (id === 4) {
      return (
        <div className="w-full h-full rounded-3xl shadow-xl border-4 flex flex-col p-6 overflow-hidden relative" style={{ backgroundColor: c.border, borderColor: c.bg }}>
           <div className="flex justify-between items-center mb-4 relative z-10">
             <h4 style={{ color: c.primary }} className="font-bold text-lg flex items-center gap-2">
               <ShieldCheck className="w-5 h-5" /> Maintenance
             </h4>
           </div>
           
           <div className="flex-1 grid grid-cols-2 gap-4 relative z-10">
              {/* Left: Circular Uptime Ring */}
              <div className="flex flex-col items-center justify-center p-2 rounded-2xl shadow-sm" style={{ backgroundColor: c.bg }}>
                 <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="opacity-20" style={{ color: c.primary }} />
                      <motion.circle 
                        cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" 
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                        strokeLinecap="round"
                        style={{ color: c.accent }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-bold text-base md:text-lg" style={{ color: c.primary }}>99.9%</span>
                      <span className="text-[7px] uppercase font-bold opacity-50 tracking-widest mt-1" style={{ color: c.primary }}>Uptime</span>
                    </div>
                 </div>
              </div>

              {/* Right: Microservices Grid */}
              <div className="flex flex-col justify-center gap-2">
                 {['API Gateway', 'Database', 'Cloud Storage'].map((service, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * i }}
                      className="flex items-center justify-between text-[10px] md:text-xs font-bold p-2 rounded-lg shadow-sm" style={{ backgroundColor: c.bg }}
                    >
                       <span style={{ color: c.primary }} className="opacity-80">{service}</span>
                       <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Bottom: Terminal Simulator */}
           <div className="h-24 w-full mt-4 rounded-xl p-3 flex flex-col gap-1.5 font-mono text-[9px] overflow-hidden shadow-inner border relative z-10" style={{ backgroundColor: c.primary, borderColor: c.primary }}>
              <div className="flex gap-1.5 mb-1 opacity-50">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-green-400">&gt; initializing system check...</motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-green-400">&gt; databases synced and secured.</motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.8 }} className="text-green-400 flex items-center gap-2">&gt; all services operational. <span className="w-1.5 h-3 bg-green-400 animate-pulse"></span></motion.div>
           </div>
        </div>
      );
    }
  };

  return (
    <section id="services" className="relative w-full min-h-screen py-24 md:py-32 flex items-center overflow-hidden z-10">
      <motion.div 
        initial={{ y: 150, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[1400px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
      >
        
        {/* Left Column: Heading + Parallax Deck */}
        <div className="w-full flex flex-col gap-12">
          
          {/* Heading Section */}
          <div>
            <motion.p animate={{ color: c.primary }} className="text-[13px] font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
              Services <motion.span animate={{ backgroundColor: c.accent }} className="w-12 h-[2px]"></motion.span>
            </motion.p>
            <motion.h2 animate={{ color: c.primary }} className="text-5xl md:text-6xl lg:text-[70px] font-medium leading-[1.05] tracking-[-0.03em] mb-6">
              Everything your<br/> business needs<br/> to grow<motion.span animate={{ color: c.accent }}>.</motion.span>
            </motion.h2>
            <motion.p animate={{ color: c.text }} className="text-lg leading-relaxed max-w-md">
              We combine strategy, design and technology to build digital experiences that drive real results.
            </motion.p>
          </div>

          {/* Interactive Parallax Card Stack */}
          <div 
            className="w-full relative h-[450px] md:h-[550px] flex items-center justify-center perspective-1000 mt-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
          >
            <AnimatePresence>
              {cards.map((id, index) => {
                const isTop = index === cards.length - 1;
                const isMiddle = index === cards.length - 2;
                const isBack = index === cards.length - 3;
                // Cards below the 3rd one remain hidden (opacity 0) and small at the back
                const isHidden = index < cards.length - 3;
                
                let rotateZ = 0;
                let y = 0;
                let x = 0;
                let scale = 1;
                let opacity = 1;
                
                if (isTop) { rotateZ = -2; y = -20; x = 10; scale = 1; opacity = 1; }
                else if (isMiddle) { rotateZ = 6; y = 0; x = 20; scale = 0.95; opacity = 1; }
                else if (isBack) { rotateZ = -12; y = 0; x = -40; scale = 0.9; opacity = 1; }
                else if (isHidden) { rotateZ = -20; y = 0; x = -60; scale = 0.8; opacity = 0; }

                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 150 }}
                    animate={{ opacity, rotateZ, y, x, scale, zIndex: index }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, info) => {
                      if (info.offset.x > 100 || info.offset.x < -100) {
                        moveToEnd();
                      }
                    }}
                    whileHover={isTop ? { scale: 1.02, y: -40, cursor: "grab" } : {}}
                    whileTap={isTop ? { cursor: "grabbing" } : {}}
                    className="absolute w-[85%] md:w-[75%] h-[320px] md:h-[380px]"
                  >
                    {renderCardContent(id)}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Services List ONLY */}
        <div className="w-full flex flex-col pt-32 lg:pt-80">
          <motion.div animate={{ borderColor: c.border }} className="flex flex-col border-t lg:border-t-0">
            {servicesList.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ backgroundColor: c.cardHoverBg }}
                animate={{ borderColor: c.border }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b transition-colors cursor-pointer px-4 -mx-4 rounded-xl"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <motion.span animate={{ color: c.accent }} style={{ opacity: 0.5 }} whileHover={{ opacity: 1 }} className="text-sm font-bold transition-colors w-6">{service.num}</motion.span>
                  <motion.div 
                    animate={{ backgroundColor: c.border, color: c.primary }} 
                    whileHover={{ backgroundColor: c.primary, color: c.bg }}
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all"
                  >
                    {service.icon}
                  </motion.div>
                  <motion.h3 animate={{ color: c.primary }} className="text-xl md:text-2xl font-bold w-48">{service.title}</motion.h3>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 flex-1 md:pl-8">
                  <motion.p animate={{ color: c.text }} className="text-sm hidden xl:block">{service.desc}</motion.p>
                  <div className="shrink-0 transform group-hover:translate-x-2 transition-transform">
                    <ArrowRight className="w-6 h-6" color={c.primary} strokeWidth={1.5}/>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Services;
