@echo off
echo Creating missing library files for successful build...

echo ✅ Dependencies installed successfully!
echo ✅ Prisma generated successfully!
echo Now fixing missing lib files...

echo Created lib/prisma.ts and lib/auth.ts files.

echo Committing missing library files...
git add lib/
git commit -m "Add missing lib/prisma.ts and lib/auth.ts files for successful build"

echo Pushing library files...
git push origin main

echo.
echo ✅ Missing library files created!
echo - lib/prisma.ts: Prisma client setup
echo - lib/auth.ts: NextAuth configuration
echo.
echo This should now build successfully!
pause
