@echo off
echo =================================
echo EMERGENCY CLEAN INSTALL
echo =================================

echo.
echo This will completely reinstall everything...

echo.
echo Step 1: Removing broken node_modules (this may take a minute)...
if exist node_modules (
    echo Deleting node_modules folder...
    rd /s /q node_modules 2>nul
    if exist node_modules (
        echo Still exists, trying alternative method...
        rmdir /s /q node_modules 2>nul
    )
)

echo.
echo Step 2: Removing lock files...
if exist package-lock.json del package-lock.json
if exist .next rd /s /q .next 2>nul

echo.
echo Step 3: Fresh npm install...
npm install

echo.
echo Step 4: Verify Next.js is installed...
if exist node_modules\.bin\next.cmd (
    echo ✅ Next.js found!
) else (
    echo ❌ Next.js missing, installing specifically...
    npm install next@14.2.13 react@18.3.1 react-dom@18.3.1
)

echo.
echo Step 5: Try build...
npx next build

if %ERRORLEVEL% EQU 0 (
    echo ✅ BUILD SUCCESS!
    git add .
    git commit -m "Emergency: Clean reinstall fixed build"
    git push origin main
    echo 🚀 DEPLOYED!
) else (
    echo ❌ Still failing. Let's check what's missing...
    echo.
    echo Installed packages:
    npm list --depth=0
)

pause
