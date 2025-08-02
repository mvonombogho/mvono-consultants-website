@echo off
echo.
echo ==========================================
echo   MVONO CONSULTANTS - COMPLETE PUSH
echo ==========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo Git initialized successfully!
    echo.
)

REM Get GitHub details
set /p USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter repository name (default: mvono-consultants-website): "
if "%REPO_NAME%"=="" set REPO_NAME=mvono-consultants-website

echo.
echo Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/%REPO_NAME%.git

echo.
echo Checking Git configuration...
git config --global user.name >nul 2>&1
if errorlevel 1 (
    set /p GIT_NAME="Enter your Git name: "
    git config --global user.name "%GIT_NAME%"
)

git config --global user.email >nul 2>&1
if errorlevel 1 (
    set /p GIT_EMAIL="Enter your Git email: "
    git config --global user.email "%GIT_EMAIL%"
)

echo.
echo Creating .env.example for security...
echo # Database - MongoDB> .env.example
echo MONGODB_URI=your_mongodb_connection_string>> .env.example
echo.>> .env.example
echo # NextAuth Configuration>> .env.example
echo NEXTAUTH_URL=http://localhost:3000>> .env.example
echo NEXTAUTH_SECRET=your_nextauth_secret_key>> .env.example
echo.>> .env.example
echo # Email Configuration>> .env.example
echo EMAILJS_SERVICE_ID=your_service_id>> .env.example
echo EMAILJS_TEMPLATE_ID=your_template_id>> .env.example
echo EMAILJS_PUBLIC_KEY=your_public_key>> .env.example
echo.>> .env.example
echo # Sanity CMS>> .env.example
echo NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id>> .env.example
echo NEXT_PUBLIC_SANITY_DATASET=production>> .env.example
echo SANITY_API_TOKEN=your_api_token>> .env.example

echo.
echo Adding all files...
git add .

echo.
echo Creating comprehensive commit...
git commit -m "Mvono Consultants Website - Complete Implementation with Fixes

🚀 COMPREHENSIVE WEBSITE IMPLEMENTATION:
===========================================

✅ CORE FEATURES:
- Modern responsive website design with GigaCloud-inspired animations
- Next.js 13+ with App Router and TypeScript support
- Professional UI with Tailwind CSS and modern components
- Mobile-first responsive design across all devices
- SEO optimization with meta tags and structured data

✅ AUTHENTICATION & SECURITY:
- NextAuth implementation for secure admin access
- Role-based access control system
- Protected admin routes and secure sessions
- Password protection and security best practices

✅ ADMIN DASHBOARD SYSTEM:
- Comprehensive client management database
- Subcontractor management with performance tracking
- Financial management and expense tracking
- Document generation (invoices, quotes, delivery notes)
- PDF and Excel export functionality
- Client statements and payment tracking

✅ DATABASE & INTEGRATION:
- MongoDB integration with Prisma ORM
- Secure database schema and relationships
- Data validation and error handling
- Performance optimization and indexing

✅ BLOG & CONTENT MANAGEMENT:
- Sanity CMS integration for blog management
- Dynamic blog posts with categories
- SEO-optimized blog pages with schema markup
- Author profiles and featured images
- Search functionality and filtering

✅ COMMUNICATION FEATURES:
- EmailJS contact form integration
- WhatsApp chat widget integration
- Automated email notifications
- Professional email templates

✅ BUG FIXES & IMPROVEMENTS:
- ✅ Fixed double footer issue on blog page
- ✅ Resolved navbar duplication problems
- ✅ Fixed layout consistency across all pages
- ✅ Cleaned up component imports and dependencies
- ✅ Resolved merge conflicts and route conflicts
- ✅ Fixed compilation errors and dependency issues

✅ SEO & PERFORMANCE:
- Complete Kenya-focused SEO optimization
- Local business schema markup
- Performance monitoring and optimization
- Image optimization and lazy loading
- Fast loading times and Core Web Vitals optimization

✅ PRODUCTION READY:
- Environment variable configuration
- Error boundaries and error handling
- Logging and monitoring setup
- Security best practices implemented
- Clean, maintainable codebase

🔧 RECENT FIXES:
- Removed duplicate footer components from blog layout
- Fixed navbar inheritance from main layout
- Improved component structure and organization
- Enhanced user experience across all pages

This implementation provides a complete business management solution
with professional website, client management, financial tracking,
and lead generation capabilities.

Ready for production deployment!"

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ PUSH FAILED!
    echo.
    echo Possible solutions:
    echo 1. Create repository on GitHub: https://github.com/new
    echo 2. Name it: %REPO_NAME%
    echo 3. Make sure you're logged into GitHub
    echo 4. Check your internet connection
    echo.
    echo If repository exists but push fails, try force push:
    echo git push origin main --force
    echo.
    echo Or check if you need to pull first:
    echo git pull origin main --allow-unrelated-histories
    echo.
) else (
    echo.
    echo ✅✅✅ SUCCESS! COMPLETE CODE PUSHED TO GITHUB! ✅✅✅
    echo.
    echo 🚀 Repository: https://github.com/%USERNAME%/%REPO_NAME%
    echo 🔧 All fixes applied including footer issue resolution
    echo 📱 Mobile-responsive design implemented
    echo 💼 Complete business management system
    echo 🔐 Secure authentication and admin dashboard
    echo 📊 Financial management and document generation
    echo 📝 Blog system with Sanity CMS
    echo 📧 Email integration and WhatsApp widget
    echo 🎯 SEO optimized for Kenya market
    echo.
    echo 🎉 READY FOR DEPLOYMENT!
    echo.
    echo Next steps:
    echo 1. Deploy to Vercel: https://vercel.com/new
    echo 2. Connect GitHub repository: %REPO_NAME%
    echo 3. Add environment variables from .env.example
    echo 4. Configure custom domain
    echo 5. Set up MongoDB Atlas for production
    echo 6. Configure Sanity CMS for content management
    echo.
    echo 📚 Documentation available in project README
)

echo.
pause
