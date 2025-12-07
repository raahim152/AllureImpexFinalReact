import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container flex h-20 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-2xl font-bold text-primary-500 flex items-center">
              <i className="fas fa-cubes mr-2"></i>
              Allure Impex
            </Link>
            <div className="hidden sm:block text-sm text-secondary-600 border-l border-secondary-200 pl-3">
              Where You Find Solutions
            </div>
          </div>
          
          <button 
            id="mobile-menu-button" 
            className="md:hidden text-secondary-600 hover:text-primary-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link font-medium transition-colors ${isActive('/') ? 'text-primary-500' : 'text-secondary-700 hover:text-primary-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-link font-medium transition-colors ${isActive('/about') ? 'text-primary-500' : 'text-secondary-700 hover:text-primary-500'}`}
            >
              About
            </Link>
            <Link 
              to="/products" 
              className={`nav-link font-medium transition-colors ${isActive('/products') ? 'text-primary-500' : 'text-secondary-700 hover:text-primary-500'}`}
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link font-medium transition-colors ${isActive('/contact') ? 'text-primary-500' : 'text-secondary-700 hover:text-primary-500'}`}
            >
              Contact
            </Link>
            <Link 
              to="/contact" 
              className="bg-primary-500 text-white hover:bg-primary-600 px-6 py-2 rounded-lg shadow transition-all font-medium"
            >
              Get Quote
            </Link>
          </nav>
        </div>
        
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </header>
    </>
  );
};

export default Header;