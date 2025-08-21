@echo off
echo Forcing Vercel to recognize the latest commit...

echo Creating a small trigger change to force redeploy...
echo. >> README.md
echo # Deployment Fix - %date% %time% >> README.md

echo Adding and committing trigger change...
git add README.md
git commit -m "Trigger Vercel redeploy with latest Sanity fixes"

echo Pushing trigger commit...
git push origin main

echo.
echo Latest commits:
git log --oneline -3

echo.
echo ✅ This should force Vercel to use commit with Sanity v7.9.0
echo Monitor your Vercel dashboard now!
pause
