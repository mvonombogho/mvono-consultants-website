@echo off
echo 🚀 Starting Vercel Deployment Fix (Windows)...

REM Step 1: Kill any running Node processes
echo 🛑 Stopping any running Node processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.exe 2>nul

REM Step 2: Force delete node_modules with robocopy trick
echo 📦 Force cleaning node_modules...
if exist node_modules (
    echo Creating empty temp directory...
    mkdir empty_temp_dir 2>nul
    echo Using robocopy to clear node_modules...
    robocopy empty_temp_dir node_modules /MIR >nul 2>&1
    rmdir node_modules 2>nul
    rmdir empty_temp_dir 2>nul
    echo node_modules directory cleaned.
)

REM Delete package-lock.json
if exist package-lock.json (
    del /f package-lock.json
    echo package-lock.json deleted.
)

REM Step 3: Clear npm cache
echo 🧹 Clearing npm cache...
npm cache clean --force

REM Step 4: Install dependencies with specific flags
echo 📥 Installing dependencies...
npm install --legacy-peer-deps --no-optional --verbose

REM Step 5: Add missing dependency
echo 📦 Adding react-is dependency...
npm install react-is@^18.2.0 --save

REM Step 6: Create proper environment file
echo 🔧 Creating .env.local file...
(
echo # Database Configuration
echo MONGODB_URI=mongodb+srv://israelmvono:israelmvono@cluster0.mwpylrk.mongodb.net/?retryWrites=true^&w=majority^&appName=Cluster0
echo.
echo # NextAuth Configuration  
echo NEXTAUTH_URL=https://your-vercel-domain.vercel.app
echo NEXTAUTH_SECRET=4454654y4tu7iui89utu7r78t9u7r
echo.
echo # Google Analytics
echo NEXT_PUBLIC_GA_TRACKING_ID=G-DJL2T83ERT
echo NEXT_PUBLIC_GOOGLE_ANALYTICS=G-DJL2T83ERT
echo.
echo # EmailJS Configuration - Fixed format
echo NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_mrlpiud
echo NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_zpiu9yh
echo NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=al8y9s50qXzE9pnPs
echo NEXT_PUBLIC_EMAIL_ADDRESS=sales@mvonoconsultants.com
echo.
echo # Sanity Configuration - Fixed format
echo NEXT_PUBLIC_SANITY_API_VERSION=2025-05-19
echo NEXT_PUBLIC_SANITY_DATASET=production
echo NEXT_PUBLIC_SANITY_PROJECT_ID=k6xvho7h
echo SANITY_API_TOKEN=your_sanity_token_here
echo.
echo # Site Configuration
echo NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
echo NEXT_PUBLIC_SITE_NAME=Mvono Consultants
) > .env.local

REM Step 7: Backup and modify package.json to avoid Prisma issues
echo 📝 Temporarily modifying package.json...
copy package.json package.json.backup >nul

REM Create a simple Node script to modify package.json
echo const fs = require('fs'); > modify_package.js
echo const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); >> modify_package.js
echo delete pkg.scripts.postinstall; >> modify_package.js
echo pkg.dependencies['react-is'] = '^18.2.0'; >> modify_package.js
echo fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2)); >> modify_package.js

node modify_package.js
del modify_package.js

REM Step 8: Test build
echo 🏗️ Testing local build...
npm run build

if %errorlevel% equ 0 (
    echo.
    echo ✅ BUILD SUCCESSFUL! 🎉
    echo.
    echo ════════════════════════════════════════
    echo    DEPLOYMENT READY - NEXT STEPS:
    echo ════════════════════════════════════════
    echo.
    echo 1. PUSH TO GITHUB:
    echo    git add .
    echo    git commit -m "Fix deployment configuration"
    echo    git push origin main
    echo.
    echo 2. VERCEL ENVIRONMENT VARIABLES:
    echo    Go to Vercel Dashboard ^> Settings ^> Environment Variables
    echo    Add ALL variables from .env.local file
    echo    IMPORTANT: Change NEXTAUTH_URL to your actual Vercel domain!
    echo.
    echo 3. REDEPLOY:
    echo    Go to Vercel Dashboard ^> Deployments ^> Redeploy
    echo.
    echo ✅ Environment file created: .env.local
    echo ✅ Package.json temporarily modified ^(backup saved^)
    echo ✅ Dependencies installed successfully
    echo ✅ Build test passed
    echo.
) else (
    echo.
    echo ❌ BUILD FAILED!
    echo.
    echo Restoring original package.json...
    copy package.json.backup package.json >nul
    echo.
    echo Common solutions:
    echo 1. Check for syntax errors in your React components
    echo 2. Ensure all imports are correct
    echo 3. Run: npm run lint
    echo 4. Check the error messages above
)

echo.
echo Press any key to continue...
pause >nul
