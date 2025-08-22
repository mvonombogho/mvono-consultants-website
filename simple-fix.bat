@echo off
echo === SIMPLE DEPENDENCY FIX ===
echo.

echo Step 1: Installing missing dependencies without version specification...
npm install client-only
npm install server-only
echo.

echo Step 2: Running npm install to ensure all dependencies are properly installed...
npm install
echo.

echo Step 3: Clearing Next.js cache...
if exist ".next" rmdir /s /q ".next"
echo.

echo Step 4: Testing build...
npm run build
echo.

if %ERRORLEVEL% == 0 (
    echo.
    echo ✅ SUCCESS! Build completed successfully!
    echo.
    echo 🚀 Pushing to GitHub for Vercel deployment...
    git add .
    git commit -m "Add missing client-only and server-only dependencies"
    git push origin main
    echo.
    echo ✅ Deployed! Check Vercel dashboard for deployment status.
) else (
    echo.
    echo ❌ Build failed. Let's check what's still missing...
    echo.
    echo Running build with verbose output...
    npm run build > build-error.log 2>&1
    echo.
    echo Build errors saved to build-error.log
    echo Please check the file for specific error details.
    echo.
    echo Common next steps:
    echo 1. Check build-error.log for specific errors
    echo 2. Try: npm cache clean --force
    echo 3. Try: rm -rf node_modules && npm install
)

echo.
echo === FIX COMPLETE ===
pause
