// remove-dashboard.js
// Script to remove dashboard functionality from the Mvono Consultants website
// Run with: node remove-dashboard.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to remove
const directoriesToRemove = [
  './app/dashboard',
  './app/(dashboard)',
  './app/admin',
  './app/login',
  './app/api/dashboard',
  './components/admin',
  './components/dashboard',
  './components/anniversaries',
  './components/anniversary',
  './components/certification',
  './components/certifications',
  './components/competitor',
  './components/competitors',
  './components/compliance',
  './components/documents',
  './components/market-position',
  './components/marketing',
  './components/projects',
  './components/proposals',
  './components/providers/AuthProvider.js',
  './components/providers/AuthProvider.jsx',
  './components/providers/AuthProvider.tsx',
];

// Function to safely remove a directory or file
function safeRemove(pathToRemove) {
  try {
    if (fs.existsSync(pathToRemove)) {
      const stats = fs.statSync(pathToRemove);
      if (stats.isDirectory()) {
        console.log(`Removing directory: ${pathToRemove}`);
        fs.rmSync(pathToRemove, { recursive: true, force: true });
      } else {
        console.log(`Removing file: ${pathToRemove}`);
        fs.unlinkSync(pathToRemove);
      }
      return true;
    } else {
      console.log(`Path does not exist: ${pathToRemove}`);
      return false;
    }
  } catch (error) {
    console.error(`Error removing ${pathToRemove}:`, error.message);
    return false;
  }
}

// Remove each directory/file in the list
let successCount = 0;
let failCount = 0;

for (const dir of directoriesToRemove) {
  const result = safeRemove(dir);
  if (result) {
    successCount++;
  } else {
    failCount++;
  }
}

// Update package.json to remove dashboard-related dependencies
console.log('Updating package.json to remove dashboard-related dependencies...');
try {
  const packageJsonPath = './package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // List of dependencies that might be related to dashboard functionality
  const dashboardDependencies = [
    '@auth/prisma-adapter',
    'next-auth',
  ];

  // Remove dashboard dependencies
  for (const dep of dashboardDependencies) {
    if (packageJson.dependencies[dep]) {
      delete packageJson.dependencies[dep];
      console.log(`Removed dependency: ${dep}`);
    }
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('Updated package.json');
} catch (error) {
  console.error('Error updating package.json:', error.message);
}

console.log('\nDashboard Removal Summary:');
console.log(`Successfully removed: ${successCount} items`);
console.log(`Failed to remove: ${failCount} items`);
console.log('\nNext steps:');
console.log('1. Run "npm install" to update dependencies');
console.log('2. Run "npm run dev" to verify the website works without dashboard');
console.log('3. Remove any remaining references to dashboard functionality');
