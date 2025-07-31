@echo off
echo 🚀 Setting up Mvono Consultants SEO & OG Images System...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

REM Install @vercel/og dependency
echo 📦 Installing @vercel/og dependency...
npm install @vercel/og

if %errorlevel% equ 0 (
    echo ✅ @vercel/og installed successfully
) else (
    echo ❌ Failed to install @vercel/og
    pause
    exit /b 1
)

echo.

REM Check if .env.local exists
if exist ".env.local" (
    echo ✅ .env.local file exists
) else (
    echo ⚠️  .env.local file not found
    echo 📋 Copying from .env.local.example...
    copy .env.local.example .env.local
    echo ✅ .env.local created from template
    echo.
    echo 🔧 Please update the following in .env.local:
    echo    - EMAIL_PASS: Replace with actual Zoho Mail password
    echo    - Any other environment-specific values
    echo.
)

REM Setup complete
echo 🎯 Setup complete! 
echo.
echo 📍 After starting the dev server, visit these URLs to test:
echo    - Main site: http://localhost:3000
echo    - OG Preview: http://localhost:3000/og-preview
echo    - Direct OG API: http://localhost:3000/api/og?page=home
echo.
echo 🚀 Starting development server...
echo.

npm run dev
