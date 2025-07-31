@echo off
echo Cleaning up backup files from duplicate route resolution...

cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Removing main app backups...
del "app\page.jsx.backup" 2>nul
del "app\layout.js.backup" 2>nul
del "app\layout.jsx.backup" 2>nul

echo Removing about page backups...
del "app\about\page.js.backup" 2>nul
del "app\about\page.jsx.backup" 2>nul

echo Removing contact page backups...
del "app\contact\page.js.backup" 2>nul
del "app\contact\page.jsx.backup" 2>nul

echo Removing services page backups...
del "app\services\page.js.backup" 2>nul
del "app\services\page.jsx.backup" 2>nul

echo Removing dashboard backups...
del "app\dashboard\page.js.backup" 2>nul
del "app\dashboard\layout.js.backup" 2>nul

echo Removing API route backups...
del "app\api\invoices\route.js.backup" 2>nul
del "app\api\projects\route.js.backup" 2>nul
del "app\api\register\route.js.backup" 2>nul
del "app\api\services\route.js.backup" 2>nul
del "app\api\auth\[...nextauth]\route.js.backup" 2>nul
del "app\api\clients\[id]\route.js.backup" 2>nul
del "app\api\invoices\[id]\route.js.backup" 2>nul

echo Removing temporary cleanup script...
del "fix-duplicates.js" 2>nul

echo.
echo ✅ All backup files cleaned up!
echo ✅ Temporary files removed!
echo.
echo Your project is now clean and ready for development.
pause
