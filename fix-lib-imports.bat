@echo off
echo Fixing lib imports by using existing auth configuration...

echo ✅ Found existing auth-options.js file
echo ✅ Created auth.ts that exports from existing auth-options.js  
echo ✅ Updated prisma.ts with correct default export

echo Committing lib import fixes...
git add lib/auth.ts lib/prisma.ts
git commit -m "Fix lib imports: use existing auth-options and fix prisma default export"

echo Pushing lib import fixes...
git push origin main

echo.
echo ✅ Library import fixes applied!
echo - lib/auth.ts: Re-exports from existing auth-options.js
echo - lib/prisma.ts: Fixed to use default export
echo.
echo This should resolve the module not found errors!
pause
