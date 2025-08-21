@echo off
echo Checking current git status and fixing Sanity dependencies...

echo Current git status:
git status

echo Checking current package.json Sanity versions:
findstr /C:"@sanity" package.json

echo Adding .npmrc for better dependency resolution...
echo legacy-peer-deps=true > .npmrc
echo auto-install-peers=true >> .npmrc

echo Staging changes...
git add package.json .npmrc

echo Current staged changes:
git diff --cached

pause
