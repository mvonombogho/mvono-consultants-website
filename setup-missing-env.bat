@echo off
echo.
echo ==========================================
echo   MVONO CONSULTANTS - ENV SETUP
echo ==========================================
echo.

echo Current .env file contents:
type .env
echo.
echo.

echo Your .env file is intact! However, you might be missing some variables.
echo.
echo The following are available in .env.local.example:
echo - Sanity CMS configuration
echo - EmailJS configuration  
echo - Zoho Email configuration
echo - Google Analytics
echo - SEO variables
echo.

set /p ADD_VARS="Do you want to add missing variables to your .env file? (y/n): "

if /i "%ADD_VARS%"=="y" (
    echo.
    echo Adding commonly needed variables to your .env file...
    echo.
    
    echo. >> .env
    echo # Email Configuration >> .env
    echo EMAIL_HOST=smtp.zoho.com >> .env
    echo EMAIL_PORT=587 >> .env
    echo EMAIL_SECURE=false >> .env
    echo EMAIL_USER=sales@mvonoconsultants.com >> .env
    echo EMAIL_FROM=sales@mvonoconsultants.com >> .env
    echo EMAIL_PASS=your-zoho-password-here >> .env
    echo. >> .env
    
    echo # Sanity CMS Configuration >> .env
    echo NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id >> .env
    echo NEXT_PUBLIC_SANITY_DATASET=production >> .env
    echo NEXT_PUBLIC_SANITY_API_VERSION=2025-05-19 >> .env
    echo SANITY_API_TOKEN=your-sanity-api-token >> .env
    echo. >> .env
    
    echo # EmailJS Configuration >> .env
    echo EMAILJS_SERVICE_ID=your-emailjs-service-id >> .env
    echo EMAILJS_TEMPLATE_ID=your-emailjs-template-id >> .env
    echo EMAILJS_PUBLIC_KEY=your-emailjs-public-key >> .env
    echo. >> .env
    
    echo # Google Analytics >> .env
    echo NEXT_PUBLIC_GA_TRACKING_ID=G-MVNC2024KE >> .env
    echo NEXT_PUBLIC_GOOGLE_ANALYTICS=G-MVNC2024KE >> .env
    echo. >> .env
    
    echo # Site Configuration >> .env
    echo NEXT_PUBLIC_SITE_URL=https://www.mvonoconsultants.com >> .env
    echo NEXT_PUBLIC_COMPANY_PHONE=+254 720 270 694 >> .env
    echo NEXT_PUBLIC_COMPANY_EMAIL=sales@mvonoconsultants.com >> .env
    
    echo.
    echo ✅ Variables added to .env file!
    echo.
    echo ⚠️  IMPORTANT: You need to replace placeholder values with actual:
    echo - Zoho email password
    echo - Sanity project ID and API token
    echo - EmailJS service credentials
    echo.
    echo Updated .env file:
    type .env
) else (
    echo.
    echo No changes made. Your original .env file is preserved.
)

echo.
pause
