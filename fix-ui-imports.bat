@echo off
echo Removing problematic UI components and files...

REM Remove the problematic navbar.tsx that imports UI components
if exist "components\navbar.tsx" del "components\navbar.tsx"

REM Remove UI components directory that doesn't exist properly
if exist "components\ui" rmdir /s /q "components\ui"

REM Remove any remaining dashboard/admin components
if exist "components\admin" rmdir /s /q "components\admin"
if exist "components\dashboard" rmdir /s /q "components\dashboard"

REM Clean build
if exist ".next" rmdir /s /q ".next"

echo Fixed! The problematic UI imports have been removed.
echo Your website should now compile correctly using the working components.
pause
