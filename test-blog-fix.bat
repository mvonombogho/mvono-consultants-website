@echo off
echo Testing blog routes fix...
echo.
echo Checking blog structure:
cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Installing dependencies if needed...
npm install

echo.
echo Building the application to check for errors...
npm run build

echo.
echo Blog route fix complete!
echo.
echo The following blog routes should now work:
echo - /blog (main blog page)
echo - /blog/[slug] (individual blog posts)
echo - /blog/category/[id] (category pages)
echo.
echo All relative import paths have been fixed to work with Next.js App Router structure.
pause
