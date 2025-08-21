@echo off
echo Starting Next.js 14 upgrade and deployment fix...

echo Stopping any running Node processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.exe 2>nul

echo Waiting for processes to close...
timeout /t 3 /nobreak >nul

echo Force removing old dependencies...
if exist .next (
    echo Removing .next directory...
    rmdir /s /q .next 2>nul
)

if exist package-lock.json (
    echo Removing package-lock.json...
    del /f package-lock.json 2>nul
)

if exist node_modules (
    echo Force removing node_modules...
    rmdir /s /q node_modules 2>nul
    if exist node_modules (
        echo Some files are locked, trying alternative method...
        rd /s node_modules 2>nul
        if exist node_modules (
            echo Using robocopy to clean...
            md empty_temp_dir
            robocopy empty_temp_dir node_modules /mir /nfl /ndl /njh /njs /nc /ns /np
            rmdir /s /q empty_temp_dir
            rmdir /s /q node_modules 2>nul
        )
    )
)

echo Installing new dependencies with legacy peer deps...
npm cache clean --force
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo Error during installation. Trying with different flags...
    npm install --legacy-peer-deps --no-optional --no-shrinkwrap
)

echo Testing build...
npm run build

if %errorlevel% neq 0 (
    echo Build failed. Check the output above for errors.
    pause
    exit /b 1
)

echo Adding changes to git...
git add .
git commit -m "Update to Next.js 14 to fix Vercel deployment dependency conflicts"

echo Pushing to GitHub...
git push origin main

echo Deployment fix complete!
echo Your project should now deploy successfully on Vercel.
pause
