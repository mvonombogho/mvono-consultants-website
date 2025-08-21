@echo off
echo Looking for the source of the "Invalid Version" error...

echo.
echo Main package.json versions that could be problematic:
type package.json | findstr /C:"version" | findstr /V /C:"0.1.0"

echo.
echo Checking for empty version strings:
type package.json | findstr /R /C:": \"\"[,}]"

echo.
echo Checking if there are any special characters or unusual formatting:
type package.json | findstr /N /C:"overrides"

echo.
echo Let's check specific problem areas in package.json:
echo Checking around line 50-60...
type package.json | more +50 | head -10

echo.
echo The "Invalid Version" error is likely from a malformed version string.
echo Let's recreate package.json with exact versions to eliminate the issue.
pause
