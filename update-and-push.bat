@echo off
echo.
echo ==========================================
echo   MVONO CONSULTANTS - UPDATE PUSH
echo ==========================================
echo.

echo Checking repository status...
git status

echo.
echo Adding all changes...
git add .

echo.
echo Creating commit for footer fix...
git commit -m "Fix: Resolved double footer issue on blog page

🐛 FIXED: Double footer bug on /blog route
- Removed duplicate navbar and footer from blog layout  
- Blog page now uses main app layout navbar
- Single footer rendering from blog page component
- Improved layout consistency across all pages

Technical changes:
- Updated app/blog/layout.jsx to remove duplicate components
- Cleaned up component imports in blog layout
- Maintained functionality while fixing visual issues

✅ Blog page now displays correctly with proper layout
✅ No more duplicate footers or navbars
✅ Consistent navigation experience site-wide"

echo.
echo Pushing updates to existing repository...
git push

if errorlevel 1 (
    echo.
    echo ❌ PUSH FAILED!
    echo.
    echo Trying alternative push methods...
    echo.
    echo Attempting: git push origin main
    git push origin main
    
    if errorlevel 1 (
        echo.
        echo Still failed. Trying: git push origin master
        git push origin master
        
        if errorlevel 1 (
            echo.
            echo ❌ All push attempts failed!
            echo.
            echo Please check:
            echo 1. Internet connection
            echo 2. GitHub authentication
            echo 3. Repository permissions
            echo.
            echo You can try manually:
            echo git pull origin main
            echo git push origin main
        )
    )
) else (
    echo.
    echo ✅ SUCCESS! Footer fix pushed to existing repository!
    echo.
    echo 🔧 Fixed: Double footer issue on blog page resolved
    echo 📱 Layout consistency improved across all pages
    echo.
    echo Changes pushed successfully to your existing repo.
)

echo.
echo Current repository status:
git status

echo.
pause
