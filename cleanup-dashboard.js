const fs = require('fs');
const path = require('path');

function removeDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Removed: ${dirPath}`);
    }
  } catch (error) {
    console.log(`Could not remove ${dirPath}: ${error.message}`);
  }
}

function removeFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Removed file: ${filePath}`);
    }
  } catch (error) {
    console.log(`Could not remove ${filePath}: ${error.message}`);
  }
}

console.log('Starting cleanup of dashboard and management system components...');

// Remove main dashboard directories
removeDirectory('./app/dashboard');
removeDirectory('./app/(dashboard)');
removeDirectory('./app/admin');

// Remove specific API routes for management system
removeDirectory('./app/api/dashboard');
removeDirectory('./app/api/admin');
removeDirectory('./app/api/auth');
removeDirectory('./app/api/clients');
removeDirectory('./app/api/invoices');
removeDirectory('./app/api/projects');
removeDirectory('./app/api/proposals');
removeDirectory('./app/api/documents');
removeDirectory('./app/api/competitors');
removeDirectory('./app/api/certifications');
removeDirectory('./app/api/compliance-events');
removeDirectory('./app/api/leads');
removeDirectory('./app/api/market-position');
removeDirectory('./app/api/marketing');
removeDirectory('./app/api/quotations');
removeDirectory('./app/api/sales');
removeDirectory('./app/api/service-anniversaries');
removeDirectory('./app/api/register');

// Remove dashboard components
removeDirectory('./components/dashboard');
removeDirectory('./components/admin');
removeDirectory('./components/client');
removeDirectory('./components/finance');
removeDirectory('./components/invoice');
removeDirectory('./components/project');
removeDirectory('./components/proposal');
removeDirectory('./components/subcontractor');
removeDirectory('./components/competitor');
removeDirectory('./components/document');
removeDirectory('./components/analytics');

// Remove src dashboard components
removeDirectory('./src/components/dashboard');
removeDirectory('./src/components/admin');

// Remove database models and configs
removeDirectory('./models');
removeDirectory('./prisma');
removeFile('./lib/db.js');
removeFile('./lib/mongodb.js');

// Remove authentication middleware
removeFile('./middleware.ts');
removeFile('./middleware.js');

// Remove login pages
removeDirectory('./app/login');
removeDirectory('./app/login.disabled');

// Clean up next.js build files
removeDirectory('./.next');

console.log('Cleanup completed! Your website is now restored to its original state.');
