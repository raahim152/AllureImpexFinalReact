import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  padding = 'p-6',
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-md border border-secondary-100 ${padding} ${
        hoverEffect ? 'card-hover' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;