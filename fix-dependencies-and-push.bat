@echo off
echo Fixing dependencies and pushing to GitHub...

echo Step 1: Installing missing react-is dependency...
npm install react-is

echo Step 2: Installing all dependencies...
npm install

echo Step 3: Checking for any other missing dependencies...
npm audit fix --force

echo Step 4: Adding all files to git...
git add .

echo Step 5: Committing changes...
git commit -m "Fix react-is dependency issue and update project"

echo Step 6: Pushing to GitHub...
git push origin main

echo.
echo Complete! Dependencies fixed and code pushed to GitHub.
echo.
pause
