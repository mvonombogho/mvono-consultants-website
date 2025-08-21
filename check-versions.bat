@echo off
echo Checking for invalid version strings...

echo Searching for empty or malformed versions in package.json:
findstr /R /C:"\"\"" package.json
findstr /R /C:": \"\"" package.json
findstr /R /C:": \"[^0-9]" package.json

echo.
echo Checking for any strange characters:
findstr /R /C:"[^a-zA-Z0-9\.\-\^\~\<\>\=\:\,\{\}\[\]\"\ \t\n\r]" package.json

echo.
echo Let's check the exact content around version fields:
type package.json | findstr /N /C:"version"

pause
