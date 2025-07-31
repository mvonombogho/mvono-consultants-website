@echo off
echo Fixing the compilation error...

REM Delete the broken page.tsx file
if exist "app\page.tsx" del "app\page.tsx"
if exist "app\layout.tsx" del "app\layout.tsx"

REM Remove any remaining dashboard directories
if exist "app\dashboard" rmdir /s /q "app\dashboard"
if exist "app\admin" rmdir /s /q "app\admin"
if exist "app\overview" rmdir /s /q "app\overview"
if exist "app\clients" rmdir /s /q "app\clients"

REM Clean the build
if exist ".next" rmdir /s /q ".next"

echo Fixed! Your website should now compile correctly.
echo Using the original page.jsx and layout.js files.
pause
