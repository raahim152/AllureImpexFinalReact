import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'right',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all rounded-lg';
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-primary-600 hover:bg-secondary-100 shadow-lg hover:shadow-xl',
    outline: 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;