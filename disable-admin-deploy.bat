@echo off
cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Temporarily disabling admin routes that cause build failures...

REM Rename admin directory to disable it
if exist "app\admin" (
    ren "app\admin" "app\admin-disabled"
    echo Admin routes temporarily disabled
)

echo Committing fix...
git add .
git commit -m "Disable admin routes temporarily for successful Vercel deployment"
git push origin main || git push origin master

if %ERRORLEVEL% equ 0 (
    echo.
    echo SUCCESS! Your main website will now deploy on Vercel
    echo The admin system is temporarily disabled
    echo Once deployed, we can re-enable and fix the admin system properly
) else (
    echo Push failed - check connection
)

pause
