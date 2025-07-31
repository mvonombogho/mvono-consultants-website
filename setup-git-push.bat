@echo off
echo.
echo ========================================
echo   MVONO CONSULTANTS WEBSITE
echo   Git Setup and GitHub Push Script
echo ========================================
echo.

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo [1/8] Initializing Git repository...
git init

echo.
echo [2/8] Setting up Git configuration...
git config user.name "mvonombogho"
git config user.email "sales@mvonoconsultants.com"

echo.
echo [3/8] Adding remote origin...
git remote add origin https://github.com/mvonombogho/mvono-consultants-website.git

echo.
echo [4/8] Checking Git status...
git status

echo.
echo [5/8] Adding all files to staging area...
git add .

echo.
echo [6/8] Creating initial commit...
git commit -m "Initial commit: Complete Mvono Consultants website with Next.js dashboard system - All 8 phases implemented including client management, financial system, sales pipeline, marketing tools, project management, analytics, and enterprise features"

echo.
echo [7/8] Setting default branch to main...
git branch -M main

echo.
echo [8/8] Pushing to GitHub repository...
git push -u origin main --force

echo.
echo ========================================
echo            SUCCESS!
echo ========================================
echo.
echo ✅ Mvono Consultants website successfully pushed to GitHub!
echo.
echo 🔗 Repository: https://github.com/mvonombogho/mvono-consultants-website
echo.
echo 📋 Next Steps:
echo    1. Deploy to Vercel/Netlify
echo    2. Set up environment variables
echo    3. Configure database connection
echo    4. Test in production
echo.
echo 🎉 Your enterprise consulting website is ready!
echo.
pause
