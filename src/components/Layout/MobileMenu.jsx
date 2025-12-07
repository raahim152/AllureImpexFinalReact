import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-secondary-200 py-4 px-4">
      <div className="flex flex-col space-y-4">
        <Link 
          to="/" 
          className={`font-medium transition-colors py-2 ${isActive('/') ? 'text-primary-500' : 'text-secondary-700 hover:text-primary-500'}`}
          onClick={onClose}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className={`font-medium transition-colors py-2 ${isActive('/about') ? 'text-primary-500' : 'text-secondary-700 hover:text-primary-500'}`}
          onClick={onClose}
        >
          About
        </Link>
        <Link 
          to="/products" 
          className={`font-medium transition-colors py-2 ${isActive('/products') ? 'text-primary-500' : 'text-secondary-700 hover:text-primary-500'}`}
          onClick={onClose}
        >
          Products
        </Link>
        <Link 
          to="/contact" 
          className={`font-medium transition-colors py-2 ${isActive('/contact') ? 'text-primary-500' : 'text-secondary-700 hover:text-primary-500'}`}
          onClick={onClose}
        >
          Contact
        </Link>
        <Link 
          to="/contact" 
          className="bg-primary-500 text-white hover:bg-primary-600 px-6 py-2 rounded-lg shadow transition-all font-medium text-center mt-2"
          onClick={onClose}
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;