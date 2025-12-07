import React, { useState } from 'react';

const ContactForm = ({ darkMode = false, showProductInterest = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productInterest: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent successfully!');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      productInterest: '',
      subject: '',
      message: ''
    });
  };

  const formClasses = darkMode 
    ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
    : 'bg-white border border-secondary-100 text-secondary-900';

  const inputClasses = darkMode
    ? 'bg-white/10 border border-white/20 text-white placeholder-white/50'
    : 'bg-white border border-secondary-300 text-secondary-900 placeholder-secondary-500';

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 rounded-2xl p-6 md:p-8 shadow-md ${formClasses}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${inputClasses}`}
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${inputClasses}`}
            placeholder="Your Company"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${inputClasses}`}
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${inputClasses}`}
            placeholder="+92 300 1234567"
          />
        </div>
      </div>
      
      {showProductInterest && (
        <div>
          <label htmlFor="productInterest" className="block text-sm font-medium mb-2">
            Product Interest
          </label>
          <select
            id="productInterest"
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${inputClasses}`}
          >
            <option value="">Select a product category</option>
            <option value="corrugated">Corrugated Packaging</option>
            <option value="flexible">Flexible Packaging</option>
            <option value="paper-core">Paper Core</option>
            <option value="biomass">Biomass Solutions</option>
            <option value="plastics">Plastics</option>
            <option value="custom">Custom Solution</option>
          </select>
        </div>
      )}
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${inputClasses}`}
          placeholder="Brief subject of your inquiry"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${inputClasses}`}
          placeholder="Tell us about your requirements, specifications, or any questions you might have..."
        />
      </div>
      
      <button
        type="submit"
        className={`w-full ${
          darkMode 
            ? 'bg-primary-500 text-white hover:bg-primary-600' 
            : 'bg-primary-500 text-white hover:bg-primary-600'
        } text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium`}
      >
        Send Message <i className="fas fa-paper-plane ml-2"></i>
      </button>
    </form>
  );
};

export default ContactForm;