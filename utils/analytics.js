/**
 * Enhanced Google Analytics Configuration
 * Adds conversion tracking for lead generation events
 */

// Enhanced GA4 Event Tracking Functions
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
  }
};

// Lead Generation Events
export const trackContactFormSubmit = (formType = 'contact') => {
  trackEvent('contact_form_submit', {
    category: 'lead_generation',
    label: formType,
    value: 1
  });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    category: 'lead_generation',
    label: 'phone_number',
    value: 1
  });
};

export const trackEmailClick = () => {
  trackEvent('email_click', {
    category: 'lead_generation',
    label: 'email_address',
    value: 1
  });
};

export const trackCompanyProfileDownload = () => {
  trackEvent('company_profile_download', {
    category: 'lead_generation',
    label: 'pdf_download',
    value: 1
  });
};

export const trackServiceInquiry = (serviceName) => {
  trackEvent('service_inquiry', {
    category: 'lead_generation',
    label: serviceName,
    value: 1
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    category: 'lead_generation',
    label: 'whatsapp_chat',
    value: 1
  });
};

// Page Engagement Events
export const trackPageView = (pageTitle, pagePath) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-MVNC2024KE', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath
    });
  }
};

export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', {
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage
  });
};

export const trackTimeOnPage = (seconds) => {
  trackEvent('time_on_page', {
    category: 'engagement',
    label: 'duration',
    value: seconds
  });
};

// Service-specific tracking
export const trackServicePageView = (serviceName) => {
  trackEvent('service_page_view', {
    category: 'service_interest',
    label: serviceName,
    value: 1
  });
};

export const trackServiceCTAClick = (serviceName, ctaType) => {
  trackEvent('service_cta_click', {
    category: 'service_interest',
    label: `${serviceName}_${ctaType}`,
    value: 1
  });
};
