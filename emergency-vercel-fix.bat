@echo off
echo ========================================
echo   VERCEL BUILD FIXES - EMERGENCY PUSH
echo ========================================
echo.

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Fixed Issues:
echo ✅ Created missing FinancialManagement component
echo ✅ Fixed Heroicons imports (v2 syntax)
echo ✅ Fixed blog route import paths for nested routes
echo.

echo Staging fixes...
git add .

echo Committing emergency fixes...
git commit -m "Emergency fix: Vercel build errors - missing components and import paths"

echo Pushing to GitHub...
git push origin main || git push origin master

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✅ SUCCESS! Fixes pushed to GitHub!
    echo 🚀 Vercel should now deploy successfully
    echo.
    echo Fixed:
    echo • Missing FinancialManagement component
    echo • Heroicons v2 import syntax
    echo • Blog nested route import paths
) else (
    echo.
    echo ❌ Push failed! Check connection and try again.
)

echo.
pause
