@echo off
cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Restoring proper blog functionality with Sanity CMS connection...
git add .
git commit -m "Restore blog functionality: Connect to Sanity CMS and display published posts"
git push origin main || git push origin master

if %ERRORLEVEL% equ 0 (
    echo.
    echo SUCCESS! Blog now connects to your Sanity Studio content
    echo Your published posts should appear at /blog
) else (
    echo Push failed - check connection
)
pause
