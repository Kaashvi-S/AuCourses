import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  type = 'button',
  onClick,
  icon
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all rounded-md';
  
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-opacity-90',
    secondary: 'bg-primary-card text-text-dark hover:bg-opacity-90',
    outline: 'border border-accent text-accent hover:bg-accent hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (href) {
    return (
      <Link to={href} className={classes}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }
  
  return (
    <button type={type} className={classes} onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;