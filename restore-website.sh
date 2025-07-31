#!/bin/bash

echo "Removing all dashboard and management system components..."

# Remove dashboard directories
rm -rf app/dashboard
rm -rf app/\(dashboard\)
rm -rf app/admin
rm -rf app/overview
rm -rf app/clients

# Remove management API routes
rm -rf app/api/dashboard
rm -rf app/api/admin
rm -rf app/api/auth
rm -rf app/api/clients
rm -rf app/api/invoices
rm -rf app/api/projects
rm -rf app/api/proposals
rm -rf app/api/documents
rm -rf app/api/competitors
rm -rf app/api/certifications
rm -rf app/api/compliance-events
rm -rf app/api/leads
rm -rf app/api/market-position
rm -rf app/api/marketing
rm -rf app/api/quotations
rm -rf app/api/sales
rm -rf app/api/service-anniversaries
rm -rf app/api/register

# Remove dashboard components
rm -rf components/dashboard
rm -rf components/admin
rm -rf components/client
rm -rf components/finance
rm -rf components/invoice
rm -rf components/project
rm -rf components/proposal
rm -rf components/subcontractor
rm -rf components/competitor
rm -rf components/document
rm -rf components/analytics
rm -rf components/anniversaries
rm -rf components/anniversary
rm -rf components/certification
rm -rf components/certifications
rm -rf components/competitors
rm -rf components/compliance
rm -rf components/documents
rm -rf components/market-position
rm -rf components/marketing
rm -rf components/projects
rm -rf components/proposals

# Remove database stuff
rm -rf models
rm -rf prisma
rm -f lib/db.js
rm -f lib/mongodb.js
rm -f middleware.ts
rm -f middleware.js

# Remove login
rm -rf app/login
rm -rf app/login.disabled

# Clean build
rm -rf .next

echo "Dashboard system completely removed!"
echo "Your original website is restored!"
