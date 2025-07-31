@echo off
echo Clearing cache and forcing refresh...

REM Remove the shared Footer to avoid conflicts
if exist "components\shared\Footer.jsx" rename "components\shared\Footer.jsx" "components\shared\Footer.jsx.disabled"

REM Clear Next.js build cache
if exist ".next" rmdir /s /q ".next"

REM Clear npm cache
npm cache clean --force

echo Cache cleared! Restart your dev server with npm run dev
pause
