/**
 * Tracked Contact Components
 * Use these components to automatically track contact interactions
 */

'use client';

import { trackPhoneClick, trackEmailClick, trackWhatsAppClick, trackEvent } from '../../utils/analytics';

// Phone Link Component with Tracking
export const TrackedPhoneLink = ({ 
  phoneNumber = "+254 701 868 849", 
  displayNumber = "+254 701 868 849",
  className = "text-primary-600 hover:text-primary-700 font-medium transition-colors",
  children 
}) => {
  const handlePhoneClick = () => {
    trackPhoneClick();
  };

  return (
    <a 
      href={`tel:${phoneNumber}`}
      onClick={handlePhoneClick}
      className={className}
    >
      {children || displayNumber}
    </a>
  );
};

// Email Link Component with Tracking
export const TrackedEmailLink = ({ 
  email = "sales@mvonoconsultants.com",
  subject = "Inquiry from Website",
  className = "text-primary-600 hover:text-primary-700 font-medium transition-colors",
  children 
}) => {
  const handleEmailClick = () => {
    trackEmailClick();
  };

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <a 
      href={mailtoLink}
      onClick={handleEmailClick}
      className={className}
    >
      {children || email}
    </a>
  );
};

// WhatsApp Link Component with Tracking
export const TrackedWhatsAppLink = ({ 
  phoneNumber = "254701868849", // Without + and spaces for WhatsApp
  message = "Hello! I'm interested in your safety consulting services.",
  className = "inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors",
  children 
}) => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
  };

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappLink}
      onClick={handleWhatsAppClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children || (
        <>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.503"/>
          </svg>
          WhatsApp
        </>
      )}
    </a>
  );
};

// Contact Card Component
export const TrackedContactCard = ({ 
  type = "phone", // "phone", "email", "whatsapp"
  icon,
  title,
  subtitle,
  value,
  className = ""
}) => {
  const getContactComponent = () => {
    switch (type) {
      case "phone":
        return (
          <TrackedPhoneLink 
            phoneNumber={value}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {value}
          </TrackedPhoneLink>
        );
      case "email":
        return (
          <TrackedEmailLink 
            email={value}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {value}
          </TrackedEmailLink>
        );
      case "whatsapp":
        return (
          <TrackedWhatsAppLink 
            phoneNumber={value.replace(/\D/g, '')} // Remove non-digits
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            {value}
          </TrackedWhatsAppLink>
        );
      default:
        return <span className="font-medium">{value}</span>;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 text-center border border-slate-200 hover:shadow-xl transition-shadow ${className}`}>
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      {subtitle && <p className="text-slate-600 mb-3">{subtitle}</p>}
      <div className="mt-2">
        {getContactComponent()}
      </div>
    </div>
  );
};

// Service CTA Button with Tracking
export const TrackedServiceCTA = ({ 
  serviceName,
  ctaType = "learn_more", // "learn_more", "contact", "quote"
  href = "/contact",
  className = "bg-primary-900 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-lg transition-colors",
  children
}) => {
  const handleCTAClick = () => {
    trackEvent('service_cta_click', {
      category: 'service_interest',
      label: `${serviceName}_${ctaType}`,
      value: 1
    });
  };

  return (
    <a 
      href={href}
      onClick={handleCTAClick}
      className={className}
    >
      {children || "Learn More"}
    </a>
  );
};