# Email Integration Guide

This guide explains how the contact form email functionality works and how to set it up for your Mvono Consultants website.

## What's Been Implemented

1. **Contact Form**: Updated the existing contact form to send data to the backend API
2. **API Endpoint**: Created an API route at `/api/contact/route.js` to process form submissions
3. **Email Sending**: Used Nodemailer to send emails to `sales@mvonoconsultants.com`
4. **Error Handling**: Added proper validation and error handling
5. **User Feedback**: Enhanced the UI to show submission status and error messages

## How It Works

1. A user fills out the contact form on your website
2. The form data is sent to the `/api/contact` endpoint via a POST request
3. The server validates the input and creates an email using Nodemailer
4. The email is sent to `sales@mvonoconsultants.com` with all the form details
5. The user receives visual feedback about whether the submission succeeded or failed

## Setup Instructions

### 1. Install Dependencies

First, install the required dependencies:

```bash
npm install nodemailer
```

### 2. Set Up Email Credentials

You need to set up email credentials to allow the application to send emails:

1. Copy the `.env.example` file to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your actual email credentials.

   > **Using Gmail**
   > 
   > If you're using Gmail, you need to create an App Password:
   > 1. Enable 2-Step Verification on your Google Account
   > 2. Go to https://myaccount.google.com/apppasswords
   > 3. Select 'Mail' and 'Other' (Custom name), name it 'Mvono Website'
   > 4. Copy the generated 16-character password and use it for EMAIL_PASS

   > **Using Another Email Provider**
   >
   > If you're using another email provider, you'll need to provide their SMTP settings:
   > - EMAIL_HOST: Your email provider's SMTP server address
   > - EMAIL_PORT: The port number (usually 587 or 465)
   > - EMAIL_SECURE: Set to 'true' if using port 465, 'false' if using port 587
   > - EMAIL_USER: Your email address
   > - EMAIL_PASS: Your email password or app-specific password
   > - EMAIL_FROM: Email address to show as sender

### 3. Test the Implementation

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Go to the Contact page and submit a test form
3. Check if you receive the email at `sales@mvonoconsultants.com`
4. Verify that success/error messages display correctly

## Security Considerations

- **Never commit your .env file** to version control
- Always validate input data to prevent email injection attacks
- Consider rate limiting form submissions to prevent spam
- Check for suspicious patterns like multiple submissions from the same IP

## Troubleshooting

### Email Not Sending

If emails aren't being sent:

1. Check console logs for error messages (run with `npm run dev`)
2. Verify email credentials are correct in .env file
3. Ensure your email provider allows SMTP access
4. Try a different email provider if needed (SendGrid, Mailgun, etc.)

### Receiving Errors

Common errors:

- **Authentication failure**: Check your email and password
- **Connection refused**: Check EMAIL_HOST and EMAIL_PORT settings
- **Rate limiting**: Some providers limit email sending - try again later

## Alternative Email Services

If you need more robust email delivery, consider:

- **SendGrid**: Good for high-volume sending
- **Mailgun**: Offers a generous free tier
- **Amazon SES**: Extremely affordable for high volumes

## Next Steps

For production deployment:

1. Make sure your .env variables are set in your hosting environment
2. Consider adding CAPTCHA to prevent spam submissions
3. Consider setting up email templates for more professional-looking emails
