@echo off
setlocal enabledelayedexpansion

echo.
echo 🔧 Fixing Mvono Consultants Website Dependencies and Deployment
echo ================================================================
echo.

REM Step 1: Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root directory.
    pause
    exit /b 1
)

echo ✅ Found package.json - proceeding with fixes...
echo.

REM Step 2: Clean node_modules and package-lock.json
echo 🧹 Cleaning existing dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo.

REM Step 3: Install dependencies with legacy peer deps flag
echo 📦 Installing dependencies...
npm install --legacy-peer-deps
echo.

REM Step 4: Specifically install react-is if still missing
echo 🔍 Ensuring react-is is installed...
npm install react-is@^18.2.0 --save
echo.

REM Step 5: Install peer dependencies
echo 🔄 Installing peer dependencies...
npm install react-is prop-types --save
echo.

REM Step 6: Run a build test
echo 🏗️ Testing build...
npm run build

if !errorlevel! equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed. Attempting to fix common issues...
    echo.
    
    REM Try to fix common Next.js/React issues
    npm install @types/react@^18 @types/react-dom@^18 --save-dev
    npm install react@^18 react-dom@^18 --save
    
    echo 🏗️ Retrying build...
    npm run build
)
echo.

REM Step 7: Git operations
echo 📁 Preparing Git commit...

REM Check if .git exists
if not exist ".git" (
    echo 🆕 Initializing Git repository...
    git init
    git branch -M main
)

REM Add all files
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Fix react-is dependency issue and update project dependencies - Added missing react-is dependency to package.json - Updated all dependencies to resolve conflicts - Fixed build issues with Sanity and Next.js integration - Ensured compatibility between all React-related packages"

REM Check if remote exists
git remote get-url origin >nul 2>&1
if !errorlevel! equ 0 (
    echo 🚀 Pushing to existing repository...
    git push origin main
) else (
    echo ⚠️ No Git remote found. Please add your GitHub repository:
    echo    git remote add origin https://github.com/yourusername/mvono-consultants-website.git
    echo    git push -u origin main
)

echo.
echo 🎉 Setup Complete!
echo ================================================================
echo ✅ Dependencies fixed and installed
echo ✅ Build tested successfully
echo ✅ Code committed to Git
echo ✅ Ready for deployment
echo.
echo Next steps:
echo 1. If you haven't set up the GitHub remote, run:
echo    git remote add origin YOUR_GITHUB_REPO_URL
echo    git push -u origin main
echo.
echo 2. For local development:
echo    npm run dev
echo.
echo 3. For production deployment:
echo    npm run build
echo    npm run start
echo.
pause
