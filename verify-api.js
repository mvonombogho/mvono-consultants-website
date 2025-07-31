// Quick test to verify the api.js file is working
console.log("Testing API import...");

// Test if the file exists and can be required
const path = require('path');
const fs = require('fs');

const apiPath = path.join(process.cwd(), 'lib', 'api.js');
console.log("API file path:", apiPath);
console.log("API file exists:", fs.existsSync(apiPath));

const sanityPath = path.join(process.cwd(), 'lib', 'sanity.js');
console.log("Sanity file path:", sanityPath);
console.log("Sanity file exists:", fs.existsSync(sanityPath));

// Test if we can read the file content
try {
  const apiContent = fs.readFileSync(apiPath, 'utf8');
  console.log("✅ API file readable, length:", apiContent.length);
  
  // Check if it has the expected exports
  const hasGetAllPosts = apiContent.includes('export async function getAllPosts');
  const hasGetAllCategories = apiContent.includes('export async function getAllCategories');
  
  console.log("Has getAllPosts export:", hasGetAllPosts);
  console.log("Has getAllCategories export:", hasGetAllCategories);
  
} catch (error) {
  console.error("❌ Error reading API file:", error);
}
