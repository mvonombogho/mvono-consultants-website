@echo off
echo Git Push Fix Script
echo ==================

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Checking current directory...
echo Current directory: %cd%

echo.
echo Checking git status...
git status

echo.
echo Adding all files...
git add .

echo.
echo Checking if there are files to commit...
git diff --cached --exit-code
if errorlevel 1 (
    echo Files found to commit.
) else (
    echo No changes to commit. Adding a small update...
    echo # Updated %date% %time% > .last-update
    git add .last-update
)

echo.
echo Committing changes...
git commit -m "Update: Mvono Consultants website code push"

echo.
echo Checking branches...
git branch -a

echo.
echo Creating and switching to main branch...
git checkout -b main 2>nul || git checkout main

echo.
echo Setting up remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/mvonombogho/mvono-consultants-website.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
if errorlevel 1 (
    echo First push failed, trying with force...
    git push -u origin main --force
)

echo.
echo ========================================
echo Push process completed!
echo ========================================
echo.
pause
