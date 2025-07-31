# Email Setup for Mvono Consultants

This guide explains how to properly configure the email functionality for your sales@mvonoconsultants.com email address.

## Current Configuration

The system is set up to use your business email (sales@mvonoconsultants.com) for receiving contact form submissions. The configuration uses the following settings:

```
EMAIL_HOST=mail.mvonoconsultants.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=sales@mvonoconsultants.com
EMAIL_PASS=your-email-password
EMAIL_FROM=sales@mvonoconsultants.com
```

## How to Complete Setup

1. **Update the Email Password**:
   - Edit the `.env` file in the root directory
   - Replace `your-email-password` with your actual email password
   - Save the file

2. **Find Your Correct SMTP Settings**:
   - Contact your email hosting provider (likely the same as your website hosting)
   - Ask for the SMTP server details for your sales@mvonoconsultants.com email
   - They should provide:
     - SMTP Server/Host name
     - SMTP Port
     - Whether SSL/TLS is required
     - Authentication requirements

3. **Update the SMTP Settings if Needed**:
   - Once you have the correct SMTP settings, update the `.env` file
   - Common hosting providers often use:
     - Host: mail.yourdomain.com or smtp.yourdomain.com 
     - Port: 587 (TLS) or 465 (SSL)
     - Secure: false for port 587, true for port 465

## Testing Your Setup

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```

2. **Test the Contact Form**:
   - Go to your contact page
   - Fill out the form with test data
   - Submit the form

3. **Check for Errors**:
   - If you see a success message, check your email inbox
   - If you see an error, check the console logs in your terminal

## Common SMTP Settings for Popular Hosting Providers

### cPanel Hosting (many shared hosting providers)
```
EMAIL_HOST=mail.mvonoconsultants.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### G Suite / Google Workspace
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### Microsoft 365 / Office 365
```
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## Troubleshooting

If you encounter issues sending emails:

1. **Check Your Credentials**:
   - Verify the email and password are correct
   - Try logging in to your webmail to confirm credentials work

2. **Check Server Settings**:
   - Confirm the SMTP host, port, and security settings
   - Some providers require specific ports or security settings

3. **Check for Hosting Restrictions**:
   - Some hosting providers block outgoing SMTP
   - Check if there are specific requirements from your host

4. **Alternative Approach**:
   - If you continue to have issues, consider using a third-party service like:
     - SendGrid (100 free emails/day)
     - Mailgun (5000 free emails/month)
     - Resend.com (100 free emails/day)

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- Consider using environment variables in your hosting platform instead of a physical file
- Regularly update your email password for security

## Need Help?

If you need additional help setting up your email, please consult with:
- Your web hosting provider's support team
- Your email service provider
- A web developer familiar with SMTP configuration
