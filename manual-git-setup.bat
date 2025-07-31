@echo off
echo Manual Git Setup Script
echo =======================

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Step 1: Initialize git repository...
git init

echo.
echo Step 2: Configure git (if needed)...
git config user.name "mvonombogho"
git config user.email "your-email@example.com"

echo.
echo Step 3: Add all files...
git add .

echo.
echo Step 4: Make initial commit...
git commit -m "Initial commit: Mvono Consultants website"

echo.
echo Step 5: Rename branch to main...
git branch -M main

echo.
echo Step 6: Add remote repository...
git remote add origin https://github.com/mvonombogho/mvono-consultants-website.git

echo.
echo Step 7: Push to GitHub...
git push -u origin main

echo.
if errorlevel 1 (
    echo Push failed. Trying alternative methods...
    echo.
    echo Method 1: Force push...
    git push -u origin main --force
    
    if errorlevel 1 (
        echo.
        echo Method 2: Check if repository exists and try again...
        echo Please ensure:
        echo 1. Repository exists at: https://github.com/mvonombogho/mvono-consultants-website
        echo 2. You have write access to the repository
        echo 3. Your GitHub credentials are set up correctly
        echo.
        echo Manual commands to try:
        echo git push -u origin main --force
        echo.
    )
)

echo.
echo Process completed!
pause
