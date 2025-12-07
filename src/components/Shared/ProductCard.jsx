import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ 
  product, 
  showCategory = false,
  className = '' 
}) => {
  const { 
    id, 
    title, 
    description, 
    image, 
    category, 
    isPopular = false,
    link = `/products#${id}`
  } = product;

  return (
    <div className={`card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-secondary-100 ${className}`}>
      <Link to={link} className="block">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {isPopular && (
            <div className="absolute top-4 right-4 bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
              Popular
            </div>
          )}
          {showCategory && category && (
            <div className="absolute top-4 left-4 bg-white/90 text-secondary-800 text-xs font-medium px-2 py-1 rounded">
              {category}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
              {getIconForCategory(category)}
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-secondary-600 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-primary-500 font-medium">Learn More</span>
            <i className="fas fa-arrow-right text-primary-500"></i>
          </div>
        </div>
      </Link>
    </div>
  );
};

const getIconForCategory = (category) => {
  switch(category) {
    case 'corrugated':
      return <i className="fas fa-box"></i>;
    case 'flexible':
      return <i className="fas fa-layer-group"></i>;
    case 'paper-core':
      return <i className="fas fa-archive"></i>;
    case 'biomass':
      return <i className="fas fa-leaf"></i>;
    case 'plastics':
      return <i className="fas fa-industry"></i>;
    default:
      return <i className="fas fa-cube"></i>;
  }
};

export default ProductCard;