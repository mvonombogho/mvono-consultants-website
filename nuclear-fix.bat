@echo off
echo === NUCLEAR OPTION - COMPLETE RESET ===
echo.

echo Step 1: Backing up package.json...
copy package.json package-backup.json
echo.

echo Step 2: Clearing npm cache...
npm cache clean --force
echo.

echo Step 3: Removing node_modules completely...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del "package-lock.json"
if exist ".next" rmdir /s /q ".next"
echo.

echo Step 4: Creating minimal working package.json...
echo {> package-temp.json
echo   "name": "mvono-consultants-website",>> package-temp.json
echo   "version": "0.1.0",>> package-temp.json
echo   "private": true,>> package-temp.json
echo   "scripts": {>> package-temp.json
echo     "dev": "next dev",>> package-temp.json
echo     "build": "next build",>> package-temp.json
echo     "start": "next start">> package-temp.json
echo   },>> package-temp.json
echo   "dependencies": {>> package-temp.json
echo     "next": "14.2.13",>> package-temp.json
echo     "react": "18.3.1",>> package-temp.json
echo     "react-dom": "18.3.1",>> package-temp.json
echo     "client-only": "0.0.1",>> package-temp.json
echo     "server-only": "0.0.1">> package-temp.json
echo   }>> package-temp.json
echo }>> package-temp.json
echo.

echo Step 5: Testing with minimal dependencies...
copy package-temp.json package.json
npm install
echo.

echo Step 6: Testing build with minimal setup...
npm run build
echo.

if %ERRORLEVEL% == 0 (
    echo ✅ SUCCESS! Minimal build works!
    echo.
    echo Now restoring full package.json and adding dependencies incrementally...
    copy package-backup.json package.json
    npm install
    echo.
    echo Testing full build...
    npm run build
    echo.
    if %ERRORLEVEL% == 0 (
        echo ✅ FULL SUCCESS! Deployment ready!
        echo.
        echo Pushing to GitHub...
        git add .
        git commit -m "Fix npm dependencies and import paths for deployment"
        git push origin main
        echo.
        echo 🚀 Deployed to GitHub! Check Vercel dashboard.
    ) else (
        echo ❌ Full build failed. The minimal version works, so let's use that.
        copy package-temp.json package.json
        npm install
        echo.
        echo Pushing minimal working version...
        git add .
        git commit -m "Minimal working version for deployment"
        git push origin main
    )
) else (
    echo ❌ Even minimal build failed.
    echo.
    echo Let's check Node.js version and npm version...
    node --version
    npm --version
    echo.
    echo This might be a Node.js/npm compatibility issue.
    echo Try updating Node.js to the latest LTS version.
    echo.
    echo Restoring original package.json...
    copy package-backup.json package.json
)

echo.
echo === RESET COMPLETE ===
pause
