@echo off
echo Testing with absolutely minimal package.json...

echo Applying minimal Next.js only package.json...
copy package-minimal-test.json package.json

echo Removing all potential problematic files...
if exist package-lock.json del package-lock.json
if exist yarn.lock del yarn.lock
if exist .npmrc del .npmrc

echo Committing minimal package.json...
git add package.json
git commit -m "Test with minimal package.json to isolate Invalid Version error"

echo Pushing minimal test...
git push origin main

echo.
echo ✅ Testing with only Next.js, React, and TypeScript...
echo If this fails, there's a fundamental issue with the project setup.
echo If this succeeds, we can add packages back one by one.
pause
