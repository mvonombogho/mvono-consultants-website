// test-email.js
// A simple script to test your Zoho email configuration
// Run with: node test-email.js

require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function testZohoEmail() {
  console.log('===== ZOHO EMAIL TEST SCRIPT =====');
  console.log('Testing your Zoho email configuration...\n');

  // Check for required environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ ERROR: Missing email credentials');
    console.error('Please set EMAIL_USER and EMAIL_PASS in your .env.local file');
    process.exit(1);
  }

  console.log('📧 Email Configuration:');
  console.log(`Host: ${process.env.EMAIL_HOST || 'smtp.zoho.com'}`);
  console.log(`Port: ${process.env.EMAIL_PORT || '587'}`);
  console.log(`Secure: ${process.env.EMAIL_SECURE === 'true' ? 'Yes' : 'No'}`);
  console.log(`User: ${process.env.EMAIL_USER}`);
  console.log(`From: ${process.env.EMAIL_FROM || process.env.EMAIL_USER}`);
  console.log(`Password: ${process.env.EMAIL_PASS ? '******** (Set)' : 'Not set'}\n`);

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Additional settings for Zoho
    requireTLS: true,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false // Only for testing
    },
    debug: true
  });

  try {
    console.log('🔄 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    console.log('🔄 Sending test email...');
    const info = await transporter.sendMail({
      from: `"Email Test Script" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Mvono Consultants - Email Test",
      text: "This is a test email to verify your Zoho mail configuration for Mvono Consultants website.",
      html: `
        <h2>Email Test Successful</h2>
        <p>This test email confirms that your Zoho mail configuration for the Mvono Consultants website is working correctly.</p>
        <p><strong>Date/Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><em>This is an automated message. No action is required.</em></p>
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`\nCheck your inbox at ${process.env.EMAIL_USER} to confirm receipt.`);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('\n🔐 AUTHENTICATION PROBLEM:');
      console.error('- Double-check your email and password');
      console.error('- Make sure you\'re using the correct password (not app-specific)');
      console.error('- Verify that SMTP access is enabled for your Zoho account');
    } else if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
      console.error('\n🌐 CONNECTION PROBLEM:');
      console.error('- Check your internet connection');
      console.error('- Verify the EMAIL_HOST and EMAIL_PORT settings');
      console.error('- Some networks might block SMTP connections');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('\n⏱️ TIMEOUT PROBLEM:');
      console.error('- The connection to the mail server timed out');
      console.error('- Try an alternative port (465 with EMAIL_SECURE=true)');
      console.error('- Your network might be blocking or throttling SMTP connections');
    }
    
    console.error('\n🔍 ALTERNATIVE SETTINGS TO TRY:');
    console.error('Option 1: EMAIL_PORT=465, EMAIL_SECURE=true');
    console.error('Option 2: Use smtp.zoho.eu or smtp.zoho.in instead of smtp.zoho.com');
    
    process.exit(1);
  }
}

testZohoEmail();
