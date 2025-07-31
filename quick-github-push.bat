@echo off
echo.
echo ==========================================
echo   MVONO CONSULTANTS - GITHUB PUSH
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
set REPO_NAME=mvono-consultants-website

echo.
echo Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/%REPO_NAME%.git

echo.
echo Adding all files...
git add .

echo.
echo Creating commit...
git commit -m "Mvono Consultants Website - Complete Implementation

✅ Modern responsive website design
✅ NextAuth authentication system
✅ Admin dashboard with client management  
✅ Financial management & invoicing
✅ Document generation (PDF/Excel)
✅ MongoDB integration with Prisma
✅ Blog system with Sanity CMS
✅ Email contact forms & WhatsApp
✅ SEO optimization & mobile responsive
✅ Professional UI with Tailwind CSS

All merge conflicts resolved and codebase cleaned up."

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ PUSH FAILED!
    echo.
    echo Make sure you:
    echo 1. Created the repository on GitHub: https://github.com/new
    echo 2. Named it: mvono-consultants-website
    echo 3. Are logged into GitHub
    echo.
    echo Then run this script again.
) else (
    echo.
    echo ✅ SUCCESS! Code pushed to GitHub!
    echo.
    echo 🚀 Repository: https://github.com/%USERNAME%/%REPO_NAME%
    echo.
    echo Next steps:
    echo 1. Deploy to Vercel: https://vercel.com
    echo 2. Connect your GitHub repository
    echo 3. Add environment variables
    echo 4. Deploy your website!
)

echo.
pause
