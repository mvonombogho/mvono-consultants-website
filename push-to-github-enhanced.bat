@echo off
echo Starting Git setup and push to GitHub...

REM Initialize git if not already done
if not exist .git (
    echo Initializing Git repository...
    git init
)

REM Set the remote repository (replace YOUR_USERNAME with your actual GitHub username)
set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter your repository name (default: mvono-consultants-website): "
if "%REPO_NAME%"=="" set REPO_NAME=mvono-consultants-website

echo Setting remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

REM Check Git configuration
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

REM Create .env.example from .env (removing sensitive data)
echo Creating .env.example...
echo # Database - MongoDB> .env.example
echo MONGODB_URI="your_mongodb_connection_string">> .env.example
echo.>> .env.example
echo # NextAuth>> .env.example
echo NEXTAUTH_URL=http://localhost:3000>> .env.example
echo NEXTAUTH_SECRET="your_nextauth_secret_key">> .env.example

REM Add all files to staging
echo Adding files to Git...
git add .

REM Commit the changes
echo Creating commit...
git commit -m "Initial commit: Mvono Consultants website with admin dashboard

Features:
- Modern responsive website design
- Next.js 13+ with App Router
- NextAuth authentication system  
- Admin dashboard with client management
- MongoDB integration with Prisma
- Financial management system
- Document generation (invoices, quotes)
- SEO optimization
- Blog integration with Sanity CMS
- Email contact forms
- WhatsApp integration
- Professional UI with Tailwind CSS

Resolved merge conflicts and cleaned up codebase."

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed. This might be because:
    echo 1. The repository doesn't exist on GitHub yet
    echo 2. You need to authenticate with GitHub
    echo 3. There are permission issues
    echo.
    echo Please:
    echo 1. Create the repository on GitHub first: https://github.com/new
    echo 2. Make sure you're logged into GitHub
    echo 3. Try running this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Code pushed to GitHub!
echo ========================================
echo.
echo Repository URL: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo Next steps:
echo 1. Visit your GitHub repository
echo 2. Set up GitHub Pages or deploy to Vercel
echo 3. Configure environment variables in your deployment
echo 4. Update MongoDB connection for production
echo.
pause
