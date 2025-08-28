@echo off
cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Creating simple blog page without complex imports for Vercel deployment...
git add .
git commit -m "Simplify blog page for successful Vercel deployment - remove complex Sanity imports"
git push origin main || git push origin master

if %ERRORLEVEL% equ 0 (
    echo SUCCESS! Blog page simplified for deployment
    echo The page now shows a link to your Sanity Studio
    echo Once deployed, we can add proper content fetching
) else (
    echo Push failed - check connection
)
pause
