const fs = require('fs');
const path = require('path');

// Function to get relative path for imports
function getRelativePath(fromPath, toPath) {
  const relative = path.relative(fromPath, toPath);
  return relative.startsWith('.') ? relative : './' + relative;
}

// Function to count directory levels up
function countLevelsUp(filePath) {
  const normalizedPath = path.normalize(filePath);
  const segments = normalizedPath.split(path.sep);
  const apiIndex = segments.indexOf('api');
  if (apiIndex === -1) return 0;
  
  // Count levels after 'api'
  const levelsAfterApi = segments.length - apiIndex - 2; // -2 for api and filename
  return levelsAfterApi;
}

// Function to generate correct import path
function generateImportPath(filePath) {
  const levels = countLevelsUp(filePath);
  const upLevels = '../'.repeat(levels + 2); // +2 to get out of api directory
  return `${upLevels}lib/auth`;
}

// Function to fix authentication imports in a file
function fixAuthImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let newContent = content;
    
    // Check if file already has proper auth imports
    const hasAuthImport = content.includes('from "../../../../lib/auth"') || 
                         content.includes("from '../../../../lib/auth'") ||
                         content.includes('from "../../../../../lib/auth"') ||
                         content.includes("from '../../../../../lib/auth'") ||
                         content.includes('authOptions') && content.includes('lib/auth');
    
    if (hasAuthImport) {
      console.log(`✓ ${filePath} already has proper auth imports`);
      return false;
    }
    
    // Generate correct import path
    const importPath = generateImportPath(filePath);
    
    // Fix missing authOptions import for TypeScript files
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      if (content.includes('getServerSession(authOptions)') && !content.includes('import { authOptions }')) {
        // Add authOptions import
        if (content.includes('import { getServerSession }')) {
          newContent = newContent.replace(
            /import { getServerSession } from "next-auth\/next";/,
            `import { getServerSession } from "next-auth/next";\nimport { authOptions } from "${importPath}";`
          );
          modified = true;
        } else if (content.includes("import { getServerSession } from 'next-auth/next';")) {
          newContent = newContent.replace(
            /import { getServerSession } from 'next-auth\/next';/,
            `import { getServerSession } from 'next-auth/next';\nimport { authOptions } from '${importPath}';`
          );
          modified = true;
        }
      }
      
      // Fix missing auth import for files using auth() function
      if (content.includes('auth()') && !content.includes('import { auth }')) {
        const lastImport = newContent.lastIndexOf('import ');
        if (lastImport !== -1) {
          const endOfLastImport = newContent.indexOf('\n', lastImport);
          newContent = newContent.slice(0, endOfLastImport + 1) + 
                      `import { auth } from '${importPath}';\n` + 
                      newContent.slice(endOfLastImport + 1);
          modified = true;
        }
      }
    }
    
    // Fix missing authOptions import for JavaScript files
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      if (content.includes('getServerSession(authOptions)') && !content.includes('authOptions')) {
        // For JavaScript files, we need to import from the NextAuth route
        const levels = countLevelsUp(filePath);
        const routePath = '../'.repeat(levels) + 'auth/[...nextauth]/route';
        
        const lastImport = newContent.lastIndexOf('import ');
        if (lastImport !== -1) {
          const endOfLastImport = newContent.indexOf('\n', lastImport);
          newContent = newContent.slice(0, endOfLastImport + 1) + 
                      `import { authOptions } from '${routePath}';\n` + 
                      newContent.slice(endOfLastImport + 1);
          modified = true;
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✓ Fixed auth imports in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find API route files
function findApiRoutes(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findApiRoutes(fullPath, files);
    } else if (entry.isFile() && entry.name === 'route.ts' || entry.name === 'route.js') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
function main() {
  const projectRoot = process.cwd();
  const apiDir = path.join(projectRoot, 'app', 'api');
  
  if (!fs.existsSync(apiDir)) {
    console.error('API directory not found!');
    return;
  }
  
  console.log('🔍 Scanning for API route files...');
  const apiFiles = findApiRoutes(apiDir);
  
  console.log(`📁 Found ${apiFiles.length} API route files`);
  
  let fixedCount = 0;
  
  for (const file of apiFiles) {
    if (fixAuthImports(file)) {
      fixedCount++;
    }
  }
  
  console.log(`\n✅ Fixed authentication imports in ${fixedCount} files`);
  console.log('🚀 You can now run: npm run build');
}

// Run the script
main();
