import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import ContactForm from '../components/Shared/ContactForm';
import BackToTop from '../components/Shared/BackToTop';

const Contact = () => {
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
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span><i className="fas fa-chevron-right text-xs"></i></span>
              <span className="text-white">Contact Us</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">Get In Touch</h1>
            <p className="text-xl text-white/90 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
              Ready to discuss your requirements? Our team is here to help you find the perfect solution for your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Contact <span className="text-primary-500">Information</span>
            </h2>
            <p className="text-lg text-secondary-600">
              Reach out to us through any of the following channels. We're always ready to assist you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card-hover bg-secondary-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl mx-auto mb-6">
                <i className="fas fa-phone"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Phone</h3>
              <p className="text-secondary-600 mb-2">+92 300 8403618</p>
              <p className="text-sm text-secondary-500">Mon-Fri, 9:00 AM - 6:00 PM</p>
            </div>
            
            <div className="card-hover bg-secondary-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl mx-auto mb-6">
                <i className="fas fa-envelope"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Email</h3>
              <p className="text-secondary-600 mb-2">Zcslhr@gmail.com</p>
              <p className="text-sm text-secondary-500">We'll respond within 24 hours</p>
            </div>
            
            <div className="card-hover bg-secondary-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl mx-auto mb-6">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Address</h3>
              <p className="text-secondary-600 mb-2">
                Overseas B Extension<br />
                Bahria Town<br />
                Lahore, 05499
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section id="contact-form" className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Send Us a <span className="text-primary-500">Message</span>
              </h2>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Have questions about our products or services? Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              <ContactForm darkMode={false} showProductInterest={true} />
            </div>
            
            {/* Map & Additional Info */}
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-8">
                <div className="h-80 bg-secondary-200 flex items-center justify-center">
                  <div className="text-center text-secondary-500">
                    <i className="fas fa-map-marked-alt text-4xl mb-4"></i>
                    <p>Interactive Map Location</p>
                    <p className="text-sm mt-2">Overseas B Extension, Bahria Town, Lahore</p>
                  </div>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fas fa-clock text-primary-500 mr-3"></i>
                  Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
              
              {/* Emergency Contact */}
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-200">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fas fa-exclamation-circle text-primary-600 mr-3"></i>
                  Urgent Inquiries
                </h3>
                <p className="text-secondary-600 mb-4">
                  For urgent matters outside business hours, please call our emergency line:
                </p>
                <div className="flex items-center justify-center bg-white rounded-lg p-4 border border-primary-300">
                  <i className="fas fa-phone text-primary-500 mr-3"></i>
                  <span className="font-semibold text-lg">+92 300 8403618</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-primary-500">Questions</span>
            </h2>
            <p className="text-lg text-secondary-600">
              Find quick answers to common questions about our products and services.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: 'What is your typical response time for inquiries?',
                answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling us directly.'
              },
              {
                question: 'Do you offer custom product solutions?',
                answer: 'Yes, we specialize in custom solutions tailored to your specific requirements. Please provide detailed specifications in your inquiry.'
              },
              {
                question: 'What are your shipping and delivery options?',
                answer: 'We offer various shipping options depending on your location and requirements. Delivery timelines and costs will be provided with your quote.'
              },
              {
                question: 'Can I request samples before placing an order?',
                answer: 'Absolutely! We provide samples for most of our products. Please specify your sample requirements in your message.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-secondary-50 rounded-2xl p-6 card-hover">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fas fa-question-circle text-primary-500 mr-3"></i>
                  {faq.question}
                </h3>
                <p className="text-secondary-600">{faq.answer}</p>
              </div>
            ))}
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
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
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

export default Contact;