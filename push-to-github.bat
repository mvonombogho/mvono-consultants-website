@echo off
echo Initializing Git repository and pushing to GitHub...

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Initializing git repository...
git init

echo Adding remote origin...
git remote add origin https://github.com/mvonombogho/mvono-consultants-website.git

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: Complete Mvono Consultants website with Next.js, Sanity CMS, and dashboard"

echo Setting default branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main --force

echo Done! Repository has been pushed to GitHub.
pause
