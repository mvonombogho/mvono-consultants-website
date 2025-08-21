@echo off
echo 🚀 Starting Vercel Deployment Fix...

REM Step 1: Clean installation
echo 📦 Cleaning node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Step 2: Install dependencies
echo 📥 Installing dependencies...
npm install --legacy-peer-deps

REM Step 3: Fix environment variables
echo 🔧 Creating proper .env.local file...
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
echo # EmailJS Configuration
echo NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_mrlpiud
echo NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_zpiu9yh
echo NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=al8y9s50qXzE9pnPs
echo NEXT_PUBLIC_EMAIL_ADDRESS=sales@mvonoconsultants.com
echo.
echo # Sanity Configuration
echo NEXT_PUBLIC_SANITY_API_VERSION=2025-05-19
echo NEXT_PUBLIC_SANITY_DATASET=production
echo NEXT_PUBLIC_SANITY_PROJECT_ID=k6xvho7h
echo SANITY_API_TOKEN=your_sanity_token_here
echo.
echo # Site Configuration
echo NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
echo NEXT_PUBLIC_SITE_NAME=Mvono Consultants
) > .env.local

REM Step 4: Test build
echo 🏗️ Testing build locally...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful! Ready for Vercel deployment.
    echo.
    echo Next steps:
    echo 1. Push code to GitHub:
    echo    git add .
    echo    git commit -m "Fix deployment issues"
    echo    git push origin main
    echo.
    echo 2. In Vercel dashboard, add environment variables from .env.local
    echo 3. Set NEXTAUTH_URL to your actual Vercel domain
    echo 4. Redeploy from Vercel dashboard
) else (
    echo ❌ Build failed. Check the errors above.
)

pause
