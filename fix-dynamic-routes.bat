# Removing duplicate dynamic route directories to fix Next.js conflict

echo "Removing conflicting [opportunityId] directories..."

# Remove the dashboard route
if exist "app\(dashboard)\(routes)\cross-sell\[opportunityId]" (
    rmdir /s /q "app\(dashboard)\(routes)\cross-sell\[opportunityId]"
    echo "Removed app\(dashboard)\(routes)\cross-sell\[opportunityId]"
)

# Remove the API route  
if exist "app\api\marketing\cross-sell\[opportunityId]" (
    rmdir /s /q "app\api\marketing\cross-sell\[opportunityId]"
    echo "Removed app\api\marketing\cross-sell\[opportunityId]"
)

echo "Conflict resolved - keeping [id] versions as they are the standard"
pause
