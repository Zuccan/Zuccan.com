import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'customer', 'business', 'outline', 'glass'
  size = 'md',        // 'sm', 'md', 'lg'
  onClick,
  href,
  className = '',
  icon: Icon,
  disabled = false,
  ...props
}) => {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={`btn-zuccano btn-${variant} btn-${size} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...props}
    >
      <span className="btn-content">
        {children}
        {Icon && <Icon className="btn-icon" size={size === 'lg' ? 20 : 16} />}
      </span>
      <span className="btn-glow-layer" />
    </Component>
  );
};

export default Button;
