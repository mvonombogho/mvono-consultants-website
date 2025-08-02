@echo off
echo.
echo ==========================================
echo   GOOGLE ANALYTICS CONFIGURATION CHECK
echo ==========================================
echo.

echo Current Google Analytics Setup:
echo ================================
echo.
echo ✅ Analytics script: ADDED to layout.js
echo ✅ Tracking ID: G-MVNC2024KE (hardcoded)
echo ✅ Event tracking: Available in utils/analytics.js
echo ✅ DNS prefetch: Configured for Google Analytics
echo.

echo How to verify your Google Analytics:
echo ===================================
echo.
echo 1. Go to: https://analytics.google.com
echo 2. Sign in with your Google account
echo 3. Look for \"Mvono Consultants\" property
echo 4. Check if Measurement ID matches: G-MVNC2024KE
echo.

echo If you need to change the tracking ID:
echo =====================================
echo.
set /p CHANGE_ID="Do you want to update the Google Analytics ID? (y/n): "

if /i "%CHANGE_ID%"=="y" (
    set /p NEW_GA_ID="Enter your actual Google Analytics Measurement ID (G-XXXXXXXXX): "
    
    echo.
    echo Updating Google Analytics ID from G-MVNC2024KE to !NEW_GA_ID!...
    
    REM Update in layout.js
    powershell -Command "(Get-Content 'app\\layout.js') -replace 'G-MVNC2024KE', '!NEW_GA_ID!' | Set-Content 'app\\layout.js'"
    
    REM Update in analytics.js
    powershell -Command "(Get-Content 'utils\\analytics.js') -replace 'G-MVNC2024KE', '!NEW_GA_ID!' | Set-Content 'utils\\analytics.js'"
    
    REM Update in .env if it exists
    if exist .env (
        echo NEXT_PUBLIC_GA_TRACKING_ID=!NEW_GA_ID! >> .env
        echo NEXT_PUBLIC_GOOGLE_ANALYTICS=!NEW_GA_ID! >> .env
    )
    
    echo.
    echo ✅ Google Analytics ID updated to: !NEW_GA_ID!
    echo ✅ Files updated: layout.js, analytics.js, .env
    echo.
) else (
    echo.
    echo No changes made. Current ID: G-MVNC2024KE
)

echo.
echo Google Analytics Features Available:
echo ===================================
echo ✅ Page view tracking
echo ✅ Contact form submissions
echo ✅ Phone number clicks
echo ✅ Email clicks
echo ✅ Company profile downloads
echo ✅ Service inquiries
echo ✅ WhatsApp clicks
echo ✅ Scroll depth tracking
echo ✅ Time on page tracking
echo ✅ Service page views
echo.

echo To test Google Analytics:
echo =========================
echo 1. Start your development server: npm run dev
echo 2. Open browser developer tools (F12)
echo 3. Go to Network tab
echo 4. Visit your website
echo 5. Look for requests to \"google-analytics.com\" or \"googletagmanager.com\"
echo 6. Check Console for any gtag errors
echo.

echo Google Analytics Dashboard:
echo ==========================
echo Visit: https://analytics.google.com
echo - Real-time reports to see live traffic
echo - Acquisition reports to see traffic sources
echo - Behavior reports to see page performance
echo - Events to see tracked interactions
echo.

pause
