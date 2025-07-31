@echo off
echo Comprehensive cleanup of all problematic files...

REM Remove the main problematic .tsx files
if exist "app\services\page.tsx" del "app\services\page.tsx"
if exist "app\about\page.tsx" del "app\about\page.tsx"
if exist "app\contact\page.tsx" del "app\contact\page.tsx"
if exist "app\page.tsx" del "app\page.tsx"

REM Remove entire dashboard directory system
if exist "app\(dashboard)" rmdir /s /q "app\(dashboard)"

REM Remove login page
if exist "app\login.disabled" rmdir /s /q "app\login.disabled"

REM Remove all layout components that don't exist
if exist "components\layout" rmdir /s /q "components\layout"
if exist "components\common" rmdir /s /q "components\common"

REM Remove any remaining management system components
if exist "components\admin" rmdir /s /q "components\admin"
if exist "components\dashboard" rmdir /s /q "components\dashboard"
if exist "components\competitor" rmdir /s /q "components\competitor"
if exist "components\compliance" rmdir /s /q "components\compliance"
if exist "components\certifications" rmdir /s /q "components\certifications"
if exist "components\anniversaries" rmdir /s /q "components\anniversaries"
if exist "components\anniversary" rmdir /s /q "components\anniversary"
if exist "components\certification" rmdir /s /q "components\certification"
if exist "components\competitors" rmdir /s /q "components\competitors"
if exist "components\documents" rmdir /s /q "components\documents"
if exist "components\marketing" rmdir /s /q "components\marketing"
if exist "components\market-position" rmdir /s /q "components\market-position"
if exist "components\projects" rmdir /s /q "components\projects"
if exist "components\proposals" rmdir /s /q "components\proposals"

REM Clean Next.js build
if exist ".next" rmdir /s /q ".next"

echo All problematic files removed!
echo Your website should now work with only the original working pages.
pause
