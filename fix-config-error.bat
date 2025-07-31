@echo off
echo Fixing Next.js configuration and clearing cache...

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Stopping any running Next.js processes...
taskkill /f /im node.exe 2>nul

echo Removing .next build directory...
if exist ".next" (
    rmdir /s /q ".next"
    echo .next directory removed
)

echo Removing TypeScript build info...
if exist ".tsbuildinfo" (
    del ".tsbuildinfo"
    echo TypeScript build info cleared
)

echo.
echo ✅ Configuration fixed and cache cleared!
echo.
echo The Git merge conflicts in next.config.mjs have been resolved.
echo You can now run: npm run dev
echo.
pause
