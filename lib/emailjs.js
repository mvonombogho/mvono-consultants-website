import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS configuration for the entire application
export const EMAILJS_PUBLIC_KEY = "al8y9s50qXzE9pnPs";  // Correct public key
export const EMAILJS_SERVICE_ID = "service_mrlpiud";     // SMTP service
export const EMAILJS_TEMPLATE_ID = "template_zpiu9yh";   // Corrected template ID

export function useEmailJSInit() {
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);
}

// Helper function for sending emails
export async function sendEmail(templateParams, templateId = EMAILJS_TEMPLATE_ID, serviceId = EMAILJS_SERVICE_ID) {
  try {
    const response = await emailjs.send(serviceId, templateId, templateParams);
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
}
