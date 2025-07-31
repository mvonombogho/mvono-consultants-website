# EmailJS Integration Guide for Mvono Consultants

This guide walks you through setting up EmailJS for your contact form, which is a simpler and more reliable solution than server-side email configurations.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from client-side JavaScript code without requiring a server. This approach is more reliable and easier to set up than traditional server-side email sending, especially when dealing with different email providers like Zoho.

## Benefits of Using EmailJS

1. **No Server Configuration**: Works without complex SMTP settings
2. **Higher Reliability**: Bypasses common server-side email issues
3. **Easy Setup**: Simple account creation and template configuration
4. **Email Templates**: Customizable templates for professional emails
5. **Direct Integration**: Works directly in your frontend code

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for a free account
   - The free plan allows 200 emails per month, which is sufficient for most small business contact forms

2. Log in to your EmailJS dashboard

### 2. Connect Your Email Service

1. In the EmailJS dashboard, go to "Email Services" 
2. Click "Add New Service"
3. Select "Custom SMTP" as your service option
4. Enter your Zoho Mail SMTP details:
   - Service Name: "Mvono Contact Form"
   - Host: smtp.zoho.com
   - Port: 587
   - Username: sales@mvonoconsultants.com
   - Password: [your Zoho email password]
   - From Email: sales@mvonoconsultants.com
   - From Name: Mvono Consultants Website
5. Click "Connect" to save your email service

### 3. Create an Email Template

1. Go to "Email Templates" in the EmailJS dashboard
2. Click "Create New Template"
3. Design your email template with the following content:

**Subject:**
```
New Contact Form Submission: {{service}}
```

**Content:**
```html
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Company:</strong> {{company}}</p>
<p><strong>Service:</strong> {{service}}</p>
<h3>Message:</h3>
<p>{{message}}</p>
```

4. Save your template with a name like "contact_form"

### 4. Update Your Website Code

1. In your website code, open `app/contact/page.jsx`
2. Update the EmailJS configuration constants at the top of the file:

```javascript
// Replace these with your actual EmailJS details
const EMAILJS_SERVICE_ID = "your_service_id"; // Get this from the service you created
const EMAILJS_TEMPLATE_ID = "your_template_id"; // Get this from the template you created
const EMAILJS_PUBLIC_KEY = "your_public_key"; // Get this from your EmailJS account settings
```

3. Install the EmailJS browser package:
```bash
npm install @emailjs/browser
```

4. Restart your development server to apply the changes

## Obtaining Your EmailJS Keys

Here's where to find the keys you need:

1. **Service ID**: On the "Email Services" page, click on your service - the ID will be shown (e.g., "service_abc123")
2. **Template ID**: On the "Email Templates" page, click on your template - the ID will be shown (e.g., "template_xyz789")
3. **Public Key**: Go to Account > API Keys and use the "Public Key"

## Testing Your EmailJS Integration

1. Start your development server:
```bash
npm run dev
```

2. Navigate to your contact page
3. Fill out the form and submit
4. Check your sales@mvonoconsultants.com inbox for the test email

## Troubleshooting

If you encounter issues:

1. **Emails Not Sending**:
   - Verify your EmailJS service ID, template ID, and public key are correct
   - Check the browser console for any JavaScript errors
   - Make sure your Zoho credentials are correct in the EmailJS service setup

2. **Template Variables Not Working**:
   - Ensure your form field names match the template variables exactly
   - Check that your EmailJS template is properly configured

3. **Rate Limiting**:
   - The free EmailJS plan has a limit of 200 emails per month
   - Consider upgrading if you need higher volume

## Next Steps (Optional)

For even more functionality:

1. **Auto-Responders**: Set up an auto-response to people who fill out your form
2. **Form Validation**: Add more robust form validation
3. **Spam Protection**: Consider adding Google reCAPTCHA to your form

## Security Considerations

- The EmailJS public key is meant to be visible in client-side code
- No server access is needed as everything runs through EmailJS's secure API
- EmailJS provides protection against spam and abuse
