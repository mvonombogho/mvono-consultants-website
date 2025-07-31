@echo off
echo Fixing About and Contact pages...

REM Remove broken .tsx files that import non-existent components
if exist "app\about\page.tsx" del "app\about\page.tsx"
if exist "app\contact\page.tsx" del "app\contact\page.tsx"

REM Remove any remaining problematic layout components
if exist "components\layout" rmdir /s /q "components\layout"

REM Clean build
if exist ".next" rmdir /s /q ".next"

echo Fixed! About and Contact pages should now be visible.
echo Using the working .jsx backup files.
pause
