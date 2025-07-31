/**
 * Enhanced Contact Form with Analytics Tracking
 * Add this to your contact form components
 */

'use client';

import { useState } from 'react';
import { trackContactFormSubmit, trackEvent } from '../../utils/analytics';

const EnhancedContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track form submission start
      trackEvent('contact_form_start', {
        category: 'lead_generation',
        label: 'contact_page'
      });
      
      // Your existing form submission logic here
      // Replace this with your actual form handling
      
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track successful submission
      trackContactFormSubmit('contact_page');
      
      // Track which service was selected
      if (formData.service) {
        trackEvent('service_interest', {
          category: 'lead_generation',
          label: formData.service,
          value: 1
        });
      }
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track form submission error
      trackEvent('contact_form_error', {
        category: 'form_errors',
        label: error.message || 'unknown_error'
      });
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 hover:bg-white"
            placeholder="First name"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 hover:bg-white"
            placeholder="Last name"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 hover:bg-white"
          placeholder="your@email.com"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 hover:bg-white"
          placeholder="+254 XXX XXX XXX"
        />
      </div>
      
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
          Service of Interest
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 hover:bg-white"
        >
          <option value="">Select a service</option>
          <option value="environmental-impact-assessment">Environmental Impact Assessment</option>
          <option value="occupational-safety">Occupational Safety</option>
          <option value="fire-safety-audit">Fire Safety Audit</option>
          <option value="energy-audit">Energy Audit</option>
          <option value="statutory-inspection">Statutory Inspection</option>
          <option value="non-destructive-testing">Non-Destructive Testing</option>
          <option value="fire-safety-training">Fire Safety Training</option>
          <option value="first-aid-training">First Aid Training</option>
          <option value="multiple-services">Multiple Services</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 hover:bg-white"
          placeholder="Tell us about your project requirements..."
        />
      </div>
      
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <p className="font-medium">Thank you for your message!</p>
          <p className="text-sm">We'll get back to you within 24 hours during business days.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-medium">Sorry, there was an error sending your message.</p>
          <p className="text-sm">Please try again or contact us directly at sales@mvonoconsultants.com</p>
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-900 hover:bg-primary-800 disabled:bg-primary-400 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default EnhancedContactForm;