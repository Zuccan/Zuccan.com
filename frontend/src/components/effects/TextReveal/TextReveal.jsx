import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './TextReveal.css';

export const TextReveal = ({
  text,
  tag: Tag = 'h1',
  className = '',
  delay = 0.2,
  duration = 0.9,
  stagger = 0.04,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.reveal-word-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: '100%',
          opacity: 0,
          rotateZ: 2,
        },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration,
          delay,
          stagger,
          ease: 'power4.out',
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, stagger, text]);

  const words = (text || '').split(' ');

  return (
    <Tag ref={containerRef} className={`text-reveal-container ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="reveal-word-wrapper">
          <span className="reveal-word-inner">{word}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
