@echo off
echo Investigating the source of Invalid Version error systematically...

echo.
echo Step 1: Checking for hidden configuration files that might contain bad versions...
echo.

echo Checking for .nvmrc file:
if exist .nvmrc (
    echo Found .nvmrc:
    type .nvmrc
) else (
    echo No .nvmrc file found
)

echo.
echo Checking for engines in package.json:
findstr /C:"engines" package.json

echo.
echo Checking for any files with "version" that might be problematic:
dir /s /b | findstr version

echo.
echo Looking for any yarn files that might conflict:
if exist yarn.lock echo Found yarn.lock file
if exist .yarnrc echo Found .yarnrc file

echo.
echo Checking git hooks or other config files:
if exist .git\hooks dir .git\hooks
if exist .vercel dir .vercel

pause
