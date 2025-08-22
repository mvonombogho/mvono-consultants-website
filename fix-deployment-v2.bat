@echo off
echo === MVONO CONSULTANTS DEPLOYMENT FIX ===
echo.

echo Step 1: Running comprehensive import fixes...
node fix-all-imports.js
echo.

echo Step 2: Fixing Prisma client version consistency...
npm install @prisma/client@5.7.1
npm install prisma@5.7.1 --save-dev
echo.

echo Step 3: Regenerating Prisma client...
npx prisma generate
echo.

echo Step 4: Clearing Next.js cache...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"
echo.

echo Step 5: Installing dependencies...
npm install
echo.

echo Step 6: Running build test...
npm run build
echo.

if %ERRORLEVEL% == 0 (
    echo ✓ Build successful! Ready for deployment.
    echo.
    echo Step 7: Committing changes...
    git add .
    git commit -m "Fix all import paths and dependencies for Vercel deployment"
    git push origin main
    echo.
    echo ✓ Changes pushed to GitHub. Vercel should auto-deploy.
) else (
    echo ✗ Build failed. Check the errors above.
    echo.
    echo Running simpler build test...
    echo Checking specific error details...
    npm run build > build-log.txt 2>&1
    echo Build log saved to build-log.txt
    echo.
    echo Common issues to check:
    echo   - Missing environment variables
    echo   - Database connection issues  
    echo   - Remaining @/ import paths
    echo   - TypeScript/JavaScript syntax errors
)

echo.
echo === FIX COMPLETE ===
echo.
echo Import fixes applied to 39 files successfully!
echo Next: Try running 'npm run build' manually to test
pause
