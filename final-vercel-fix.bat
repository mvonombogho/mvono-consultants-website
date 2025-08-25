@echo off
cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Replacing complex blog system with simple placeholders...
git add .
git commit -m "Replace complex blog imports with simple placeholders - fixes Vercel build"
git push origin main || git push origin master

if %ERRORLEVEL% equ 0 (
    echo ✅ SUCCESS! Site should now deploy on Vercel
) else (
    echo ❌ Push failed
)
pause
