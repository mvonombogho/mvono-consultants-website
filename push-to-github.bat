@echo off
echo ========================================
echo   MVONO CONSULTANTS - GITHUB PUSH SCRIPT
echo ========================================
echo.

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Current directory: %cd%
echo.

echo Checking git status...
git status
echo.

echo ========================================
echo   STAGING ALL CHANGES
echo ========================================
echo Adding all files to git staging...
git add .
echo.

echo Checking staged files...
git status
echo.

echo ========================================
echo   COMMITTING CHANGES
echo ========================================
set /p commit_message="Enter commit message (or press Enter for default): "

if "%commit_message%"=="" (
    set commit_message=Fix blog routes and add admin system - Phase 1 implementation
)

echo.
echo Committing with message: "%commit_message%"
git commit -m "%commit_message%"
echo.

echo ========================================
echo   PUSHING TO GITHUB
echo ========================================
echo Pushing changes to GitHub...
git push origin main
echo.

if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Push failed! Trying to push to master branch...
    git push origin master
    
    if %ERRORLEVEL% neq 0 (
        echo.
        echo ❌ Push to master also failed!
        echo.
        echo Possible solutions:
        echo 1. Check your internet connection
        echo 2. Verify GitHub credentials
        echo 3. Check if you have push permissions
        echo 4. Try: git remote -v to check remote URL
        echo.
        echo Manual commands to try:
        echo git remote -v
        echo git branch
        echo git push origin [your-branch-name]
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ✅ SUCCESS! Changes have been pushed to GitHub!
echo.
echo ========================================
echo   PUSH SUMMARY
echo ========================================
echo.
echo 📝 Commit Message: "%commit_message%"
echo 🚀 Repository: Mvono Consultants Website
echo 📅 Time: %date% %time%
echo.
echo Recent changes pushed:
echo ✅ Fixed blog route import paths
echo ✅ Created missing blog/[slug]/page.js
echo ✅ Created missing blog/category/[id]/page.js  
echo ✅ Updated blog layout with navbar
echo ✅ Added admin system foundation
echo ✅ Enhanced project structure
echo.
echo 🌐 Your changes should now be live on GitHub!
echo.
pause
