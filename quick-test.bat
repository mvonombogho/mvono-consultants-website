@echo off
echo === TESTING FIXED PACKAGES ===
echo.

echo Testing build with corrected client-only/server-only packages...
npm run build

if %ERRORLEVEL% == 0 (
    echo.
    echo 🎉 SUCCESS! Build completed successfully!
    echo.
    echo 🚀 Deploying to GitHub...
    git add .
    git commit -m "Complete fix: import paths + working client-only/server-only packages"
    git push origin main
    echo.
    echo ✅ DEPLOYED! Your Mvono Consultants website should now build on Vercel.
) else (
    echo.
    echo Still having build issues. Let's get detailed error info...
    npm run build > detailed-error.log 2>&1
    echo Error saved to detailed-error.log
)

pause
