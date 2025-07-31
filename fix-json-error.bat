@echo off
echo Fixing Next.js JSON parse error...

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Stopping any running processes...
taskkill /f /im node.exe 2>nul

echo Cleaning build cache...
if exist ".next" (
    echo Removing .next directory...
    rmdir /s /q ".next" 2>nul
)

if exist "node_modules\.cache" (
    echo Removing node_modules cache...
    rmdir /s /q "node_modules\.cache" 2>nul
)

echo Clearing npm cache...
npm cache clean --force

echo Reinstalling dependencies...
npm install

echo Creating fresh .next directory...
if not exist ".next" mkdir ".next"

echo.
echo ✅ Cache cleared and dependencies reinstalled!
echo.
echo Now run: npm run dev
echo.
pause
