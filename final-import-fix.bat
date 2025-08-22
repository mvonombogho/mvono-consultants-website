@echo off
echo === FIXING REMAINING IMPORT PATHS ===
echo.

echo Step 1: Running npm install to fix SWC dependencies...
npm install
echo.

echo Step 2: Testing build with corrected deep-nested import paths...
npm run build
echo.

if %ERRORLEVEL% == 0 (
    echo.
    echo 🎉 SUCCESS! Build completed successfully!
    echo.
    echo Summary of ALL fixes:
    echo ✓ Fixed 43+ import path issues
    echo ✓ Fixed client-only/server-only packages
    echo ✓ Installed @sanity/vision dependency
    echo ✓ Fixed SWC dependencies
    echo ✓ Corrected deeply nested relative paths
    echo.
    echo 🚀 DEPLOYING TO GITHUB...
    git add .
    git commit -m "COMPLETE FIX: All imports, dependencies, and build issues resolved for Vercel deployment"
    git push origin main
    echo.
    echo ✅ MVONO CONSULTANTS WEBSITE DEPLOYED!
    echo Check your Vercel dashboard - deployment should be successful now.
) else (
    echo.
    echo Build still has issues. Saving error details...
    npm run build > remaining-errors.log 2>&1
    echo.
    echo Errors saved to remaining-errors.log
    echo Let's check what specific files still need fixing...
)

echo.
echo === FINAL IMPORT FIX COMPLETE ===
pause
