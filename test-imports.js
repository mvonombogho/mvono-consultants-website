// Test script to verify imports are working
console.log("Testing module imports...");

try {
  // Test the API import
  const api = require('./lib/api.js');
  console.log("✅ API module loaded successfully");
  console.log("Available functions:", Object.keys(api));
} catch (error) {
  console.error("❌ Error loading API module:", error.message);
}

try {
  // Test the Sanity import
  const sanity = require('./lib/sanity.js');
  console.log("✅ Sanity module loaded successfully");
  console.log("Available exports:", Object.keys(sanity));
} catch (error) {
  console.error("❌ Error loading Sanity module:", error.message);
}

console.log("Test complete.");
