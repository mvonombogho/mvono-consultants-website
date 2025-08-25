@echo off
echo ========================================
echo   QUICK GITHUB PUSH (NO PROMPTS)
echo ========================================
echo.

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Staging all changes...
git add .

echo Committing changes...
git commit -m "Blog routes fixed and admin system added - automated push"

echo Pushing to GitHub...
git push origin main || git push origin master

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✅ SUCCESS! Changes pushed to GitHub!
    echo 🕐 %date% %time%
) else (
    echo.
    echo ❌ Push failed! Check your connection and credentials.
)

echo.
timeout /t 3 /nobreak > nul
