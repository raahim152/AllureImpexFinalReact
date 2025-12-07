import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import BackToTop from '../components/Shared/BackToTop';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-secondary-900 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}
        >
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        <div className="relative container mx-auto px-4 max-w-7xl z-10">
          <div className="max-w-3xl text-white animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">Trusted Global Sourcing Partner</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
              Where You Find <span className="text-primary-400">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl animate-slide-up" style={{animationDelay: '0.2s'}}>
              Connecting manufacturers and buyers with reliable, sustainable sourcing solutions worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Button 
                variant="primary" 
                size="lg" 
                icon={<i className="fas fa-arrow-right"></i>}
                as={Link}
                to="/products"
              >
                Explore Products
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                icon={<i className="fas fa-phone"></i>}
                as={Link}
                to="/contact"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#stats" className="text-white/70 hover:text-white transition-colors">
            <i className="fas fa-chevron-down text-2xl"></i>
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-secondary-700 font-medium">Happy Clients</div>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-secondary-700 font-medium">Years Experience</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">5+</div>
              <div className="text-secondary-700 font-medium">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Trusted Global <span className="text-primary-500">Sourcing Partner</span>
              </h2>
              <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
                Allure Impex bridges the gap between trusted manufacturers and buyers worldwide. 
                With our extensive network and deep industry expertise, we specialize in delivering 
                high-quality corrugated packaging, flexible products, paper cores, plastics, and 
                sustainable biomass solutions.
              </p>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Our mission is to create lasting partnerships built on reliability, quality, and 
                innovation, ensuring that every sourcing challenge becomes an opportunity for growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-primary-500 mr-2"></i>
                  <span className="text-secondary-700 font-medium">Quality Assurance</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-primary-500 mr-2"></i>
                  <span className="text-secondary-700 font-medium">Timely Delivery</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-primary-500 mr-2"></i>
                  <span className="text-secondary-700 font-medium">Competitive Pricing</span>
                </div>
              </div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Our team at work" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-primary-500/10"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Our Dedicated Team</h3>
                  <p className="text-white/90">Working tirelessly to deliver the best solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Overview Section */}
      <section id="products" className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Product <span className="text-primary-500">Categories</span>
            </h2>
            <p className="text-lg text-secondary-600">
              We offer a comprehensive range of high-quality products to meet diverse industrial needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Corrugated */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-secondary-100">
              <Link to="/products#corrugated" className="block">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Corrugated packaging solutions" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Popular
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                      <i className="fas fa-box"></i>
                    </div>
                    <h3 className="text-xl font-semibold">Corrugated Packaging</h3>
                  </div>
                  <p className="text-secondary-600 mb-4">High-quality corrugated packaging solutions for secure shipping and storage.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-500 font-medium">Learn More</span>
                    <i className="fas fa-arrow-right text-primary-500"></i>
                  </div>
                </div>
              </Link>
            </div>

            {/* Flexible */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-secondary-100">
              <Link to="/products#flexible" className="block">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Flexible packaging materials" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                      <i className="fas fa-layer-group"></i>
                    </div>
                    <h3 className="text-xl font-semibold">Flexible Packaging</h3>
                  </div>
                  <p className="text-secondary-600 mb-4">Versatile flexible packaging materials for various industrial applications.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-500 font-medium">Learn More</span>
                    <i className="fas fa-arrow-right text-primary-500"></i>
                  </div>
                </div>
              </Link>
            </div>

            {/* Paper Core */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-secondary-100">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Paper core tubes and cylinders" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                    <i className="fas fa-archive"></i>
                  </div>
                  <h3 className="text-xl font-semibold">Paper Core</h3>
                </div>
                <p className="text-secondary-600 mb-4">Durable paper core tubes and cylinders for industrial manufacturing needs.</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-500 font-medium">Learn More</span>
                  <i className="fas fa-arrow-right text-primary-500"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="lg" 
              icon={<i className="fas fa-arrow-right"></i>}
              as={Link}
              to="/products"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Contact us today and let's discuss how we can provide the perfect solutions for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              icon={<i className="fas fa-envelope"></i>}
              as={Link}
              to="/contact"
            >
              Send Message
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              icon={<i className="fas fa-phone"></i>}
              as="a"
              href="tel:+923008403618"
            >
              Call Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;