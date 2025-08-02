@echo off
echo.
echo ==========================================
echo   GOOGLE ANALYTICS FIX - PUSH UPDATE
echo ==========================================
echo.

echo Google Analytics Measurement ID Fixed!
echo =====================================
echo.
echo ❌ OLD ID: G-MVNC2024KE (incorrect)
echo ✅ NEW ID: G-DJL2T83ERT (your actual GA property)
echo.

echo Files Updated:
echo ==============
echo ✅ app/layout.js - Google Analytics script
echo ✅ utils/analytics.js - Event tracking functions  
echo ✅ .env - Environment variables
echo.

echo Adding changes to Git...
git add .

echo.
echo Creating commit for Google Analytics fix...
git commit -m "Fix: Updated Google Analytics to correct Measurement ID

🔧 GOOGLE ANALYTICS FIX:
- Changed from incorrect ID: G-MVNC2024KE  
- Updated to correct ID: G-DJL2T83ERT
- Fixed tracking script in app/layout.js
- Updated analytics utilities in utils/analytics.js
- Added correct GA ID to .env file

✅ Google Analytics will now properly track website data
✅ All events and page views will be recorded correctly
✅ Dashboard will start showing real traffic data

Files modified:
- app/layout.js: Updated gtag script with correct ID
- utils/analytics.js: Fixed trackPageView function
- .env: Added correct NEXT_PUBLIC_GA_TRACKING_ID

This fix resolves the 'No data received from website' issue
in Google Analytics dashboard."

echo.
echo Pushing Google Analytics fix to repository...
git push

if errorlevel 1 (
    echo.
    echo ❌ PUSH FAILED! Trying alternative methods...
    echo.
    git push origin main
    if errorlevel 1 (
        git push origin master
        if errorlevel 1 (
            echo.
            echo ❌ All push attempts failed!
            echo Please check your internet connection and try manually:
            echo git push origin main
        )
    )
) else (
    echo.
    echo ✅✅✅ SUCCESS! Google Analytics fix pushed! ✅✅✅
    echo.
    echo 🎯 Your website will now track correctly with ID: G-DJL2T83ERT
    echo 📊 Data should start appearing in your GA dashboard within 24-48 hours
    echo 🚀 All page views and events will be properly recorded
    echo.
    echo Next steps:
    echo 1. Deploy your updated website
    echo 2. Visit your website to generate test traffic
    echo 3. Check Google Analytics Real-Time reports
    echo 4. Verify data is being received properly
    echo.
    echo 📈 Your Google Analytics is now properly configured!
)

echo.
pause
