# Zoho Mail Setup for Mvono Consultants

This guide explains how to properly configure the email functionality for your sales@mvonoconsultants.com email address hosted on Zoho Mail.

## Current Configuration

The system is set up to use your Zoho Mail account (sales@mvonoconsultants.com) for receiving contact form submissions. The configuration uses the following settings:

```
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=sales@mvonoconsultants.com
EMAIL_PASS=your-zoho-email-password
EMAIL_FROM=sales@mvonoconsultants.com
```

## How to Complete Setup

1. **Update the Email Password**:
   - Edit the `.env.local` file in the root directory
   - Replace `your-zoho-email-password` with your actual Zoho Mail password
   - Save the file
   - Restart the development server with `npm run dev`

2. **Test Your Configuration**:
   - Run the test script to verify your Zoho credentials:
     ```bash
     node test-email.js
     ```
   - If the test passes, you'll receive a confirmation email at your sales@mvonoconsultants.com address
   - If it fails, follow the troubleshooting steps in the error message

3. **Zoho-Specific Settings**:
   - For Zoho Mail, you need to ensure that:
     - You're using your primary Zoho password (not an app-specific password)
     - SMTP access is enabled for your Zoho account
     - Your account doesn't have two-factor authentication (or you've set up app passwords)

4. **Alternative Zoho Settings (if needed)**:
   If the primary settings don't work, try these alternative settings in your `.env.local` file:
   ```
   EMAIL_HOST=smtp.zoho.in  (or smtp.zoho.eu depending on your region)
   EMAIL_PORT=465
   EMAIL_SECURE=true
   ```

## Enabling SMTP in Zoho Mail

1. **Log in to your Zoho Mail account** at https://mail.zoho.com

2. **Access Email Settings**:
   - Click on the gear icon (⚙️) in the top-right corner
   - Select "Email Settings"

3. **Enable SMTP Access**:
   - Go to "Mail Accounts" or "Accounts" section
   - Look for SMTP settings or access
   - Ensure SMTP access is enabled for your account

4. **If You're Using Two-Factor Authentication**:
   - You'll need to generate an App Password
   - Go to "Account" > "Security" or "Two-Factor Authentication"
   - Create a new App Password for "Other Application"
   - Use this App Password in your `.env.local` file instead of your regular password

## Comprehensive Troubleshooting

If you're experiencing issues with Zoho email:

### 1. Authentication Issues

- **Error: "Invalid login credentials"**
  - Verify your username and password are correct
  - Try logging in to Zoho Mail web interface with the same credentials
  - Check for special characters in your password that might need escaping

- **Error: "Authentication failed"**
  - Your account might have security restrictions
  - Check if you need to generate an app password: Control Panel > My Account > Security > App Passwords
  - You might need to allow "less secure apps" in your Zoho settings

### 2. Connection Issues

- **Error: "Connection refused" or "Connection timeout"**
  - Try changing the port: Switch from 587 to 465 (and set EMAIL_SECURE=true)
  - Try alternative hosts: smtp.zoho.eu or smtp.zoho.in
  - Check if your network/firewall is blocking outgoing SMTP traffic
  - Try testing from a different network (mobile hotspot)

- **TLS/SSL Issues**
  - Some older servers may have SSL certificate issues
  - In development only, you can set `rejectUnauthorized: false` in the TLS options

### 3. Rate Limiting & Policies

- **Error: "Sending rate exceeded"**
  - Zoho may have sending limits on your account
  - Space out your email sending (don't send bulk emails)
  - Contact Zoho support to increase limits if needed

- **Error: "Message rejected"**
  - Your email might be flagged as spam
  - Ensure you're not using spam-trigger words
  - Add proper SPF and DKIM records for your domain

### 4. Testing from the Command Line

When running the `test-email.js` script:

- Look for detailed error messages that identify the specific issue
- Try running with alternative settings by temporarily editing the script
- Check the Zoho Mail inbox for any security alerts or notifications

## Alternative Solutions

If you continue experiencing issues with Zoho Mail:

1. **Use the Web API** instead of SMTP:
   - Zoho provides a REST API for mail sending
   - This can bypass some SMTP restrictions
   - See: https://www.zoho.com/mail/help/api/

2. **Third-party Email Services**:
   - SendGrid (100 free emails/day) - Very reliable
   - Mailgun (5,000 free emails/month) - Developer-friendly
   - Resend.com (100 free emails/day) - Simple API
   - Formspree.io - Form submission service with email notifications

3. **Server-side Form Handling**:
   - Use serverless functions (Vercel, Netlify) to handle form submissions
   - Store submissions in a database instead of relying on email

## Security Notes

- Keep your `.env.local` file secure and never commit it to version control
- Regularly update your Zoho Mail password for security
- Consider using environment variables in your hosting platform instead of a physical file
- Use HTTPS for your website to protect form submissions

## Production Deployment Considerations

When deploying to production:
1. Set your environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Test email sending in the production environment
3. Set up proper error monitoring to catch any email sending failures
4. Consider adding form submission rate limiting to prevent abuse

## Need Additional Help?

If you continue experiencing issues, you can:
- Contact Zoho Mail support directly at support@zohomail.com
- Check Zoho Mail documentation for SMTP settings at https://www.zoho.com/mail/help/
- Consider an alternative solution for form handling
