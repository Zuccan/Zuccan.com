import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './NotFound.css';

export const NotFound = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const offsetX = (mousePos.x / window.innerWidth  - 0.5) * 18;
  const offsetY = (mousePos.y / window.innerHeight - 0.5) * 18;

  return (
    <div className="nf-root">

      {/* Subtle parallax 404 background numeral */}
      <motion.div
        className="nf-bg-num"
        style={{ x: offsetX, y: offsetY }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        animate={{ x: offsetX, y: offsetY }}
      >
        404
      </motion.div>

      {/* Content */}
      <div className="nf-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="nf-inner"
        >
          {/* Eyebrow */}
          <span className="nf-eyebrow">Error 404</span>

          {/* Heading */}
          <h1 className="nf-title" spellCheck={false}>
            Nothing here<span className="nf-dot">.</span>
          </h1>

          {/* Divider */}
          <div className="nf-rule" />

          {/* Desc */}
          <p className="nf-desc">
            This page doesn't exist or has moved.<br />
            Let's get you back on track.
          </p>

          {/* Links */}
          <div className="nf-links">
            <Link to="/" className="nf-btn-primary">
              <span>Back to Home</span>
              <ArrowUpRight size={16} />
            </Link>

            <div className="nf-secondary-links">
              <Link to="/business" className="nf-link-ghost">For Business</Link>
              <span className="nf-link-sep">·</span>
              <Link to="/customers" className="nf-link-ghost">For Everyone</Link>
            </div>
          </div>

          {/* Branding */}
          <p className="nf-brand">Zuccano<span className="nf-brand-dot">.</span></p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
