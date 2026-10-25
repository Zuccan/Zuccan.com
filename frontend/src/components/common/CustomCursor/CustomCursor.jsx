import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isOverRed, setIsOverRed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const checkRedElement = (target) => {
      if (!target) return false;

      // 1. Direct class checks for elements that are red or turn red on hover
      if (
        target.classList?.contains('dot-red') ||
        target.closest?.('.dot-red') ||
        target.classList?.contains('header-menu-btn') ||
        target.closest?.('.header-menu-btn') ||
        target.classList?.contains('btn-dark') ||
        target.closest?.('.btn-dark') ||
        target.closest?.('.card-action-btn.dark') ||
        target.closest?.('.footer-pill-btn.dark') ||
        target.closest?.('.mini-pill-btn.dark')
      ) {
        return true;
      }

      // 2. Computed background color inspection
      let el = target;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        if (bg && bg.startsWith('rgb')) {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            if (r > 200 && g < 75 && b < 75) {
              return true;
            }
          }
        }
        el = el.parentElement;
      }

      return false;
    };

    let rafId;
    const handleMouseMove = (e) => {
      setIsVisible(true);
      const { clientX, clientY } = e;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
      });

      const target = document.elementFromPoint(clientX, clientY);
      setIsOverRed(checkRedElement(target));

      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest?.('button') ||
          target.closest?.('a') ||
          target.getAttribute?.('role') === 'button' ||
          target.classList?.contains('hero-scroll-indicator') ||
          target.closest?.('.hero-scroll-indicator'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-arrow-pointer ${isOverRed ? 'pointer-black' : 'pointer-red'} ${isHovered ? 'pointer-hover' : ''} ${isVisible ? 'pointer-visible' : 'pointer-hidden'}`}
    >
      <svg
        width="28"
        height="34"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-svg-icon"
      >
        <path
          d="M0 0L7.5 22L11.5 14L19.5 10L0 0Z"
          fill="currentColor"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CustomCursor;
