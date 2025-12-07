import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import { teamMembers } from '../utils/productsData';
import BackToTop from '../components/Shared/BackToTop';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-secondary-900 font-sans">
      <Header />
      
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-r from-primary-500 to-primary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <nav className="flex items-center space-x-2 text-sm text-white/80 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span><i className="fas fa-chevron-right text-xs"></i></span>
              <span className="text-white">About Us</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">Our Story</h1>
            <p className="text-xl text-white/90 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
              For over 5 years, we've been connecting manufacturers and buyers with reliable, sustainable sourcing solutions worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Mission & <span className="text-primary-500">Vision</span>
              </h2>
              <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
                At Allure Impex, our mission is to bridge the gap between trusted manufacturers and buyers worldwide. 
                We are committed to delivering high-quality products and sustainable sourcing solutions that drive 
                business growth and create lasting partnerships.
              </p>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Our vision is to become the most trusted global sourcing partner, recognized for our reliability, 
                innovation, and commitment to excellence in every aspect of our operations.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl">
                  <i className="fas fa-bullseye"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Our Purpose</h3>
                  <p className="text-secondary-600">To transform sourcing challenges into opportunities for growth.</p>
                </div>
              </div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Our team discussing strategy" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-primary-500/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core <span className="text-primary-500">Values</span>
            </h2>
            <p className="text-lg text-secondary-600">
              These principles guide everything we do and form the foundation of our relationships with clients and partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'fas fa-handshake', title: 'Integrity', description: 'We conduct business with honesty, transparency, and ethical practices. Our word is our bond, and we build relationships based on trust.' },
              { icon: 'fas fa-award', title: 'Quality', description: 'We never compromise on quality. From product selection to delivery, we maintain the highest standards to ensure client satisfaction.' },
              { icon: 'fas fa-lightbulb', title: 'Innovation', description: 'We continuously seek innovative solutions to meet evolving market demands and help our clients stay ahead of the competition.' },
              { icon: 'fas fa-users', title: 'Partnership', description: 'We view our clients as long-term partners. Their success is our success, and we work collaboratively to achieve mutual goals.' },
              { icon: 'fas fa-leaf', title: 'Sustainability', description: 'We are committed to environmentally responsible practices and promoting sustainable solutions across our product portfolio.' },
              { icon: 'fas fa-rocket', title: 'Excellence', description: 'We strive for excellence in every aspect of our operations, from customer service to supply chain management.' },
            ].map((value, index) => (
              <div key={index} className="card-hover bg-white rounded-2xl p-8 shadow-md border border-secondary-100">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl mb-6">
                  <i className={value.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-800 to-secondary-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="text-primary-400">Leadership</span>
            </h2>
            <p className="text-lg text-secondary-300">
              Our experienced leadership team brings decades of industry knowledge and a shared commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card-hover bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
                <div className="p-6">
                  <div className="w-24 h-24 rounded-full bg-primary-500/20 mx-auto mb-6 flex items-center justify-center text-3xl text-primary-400">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                  <p className="text-primary-400 text-center mb-4">{member.position}</p>
                  <p className="text-secondary-300 text-center">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="lg" 
              icon={<i className="fas fa-arrow-right"></i>}
              as={Link}
              to="/contact"
            >
              Connect With Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-primary-500">Allure Impex</span>
              </h2>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                With decades of experience and a commitment to excellence, we stand out as your trusted sourcing partner.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: 'fas fa-globe', title: 'Global Network', description: 'We have established relationships with manufacturers across multiple continents, giving you access to diverse markets and products.' },
                  { icon: 'fas fa-shield-alt', title: 'Quality Assurance', description: 'Our rigorous quality control processes ensure that every product meets the highest standards before reaching our clients.' },
                  { icon: 'fas fa-hand-holding-usd', title: 'Competitive Pricing', description: 'Our extensive network and efficient operations allow us to offer competitive pricing without compromising on quality.' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mt-1 flex-shrink-0">
                      <i className={item.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-secondary-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Our team collaborating" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-primary-500/10"></div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">25+</div>
                  <div className="text-sm text-secondary-600">Years Experience</div>
                </div>
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">50+</div>
                  <div className="text-sm text-secondary-600">Happy Clients</div>
                </div>
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">10+</div>
                  <div className="text-sm text-secondary-600">Cities Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Let's discuss how we can help you find the perfect sourcing solutions for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              icon={<i className="fas fa-arrow-right"></i>}
              as={Link}
              to="/contact"
            >
              Contact Us Today
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              icon={<i className="fas fa-box-open"></i>}
              as={Link}
              to="/products"
            >
              Explore Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default About;