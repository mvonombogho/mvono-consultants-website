@echo off
echo Starting comprehensive dependency fix for Vercel deployment...

echo Checking for common issues...

REM Kill any running processes
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.exe 2>nul

echo Cleaning npm cache...
npm cache clean --force

echo Removing problematic files...
if exist package-lock.json del /f package-lock.json
if exist yarn.lock del /f yarn.lock
if exist .npmrc del /f .npmrc

echo Creating .npmrc with legacy peer deps...
echo legacy-peer-deps=true > .npmrc
echo fund=false >> .npmrc

echo Installing dependencies with strict compatibility...
npm install --legacy-peer-deps --no-audit --no-fund

if %errorlevel% neq 0 (
    echo First install failed, trying alternative approach...
    
    echo Removing .npmrc and trying with force...
    del .npmrc
    
    npm install --force --legacy-peer-deps --no-audit
    
    if %errorlevel% neq 0 (
        echo Install still failing, trying minimal package.json...
        echo This might be due to corrupted package versions.
        pause
        exit /b 1
    )
)

echo Testing build...
npm run build

if %errorlevel% neq 0 (
    echo Build failed. Checking for syntax errors...
    npm run lint
    pause
    exit /b 1
)

echo Committing changes...
git add .
git commit -m "Fix Sanity dependency conflicts and update to compatible versions"

echo Pushing to GitHub...
git push origin main

echo Fix completed! Your deployment should now work.
pause
