export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.json();
    const { name, email, phone, company, service, message } = formData;

    console.log('Received form data:', { name, email, phone, company, service });

    // Input validation
    if (!name || !email || !message) {
      console.log('Validation error: Missing required fields');
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Verify environment variables are loaded
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Environment variables missing: EMAIL_USER or EMAIL_PASS not set');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'Email credentials not properly configured' 
        },
        { status: 500 }
      );
    }

    // Configure email transporter for Zoho
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
        rejectUnauthorized: false // Only use in development - helps with self-signed certs
      },
      debug: true // Enable for detailed logs
    });

    console.log('Email configuration:', {
      host: process.env.EMAIL_HOST || 'smtp.zoho.com',
      port: process.env.EMAIL_PORT || '587',
      secure: process.env.EMAIL_SECURE === 'true',
      user: process.env.EMAIL_USER ? 'Set' : 'Not set',
      pass: process.env.EMAIL_PASS ? 'Set (Masked)' : 'Not set'
    });

    // Configure email content
    const mailOptions = {
      from: `"Mvono Consultants Website" <${process.env.EMAIL_FROM || 'sales@mvonoconsultants.com'}>`,
      to: process.env.EMAIL_USER || 'sales@mvonoconsultants.com',
      subject: `New Contact Form Submission: ${service || 'General Inquiry'}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Company: ${company || 'Not provided'}
        Service: ${service || 'Not specified'}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Try sending the email
    try {
      console.log('Attempting to send email via Zoho...');
      
      // Verify SMTP connection
      const verifyConnection = await transporter.verify();
      console.log('SMTP Connection verified:', verifyConnection);
      
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      
      // Return a success response
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully' 
      });
    } catch (emailError) {
      console.error('Error sending email through Zoho:', emailError);
      
      // Log more detailed error information for debugging
      if (emailError.code) {
        console.error('Error code:', emailError.code);
      }
      if (emailError.command) {
        console.error('SMTP command:', emailError.command);
      }
      
      // Try an alternative approach for development - log the form data
      console.log('Contact form submission (not emailed):', formData);
      
      // Prepare guidance based on error type
      let solution = 'Please verify your Zoho email credentials and settings.';
      let status = 500;
      
      if (emailError.code === 'EAUTH') {
        solution = 'Authentication failed. Please check your Zoho email and password.';
        status = 500;
      } else if (emailError.code === 'ESOCKET' || emailError.code === 'ECONNECTION') {
        solution = 'Could not connect to Zoho mail server. Please check your network and mail server settings.';
        status = 503;
      } else if (emailError.code === 'ETIMEDOUT') {
        solution = 'Connection to mail server timed out. Please try again later.';
        status = 504;
      }
      
      // Return an error response with details
      return NextResponse.json(
        { 
          error: 'Failed to send email', 
          details: emailError.message,
          code: emailError.code || 'unknown',
          solution,
          formData: 'Your form data has been logged and will be processed manually.'
        },
        { status }
      );
    }
  } catch (error) {
    console.error('Error in contact form processing:', error);
    
    return NextResponse.json(
      { error: 'Failed to process your message', details: error.message },
      { status: 500 }
    );
  }
}
