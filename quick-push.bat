@echo off
echo Quick Git Push Script
echo =====================

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    git remote add origin https://github.com/mvonombogho/mvono-consultants-website.git
)

REM Check git status
echo Current git status:
git status

echo.
echo Adding all changes...
git add .

REM Get commit message from user
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG="Update: Code changes and improvements"

echo.
echo Committing changes...
git commit -m "%COMMIT_MSG%"

echo.
echo Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo Push failed. Trying to push with force (this will overwrite remote changes)...
    git push -u origin main --force
)

echo.
echo ========================================
echo Push completed!
echo ========================================
echo Repository: https://github.com/mvonombogho/mvono-consultants-website
echo.
pause
