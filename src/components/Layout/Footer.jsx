import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Link to="/" className="text-2xl font-bold text-primary-400 flex items-center">
                <i className="fas fa-cubes mr-2"></i>
                Allure Impex
              </Link>
            </div>
            <p className="text-secondary-300 mb-6 max-w-md">
              Connecting manufacturers and buyers with reliable, sustainable sourcing solutions worldwide. Your trusted partner for quality products and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-secondary-300 hover:text-primary-400 transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="text-secondary-300 hover:text-primary-400 transition-colors">Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products#corrugated" className="text-secondary-300 hover:text-primary-400 transition-colors">Corrugated Packaging</Link></li>
              <li><Link to="/products#flexible" className="text-secondary-300 hover:text-primary-400 transition-colors">Flexible Packaging</Link></li>
              <li><Link to="/products#paper-core" className="text-secondary-300 hover:text-primary-400 transition-colors">Paper Core</Link></li>
              <li><Link to="/products#biomass" className="text-secondary-300 hover:text-primary-400 transition-colors">Biomass Solutions</Link></li>
              <li><Link to="/products#plastics" className="text-secondary-300 hover:text-primary-400 transition-colors">Plastics</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400 text-sm">
          <p>© 2025 Allure Impex. All rights reserved. | Where You Find Solutions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;