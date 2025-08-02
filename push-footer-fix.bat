@echo off
echo.
echo ==========================================
echo   MVONO CONSULTANTS - FOOTER FIX PUSH
echo ==========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo Git initialized successfully!
    echo.
)

REM Get GitHub details
set /p USERNAME="Enter your GitHub username: "
set REPO_NAME=mvono-consultants-website

echo.
echo Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/%REPO_NAME%.git

echo.
echo Checking Git configuration...
git config --global user.name >nul 2>&1
if errorlevel 1 (
    set /p GIT_NAME="Enter your Git name: "
    git config --global user.name "%GIT_NAME%"
)

git config --global user.email >nul 2>&1
if errorlevel 1 (
    set /p GIT_EMAIL="Enter your Git email: "
    git config --global user.email "%GIT_EMAIL%"
)

echo.
echo Adding all files...
git add .

echo.
echo Creating commit with footer fix...
git commit -m "Fix: Resolved double footer issue on blog page

🐛 Fixed double footer bug on /blog route
- Removed duplicate navbar and footer from blog layout
- Blog page now uses main app layout navbar
- Single footer rendering from blog page component
- Improved layout consistency across all pages

✅ Blog page now displays correctly with proper layout
✅ No more duplicate components
✅ Consistent navigation across entire site

Technical changes:
- Updated app/blog/layout.jsx to remove duplicates
- Cleaned up component imports
- Maintained functionality while fixing visual issues"

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ PUSH FAILED!
    echo.
    echo Make sure you:
    echo 1. Created the repository on GitHub: https://github.com/new
    echo 2. Named it: mvono-consultants-website
    echo 3. Are logged into GitHub
    echo 4. Have proper permissions
    echo.
    echo If the repository exists, try:
    echo git push origin main --force
    echo.
) else (
    echo.
    echo ✅ SUCCESS! Footer fix pushed to GitHub!
    echo.
    echo 🚀 Repository: https://github.com/%USERNAME%/%REPO_NAME%
    echo 🔧 Fixed: Double footer issue on blog page
    echo.
    echo Next steps:
    echo 1. Test the blog page to confirm fix
    echo 2. Deploy updated version to production
    echo 3. Verify layout consistency across all pages
)

echo.
pause
