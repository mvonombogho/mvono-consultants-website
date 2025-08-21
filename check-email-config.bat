@echo off
echo.
echo ==========================================
echo   MVONO CONSULTANTS - EMAIL CONFIGURATION
echo ==========================================
echo.

echo Current Email Setup Status:
echo ===========================
echo.
echo ✅ EmailJS Configuration (Client-side):
echo    - Service ID: service_mrlpiud
echo    - Template ID: template_zpiu9yh  
echo    - Public Key: al8y9s50qXzE9pnPs
echo.
echo ✅ Zoho Email Configuration (Server-side):
echo    - Email Address: sales@mvonoconsultants.com
echo    - SMTP Host: smtp.zoho.com
echo    - API Route: /api/contact (configured)
echo.
echo ❌ Missing in .env file:
echo    - EMAIL_USER (Zoho email)
echo    - EMAIL_PASS (Zoho password)
echo    - EMAIL_HOST, EMAIL_PORT settings
echo.

echo Checking current .env file:
echo ===========================
type .env
echo.

set /p ADD_EMAIL="Do you want to add missing email configuration to .env? (y/n): "

if /i "%ADD_EMAIL%"=="y" (
    echo.
    echo Adding email configuration to .env file...
    echo.
    
    REM Add email configuration
    echo. >> .env
    echo # Zoho Email Configuration >> .env
    echo EMAIL_HOST=smtp.zoho.com >> .env
    echo EMAIL_PORT=587 >> .env
    echo EMAIL_SECURE=false >> .env
    echo EMAIL_USER=sales@mvonoconsultants.com >> .env
    echo EMAIL_FROM=sales@mvonoconsultants.com >> .env
    echo EMAIL_PASS=your-zoho-password-here >> .env
    echo. >> .env
    
    REM Add EmailJS configuration
    echo # EmailJS Configuration >> .env
    echo EMAILJS_SERVICE_ID=service_mrlpiud >> .env
    echo EMAILJS_TEMPLATE_ID=template_zpiu9yh >> .env
    echo EMAILJS_PUBLIC_KEY=al8y9s50qXzE9pnPs >> .env
    echo. >> .env
    
    echo ✅ Email configuration added to .env file!
    echo.
    echo ⚠️  IMPORTANT: You must update these values:
    echo.
    echo 1. EMAIL_PASS=your-zoho-password-here
    echo    Replace with your actual Zoho Mail password for sales@mvonoconsultants.com
    echo.
    echo 2. If EmailJS credentials are different, update:
    echo    - EMAILJS_SERVICE_ID
    echo    - EMAILJS_TEMPLATE_ID  
    echo    - EMAILJS_PUBLIC_KEY
    echo.
    
    echo Updated .env file:
    echo ==================
    type .env
    echo.
) else (
    echo.
    echo No changes made to .env file.
)

echo.
echo Email Configuration Guide:
echo =========================
echo.
echo 🔧 TO COMPLETE SETUP:
echo.
echo 1. UPDATE ZOHO PASSWORD:
echo    - Edit .env file
echo    - Replace 'your-zoho-password-here' with actual password
echo    - Make sure it's the password for sales@mvonoconsultants.com
echo.
echo 2. TEST EMAIL FUNCTIONALITY:
echo    - Run: node test-email.js
echo    - Check if you receive test email
echo.
echo 3. VERIFY EMAILJS SETTINGS:
echo    - Login to https://dashboard.emailjs.com
echo    - Check your service ID, template ID, and public key
echo    - Update .env if different
echo.
echo 4. ZOHO MAIL REQUIREMENTS:
echo    - Ensure SMTP access is enabled in Zoho
echo    - If using 2FA, create an App Password
echo    - Check account region (smtp.zoho.com vs smtp.zoho.in)
echo.
echo 📧 CURRENT EMAIL ADDRESSES:
echo    - Primary: sales@mvonoconsultants.com
echo    - Contact forms send TO: sales@mvonoconsultants.com
echo    - Contact forms send FROM: sales@mvonoconsultants.com
echo.
echo 🧪 TESTING:
echo    - EmailJS: Test on contact forms (client-side)
echo    - Zoho SMTP: Test via /api/contact (server-side)
echo    - Both should deliver to sales@mvonoconsultants.com
echo.
echo 🔐 SECURITY:
echo    - Never commit .env file to Git
echo    - Use strong passwords
echo    - Enable 2FA on Zoho account
echo.

pause
