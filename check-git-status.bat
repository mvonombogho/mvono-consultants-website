@echo off
echo Checking git status and verifying lib files...

echo Current git status:
git status

echo.
echo Checking if lib files are tracked:
git ls-files lib/

echo.
echo Manual check - do the files exist?
if exist lib\auth.js echo ✅ lib\auth.js exists
if exist lib\auth.ts echo ✅ lib\auth.ts exists  
if exist lib\prisma.js echo ✅ lib\prisma.js exists
if exist lib\prisma.ts echo ✅ lib\prisma.ts exists
if exist lib\auth-options.js echo ✅ lib\auth-options.js exists

echo.
echo Forcing add of all lib files:
git add lib/ -f

echo Checking what's staged:
git diff --cached --name-only

pause
