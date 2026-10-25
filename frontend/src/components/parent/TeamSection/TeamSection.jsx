import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TeamSection.css';

const TEAM = [
  {
    num: '01',
    name: 'Pavan Reddy',
    role: 'Chief Executive Officer',
    img: '/team-ayaan.jpg',
  },
  {
    num: '02',
    name: 'Kavana G Aridhiya',
    role: 'Chief Marketing Officer',
    img: '/team-sara.jpg',
  },
  {
    num: '03',
    name: 'Naseer Pasha',
    role: 'Sde',
    img: '/team-sameer.jpg',
  },
];

export const TeamSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  return (
    <section id="team" className="team-section">
      <div className="team-container">

        {/* ── Header Row ── */}
        <div className="team-header-row">
          <div className="team-header-left">
            <span className="team-eyebrow">Our People</span>
            <motion.h2
              className="team-title"
              spellCheck={false}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Three people.{' '}
              <span className="team-title-block">
                One direction<span className="team-dot">.</span>
              </span>
            </motion.h2>
          </div>

          <div className="team-header-right">
            <p className="team-intro-text">
              Different strengths.<br />
              Different perspectives.<br />
              Same belief in what we're building.
            </p>
          </div>
        </div>

        {/* ── Member Rows ── */}
        <div className="team-list" onMouseMove={handleMouseMove}>
          {TEAM.map(({ num, name, role, img }, i) => (
            <motion.div
              key={num}
              className={`team-row${hoveredIdx === i ? ' is-hovered' : ''}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <span className="team-row-num">{num}</span>
              <span className="team-row-name" spellCheck={false}>{name}</span>
              <span className="team-row-divider" aria-hidden="true" />
              <span className="team-row-role">{role}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Global floating avatar (follows cursor) ── */}
      <AnimatePresence>
        {hoveredIdx !== null && (
          <motion.div
            className="team-hover-avatar"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            key={hoveredIdx}
          >
            <img
              src={TEAM[hoveredIdx].img}
              alt={TEAM[hoveredIdx].name}
              className="team-hover-img"
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamSection;
