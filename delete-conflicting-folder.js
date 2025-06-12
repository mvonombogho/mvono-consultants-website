// delete-conflicting-folder.js
// Run this script with: node delete-conflicting-folder.js

const fs = require('fs');
const path = require('path');

try {
  // First, remove the page.jsx file
  const filePath = path.join(__dirname, 'app', 'studio', '[[...tool]]', 'page.jsx');
  fs.unlinkSync(filePath);
  console.log('Deleted page.jsx file');
  
  // Then try to remove the directory
  const dirPath = path.join(__dirname, 'app', 'studio', '[[...tool]]');
  fs.rmdirSync(dirPath);
  console.log('Successfully deleted [[...tool]] directory');
} catch (err) {
  console.error('Error during deletion:', err);
}
