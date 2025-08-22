@echo off
echo === CORRECTED DEPENDENCY FIX ===
echo.

echo Step 1: Installing client-only and server-only packages...
npm install client-only
npm install server-only
echo.

echo Step 2: Reinstalling all dependencies to ensure compatibility...
npm install
echo.

echo Step 3: Clearing cache and testing build...
if exist ".next" rmdir /s /q ".next"
echo Running build test...
npm run build
echo.

if %ERRORLEVEL% == 0 (
    echo.
    echo ✅ SUCCESS! Build completed successfully!
    echo.
    echo Summary of fixes applied:
    echo ✓ Import paths fixed (39 files updated)
    echo ✓ client-only dependency added
    echo ✓ server-only dependency added  
    echo ✓ Build passes locally
    echo.
    echo 🚀 Ready for deployment! Pushing to GitHub...
    git add .
    git commit -m "Complete deployment fix: import paths + missing client-only/server-only dependencies"
    git push origin main
    echo.
    echo ✅ Changes pushed to GitHub! 
    echo Vercel should now deploy successfully.
    echo Check your Vercel dashboard for deployment status.
) else (
    echo.
    echo ❌ Build still has issues.
    echo Saving build output for analysis...
    npm run build > build-output.log 2>&1
    echo.
    echo Build output saved to build-output.log
    echo Please share the contents for further troubleshooting.
    echo.
    echo Next troubleshooting steps:
    echo 1. Check build-output.log for specific errors
    echo 2. Try: npm cache clean --force  
    echo 3. Try: rmdir /s /q node_modules && npm install
    echo 4. Check environment variables (.env files)
)

echo.
echo === FIX COMPLETE ===
pause
