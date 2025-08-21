@echo off
echo Checking for Vercel configuration issues...

echo.
echo Looking for vercel.json:
if exist vercel.json (
    echo Found vercel.json:
    type vercel.json
) else (
    echo No vercel.json found
)

echo.
echo Looking for .vercelignore:
if exist .vercelignore (
    echo Found .vercelignore:
    type .vercelignore
) else (
    echo No .vercelignore found  
)

echo.
echo Checking if there are any environment variable files with version info:
if exist .env type .env | findstr -i version
if exist .env.local type .env.local | findstr -i version
if exist .env.production type .env.production | findstr -i version

echo.
echo Let's also check the current npm and node versions locally:
node --version
npm --version

pause
