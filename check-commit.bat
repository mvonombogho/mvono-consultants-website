@echo off
echo Checking what was actually committed...

echo Last commit details:
git log --oneline -1

echo Checking if package.json changes were included:
git show HEAD --name-only

echo Current package.json sanity version:
findstr /C:"@sanity/client" package.json

echo Checking git status:
git status

echo.
echo If package.json shows ^6.10.0, the commit didn't include the changes.
echo We need to commit the package.json file properly.
pause
