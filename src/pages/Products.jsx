import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import ContactForm from '../components/Shared/ContactForm';
import { products } from '../utils/productsData';
import BackToTop from '../components/Shared/BackToTop';
import productService from '../services/productService';
import uploadService from '../services/uploadService';
import { toast } from 'react-hot-toast';
import SearchBar from '../components/UI/SearchBar';

const Products = () => {
   const [databaseProducts, setDatabaseProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    q: '',
    category: '',
    featured: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Fetch database products on component mount
  useEffect(() => {
    fetchDatabaseProducts();
  }, []);

  const fetchDatabaseProducts = async () => {
    try {
      setLoading(true);
      // Build query string from searchParams
      const queryString = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryString.append(key, value);
      });
      
      const response = await productService.getProducts(`?${queryString.toString()}`);
      setDatabaseProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (searchValue, filters = {}) => {
    setSearchParams(prev => ({
      ...prev,
      q: searchValue,
      ...filters
    }));
  };

  // Smooth scroll to section when page loads with hash
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to get category display name
  const getCategoryDisplayName = (category) => {
    switch(category) {
      case 'corrugated': return 'Corrugated Packaging';
      case 'flexible': return 'Flexible Packaging';
      case 'paper-core': return 'Paper Core';
      case 'biomass': return 'Biomass Solutions';
      case 'plastics': return 'Plastics';
      default: return category;
    }
  };

  // Helper to get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'corrugated': return 'fas fa-box';
      case 'flexible': return 'fas fa-layer-group';
      case 'paper-core': return 'fas fa-archive';
      case 'biomass': return 'fas fa-leaf';
      case 'plastics': return 'fas fa-industry';
      default: return 'fas fa-cube';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-secondary-900 font-sans">
      <Header />
      
      {/* Product Hero Section - KEEP ORIGINAL */}
      <section className="relative py-20 bg-gradient-to-r from-primary-500 to-primary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our <span className="text-secondary-900">Products</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl">
              Discover our comprehensive range of high-quality industrial solutions designed to meet your specific needs.
            </p>
            <div className="flex flex-wrap gap-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => scrollToSection(product.id)}
                  className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg transition-all inline-flex items-center font-medium"
                >
                  {product.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

       {/* ... Your existing hero section ... */}

{/* Add SearchBar here */}
<section className="py-8 bg-white">
  <div className="container mx-auto px-4 max-w-7xl">
    <SearchBar 
      onSearch={handleSearch}
      showFilters={true}
      placeholder="Search products by name, description, category..."
    />
  </div>
</section>

      {/* NEW SECTION: Database Products (Add at the top) */}
      {databaseProducts.length > 0 && (
        <section className="py-16 bg-secondary-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Available <span className="text-primary-500">Products</span>
              </h2>
              <p className="text-lg text-secondary-600">
                Browse our current inventory of products ready for order.
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {databaseProducts.map((product) => (
                  <div key={product._id} className="bg-white rounded-xl shadow-md border border-secondary-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={uploadService.getProductImageUrl(product.images[0].url)} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                          <i className="fas fa-box text-3xl text-primary-300"></i>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3 flex-shrink-0">
                          <i className={getCategoryIcon(product.category)}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-secondary-900">{product.name}</h3>
                          <p className="text-sm text-primary-600">{getCategoryDisplayName(product.category)}</p>
                        </div>
                      </div>
                      <p className="text-secondary-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center"
                      >
                        Request Quote <i className="fas fa-arrow-right ml-2 text-xs"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {databaseProducts.length > 0 && (
              <div className="text-center mt-8">
                <p className="text-sm text-secondary-500">
                  Showing {databaseProducts.length} product{databaseProducts.length !== 1 ? 's' : ''} from our inventory
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* KEEP ORIGINAL Products Section - DO NOT CHANGE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {products.map((product, index) => (
            <div key={product.id} id={product.id} className="mb-24 scroll-mt-24">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className={`animate-fade-in ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="inline-flex items-center bg-primary-100 text-primary-700 rounded-full px-4 py-2 mb-4">
                    {getProductIcon(product.category)}
                    <span className="text-sm font-medium ml-2">
                      {getProductCategoryLabel(product.category)}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {product.title.split(' ')[0]} <span className="text-primary-500">{product.title.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="space-y-4 mb-8">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <i className="fas fa-check-circle text-primary-500 mt-1 mr-3"></i>
                        <div>
                          <h4 className="font-semibold text-secondary-800">{feature}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    icon={<i className="fas fa-arrow-right"></i>}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Request Quote
                  </Button>
                </div>
                <div className={`animate-fade-in ${index % 2 === 1 ? 'lg:order-1' : ''}`} style={{animationDelay: '0.3s'}}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl product-card">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-96 object-cover product-image"
                    />
                    <div className="absolute inset-0 bg-primary-500/10"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.subcategories.map((subcat, idx) => (
                  <div key={idx} className="bg-secondary-50 rounded-2xl p-6 card-hover">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                      <i className={subcat.icon}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{subcat.title}</h3>
                    <p className="text-secondary-600">{subcat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KEEP ORIGINAL CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your <span className="text-secondary-900">Solution?</span>
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and discover how our products can meet your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              icon={<i className="fas fa-phone"></i>}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              icon={<i className="fas fa-home"></i>}
              as={Link}
              to="/"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      {/* KEEP ORIGINAL Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-secondary-800 to-secondary-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Get In <span className="text-primary-400">Touch</span>
            </h2>
            <p className="text-lg text-secondary-300 text-center mb-16 max-w-2xl mx-auto">
              Ready to discuss your requirements? Our team is here to help you find the perfect solution.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Phone</p>
                      <p className="text-secondary-300">+92 300 8403618</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Email</p>
                      <p className="text-secondary-300">Zcslhr@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Address</p>
                      <p className="text-secondary-300">
                        Overseas B Extension <br />
                        Bahria Town<br />
                        Lahore, 05499
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <ContactForm darkMode={true} showProductInterest={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

// KEEP ORIGINAL Helper functions
const getProductIcon = (category) => {
  switch(category) {
    case 'corrugated': return <i className="fas fa-box"></i>;
    case 'flexible': return <i className="fas fa-layer-group"></i>;
    case 'paper-core': return <i className="fas fa-archive"></i>;
    case 'biomass': return <i className="fas fa-leaf"></i>;
    case 'plastics': return <i className="fas fa-industry"></i>;
    default: return <i className="fas fa-cube"></i>;
  }
};

const getProductCategoryLabel = (category) => {
  switch(category) {
    case 'corrugated': return 'Packaging Solutions';
    case 'flexible': return 'Versatile Solutions';
    case 'paper-core': return 'Industrial Solutions';
    case 'biomass': return 'Sustainable Energy';
    case 'plastics': return 'Material Solutions';
    default: return 'Product Category';
  }
};

export default Products;