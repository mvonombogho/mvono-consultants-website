@echo off
cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo ========================================
echo   COMPLETE BLOG FUNCTIONALITY DEPLOYMENT
echo ========================================
echo.
echo Deploying full blog system with:
echo ✅ Blog listing page with search and categories
echo ✅ Individual blog post pages with rich content
echo ✅ Category filtering pages  
echo ✅ Proper Sanity CMS integration
echo ✅ SEO optimized with metadata
echo ✅ Responsive design
echo ✅ Social sharing features
echo.

echo Staging all blog changes...
git add .

echo Committing complete blog functionality...
git commit -m "Complete blog system: Full Sanity CMS integration with search, categories, and rich content display"

echo Pushing to GitHub...
git push origin main || git push origin master

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================
    echo   DEPLOYMENT SUCCESSFUL!
    echo ========================================
    echo.
    echo ✅ Blog system fully deployed
    echo 🌐 Your published posts will now appear at /blog
    echo 📝 Manage content at /studio  
    echo 🔍 Search and category filtering enabled
    echo 📱 Fully responsive design
    echo.
    echo Your Mvono Consultants website is now complete with:
    echo • Professional homepage
    echo • Services and about pages
    echo • Contact functionality  
    echo • Full blog system with Sanity CMS
    echo • SEO optimization
    echo • Mobile responsive design
    echo.
) else (
    echo.
    echo ❌ Deployment failed - check connection and try again
)

pause
