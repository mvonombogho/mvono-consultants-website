#!/usr/bin/env bash

# Script to remove dashboard functionality from the Mvono Consultants website

echo "Starting dashboard removal process..."

# Directories to remove
echo "Removing dashboard directories..."
rm -rf app/dashboard
rm -rf app/\(dashboard\)
rm -rf app/admin
rm -rf app/login
rm -rf app/api/dashboard
rm -rf components/admin
rm -rf components/dashboard
rm -rf components/anniversaries
rm -rf components/anniversary
rm -rf components/certification
rm -rf components/certifications
rm -rf components/competitor
rm -rf components/competitors
rm -rf components/compliance
rm -rf components/documents
rm -rf components/market-position
rm -rf components/marketing
rm -rf components/projects
rm -rf components/proposals
rm -rf components/providers

# Remove related modules from package.json
echo "Installing dependencies without dashboard-related packages..."
npm install

# Verify project structure
echo "Checking directory structure..."
find . -type d -name "dashboard" -o -name "admin" | grep -v "node_modules"

echo "Dashboard removal process completed."
echo "Next steps:"
echo "1. Run 'npm run dev' to verify the website works correctly"
echo "2. Commit the changes to your repository"
