@echo off
cd /d "%~dp0"

echo Starting comprehensive cleanup of dashboard and management system...

REM Remove all dashboard-related directories
if exist "app\dashboard" (
    echo Removing app\dashboard...
    rmdir /s /q "app\dashboard"
)

if exist "app\(dashboard)" (
    echo Removing app\(dashboard)...
    rmdir /s /q "app\(dashboard)"
)

if exist "app\admin" (
    echo Removing app\admin...
    rmdir /s /q "app\admin"
)

REM Remove management system API routes
if exist "app\api\dashboard" rmdir /s /q "app\api\dashboard"
if exist "app\api\admin" rmdir /s /q "app\api\admin"
if exist "app\api\auth" rmdir /s /q "app\api\auth"
if exist "app\api\clients" rmdir /s /q "app\api\clients"
if exist "app\api\invoices" rmdir /s /q "app\api\invoices"
if exist "app\api\projects" rmdir /s /q "app\api\projects"
if exist "app\api\proposals" rmdir /s /q "app\api\proposals"
if exist "app\api\documents" rmdir /s /q "app\api\documents"
if exist "app\api\competitors" rmdir /s /q "app\api\competitors"
if exist "app\api\certifications" rmdir /s /q "app\api\certifications"
if exist "app\api\compliance-events" rmdir /s /q "app\api\compliance-events"
if exist "app\api\leads" rmdir /s /q "app\api\leads"
if exist "app\api\market-position" rmdir /s /q "app\api\market-position"
if exist "app\api\marketing" rmdir /s /q "app\api\marketing"
if exist "app\api\quotations" rmdir /s /q "app\api\quotations"
if exist "app\api\sales" rmdir /s /q "app\api\sales"
if exist "app\api\service-anniversaries" rmdir /s /q "app\api\service-anniversaries"
if exist "app\api\register" rmdir /s /q "app\api\register"

REM Remove dashboard components
if exist "components\dashboard" rmdir /s /q "components\dashboard"
if exist "components\admin" rmdir /s /q "components\admin"
if exist "components\client" rmdir /s /q "components\client"
if exist "components\finance" rmdir /s /q "components\finance"
if exist "components\invoice" rmdir /s /q "components\invoice"
if exist "components\project" rmdir /s /q "components\project"
if exist "components\proposal" rmdir /s /q "components\proposal"
if exist "components\subcontractor" rmdir /s /q "components\subcontractor"
if exist "components\competitor" rmdir /s /q "components\competitor"
if exist "components\document" rmdir /s /q "components\document"
if exist "components\analytics" rmdir /s /q "components\analytics"

REM Remove src components
if exist "src\components\dashboard" rmdir /s /q "src\components\dashboard"
if exist "src\components\admin" rmdir /s /q "src\components\admin"

REM Remove database and auth files
if exist "models" rmdir /s /q "models"
if exist "prisma" rmdir /s /q "prisma"
if exist "lib\db.js" del "lib\db.js"
if exist "lib\mongodb.js" del "lib\mongodb.js"
if exist "middleware.ts" del "middleware.ts"
if exist "middleware.js" del "middleware.js"

REM Remove login pages
if exist "app\login" rmdir /s /q "app\login"
if exist "app\login.disabled" rmdir /s /q "app\login.disabled"

REM Clean Next.js build files
if exist ".next" rmdir /s /q ".next"

REM Remove overview page (part of management system)
if exist "app\overview" rmdir /s /q "app\overview"

REM Remove clients page (part of management system)
if exist "app\clients" rmdir /s /q "app\clients"

echo Cleanup completed!
echo Your website has been restored to its original state.
echo Only the public website pages (home, about, services, contact, etc.) remain.
pause
