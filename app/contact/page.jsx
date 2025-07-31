'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Script from 'next/script';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import MetaTags from '../../components/MetaTags';
import { gradients, colorSchemes } from '../../utils/colors';
import emailjs from '@emailjs/browser';

// EmailJS configuration with correct values
// IMPORTANT: Make sure these match exactly with your EmailJS account
const EMAILJS_SERVICE_ID = "service_mrlpiud"; // SMTP service
const EMAILJS_TEMPLATE_ID = "template_zpiu9yh"; // CORRECTED Template ID 
const EMAILJS_PUBLIC_KEY = "al8y9s50qXzE9pnPs"; // Correct public key

// Services list
const services = [
  'Occupational Safety',
  'Fire Safety Audit',
  'Energy Audit',
  'Statutory Inspection',
  'Non-Destructive Testing',
  'Fire Safety Training',
  'First Aider Training',
  'Other Services',
];

export default function Contact() {
  // Initialize EmailJS on component mount
  useEffect(() => {
    // This is critical - make sure to initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log("EmailJS initialized with public key:", EMAILJS_PUBLIC_KEY);
  }, []);

  const [formData, setFormData] = useState({
    from_name: '',          
    from_email: '',         
    phone: '',              
    company: '',            
    service: '',            
    message: '',           
    to_name: 'Mvono Consultants', 
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const successRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      console.log('Sending email via EmailJS...');
      console.log('Form data:', formData);
      console.log('Using service ID:', EMAILJS_SERVICE_ID);
      console.log('Using template ID:', EMAILJS_TEMPLATE_ID);
      
      // Try with the emailjs.sendForm method instead
      const response = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email sent successfully:', response);
      
      // Success
      setFormSubmitted(true);
      // Reset form
      setFormData({
        from_name: '',
        from_email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
        to_name: 'Mvono Consultants',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(true);
      setErrorMessage(`Error: ${error.text || error.message || 'There was an error sending your message. Please try again or contact us directly at sales@mvonoconsultants.com'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MetaTags
        title="Contact Us | Mvono Consultants - Get Expert Safety & Energy Consulting"
        description="Contact Mvono Consultants for professional safety, energy, and plant management services in Kenya and East Africa. Call +254 701 868 849 or email sales@mvonoconsultants.com for expert consultation."
        keywords="contact mvono consultants, safety consultants Kenya contact, energy audit consultation, occupational safety services, fire safety consulting Kenya, environmental impact assessment contact, DOSH compliance consultants"
        canonicalUrl="https://www.mvonoconsultants.com/contact"
        page="contact"
      />
      <main className="overflow-x-hidden bg-white">
      {/* Header */}
      <Navbar activePage="contact" />

      {/* Hero Section */}
      <section 
        className={`${gradients.heroGradient} text-white py-16 px-4 sm:px-6 pt-28`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            We're here to answer your questions and discuss how our services can benefit your business.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Send Us a Message</h2>
              
              {formSubmitted ? (
                <div 
                  ref={successRef}
                  className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6"
                >
                  <div className="flex items-center mb-4">
                    <CheckCircle className="text-green-500 mr-2" size={24} />
                    <h3 className="text-lg font-semibold text-green-800">Message Sent Successfully!</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    Thank you for contacting Mvono Consultants. We have received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="from_name" className="block text-sm font-medium text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="from_email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <input type="hidden" name="to_name" value="Mvono Consultants" />

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex items-start">
                        <AlertCircle className="text-red-500 mr-2 mt-0.5" size={16} />
                        <p className="text-sm text-red-700">
                          {errorMessage}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 ${colorSchemes.buttons.primary} font-medium rounded-md transition duration-300 flex items-center justify-center gap-2 w-full sm:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Contact Information</h2>
              
              <div className="bg-slate-50 rounded-lg p-6 mb-8 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="text-blue-600 mr-4 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-slate-900">Phone</h3>
                      <p className="text-slate-600">+254 701 868 849</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-blue-600 mr-4 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-slate-900">Email</h3>
                      <p className="text-slate-600">sales@mvonoconsultants.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-blue-600 mr-4 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-slate-900">Office Location</h3>
                      <p className="text-slate-600">Kiserian, Kajiado</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-slate-900">Business Hours</h3>
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-slate-700">Monday - Friday:</span>
                    <span className="font-medium text-slate-900">8:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-700">Saturday:</span>
                    <span className="font-medium text-slate-900">9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-700">Sunday:</span>
                    <span className="font-medium text-slate-900">Closed</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-slate-600">
                    For emergency assistance outside of business hours, please call our support line at +254 701 868 849.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Add ContactPage Schema */}
      <Script id="contact-page-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Mvono Consultants",
            "description": "Contact Mvono Consultants, a leading safety, energy, and plant management firm in Kenya. Get in touch with our team of experts today.",
            "url": "https://www.mvonoconsultants.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Mvono Consultants",
              "telephone": "+254 701 868 849",
              "email": "sales@mvonoconsultants.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kiserian",
                "addressRegion": "Kajiado County",
                "addressCountry": "Kenya"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday"],
                  "opens": "09:00",
                  "closes": "13:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Sunday"],
                  "opens": "00:00",
                  "closes": "00:00"
                }
              ]
            }
          }
        `}
      </Script>

      {/* Add BreadcrumbList Schema */}
      <Script id="breadcrumb-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.mvonoconsultants.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://www.mvonoconsultants.com/contact"
              }
            ]
          }
        `}
      </Script>
      </main>
    </>
  );
}
