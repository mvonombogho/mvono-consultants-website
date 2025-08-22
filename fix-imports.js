const fs = require('fs');
const path = require('path');

// Define the patterns to replace for different directory depths
const replacements = [
  // Level 3 (api/*/route.ts) - 3 levels deep
  { pattern: /from ['"]@\/lib\/(.*?)['"];?/g, replacement: "from '../../../lib/$1';" },
  { pattern: /from ['"]@\/models\/(.*?)['"];?/g, replacement: "from '../../../models/$1';" },
  { pattern: /from ['"]@\/components\/(.*?)['"];?/g, replacement: "from '../../../components/$1';" },
  { pattern: /from ['"]@\/utils\/(.*?)['"];?/g, replacement: "from '../../../utils/$1';" },
  
  // Level 4 (api/*/*/route.ts) - 4 levels deep  
  { pattern: /from ['"]@\/lib\/(.*?)['"];?/g, replacement: "from '../../../../lib/$1';" },
  { pattern: /from ['"]@\/models\/(.*?)['"];?/g, replacement: "from '../../../../models/$1';" },
  { pattern: /from ['"]@\/components\/(.*?)['"];?/g, replacement: "from '../../../../components/$1';" },
  { pattern: /from ['"]@\/utils\/(.*?)['"];?/g, replacement: "from '../../../../utils/$1';" },
  
  // Level 5 (api/*/*/*/route.ts) - 5 levels deep
  { pattern: /from ['"]@\/lib\/(.*?)['"];?/g, replacement: "from '../../../../../lib/$1';" },
  { pattern: /from ['"]@\/models\/(.*?)['"];?/g, replacement: "from '../../../../../models/$1';" },
  { pattern: /from ['"]@\/components\/(.*?)['"];?/g, replacement: "from '../../../../../components/$1';" },
  { pattern: /from ['"]@\/utils\/(.*?)['"];?/g, replacement: "from '../../../../../utils/$1';" },
];

function getDepthLevel(filePath) {
  const apiIndex = filePath.indexOf('app\\api\\');
  if (apiIndex === -1) return 0;
  
  const afterApi = filePath.substring(apiIndex + 8); // 8 = length of 'app\\api\\'
  const segments = afterApi.split('\\').filter(segment => segment && segment !== 'route.ts' && segment !== 'route.js');
  return segments.length;
}

function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('@/')) {
      return false; // No @/ imports to fix
    }
    
    const depth = getDepthLevel(filePath);
    let newContent = content;
    
    // Apply replacements based on depth
    if (depth === 1) {
      // api/*/route.ts
      newContent = newContent.replace(/from ['"]@\/lib\/(.*?)['"];?/g, "from '../../../lib/$1';");
      newContent = newContent.replace(/from ['"]@\/models\/(.*?)['"];?/g, "from '../../../models/$1';");
      newContent = newContent.replace(/from ['"]@\/components\/(.*?)['"];?/g, "from '../../../components/$1';");
      newContent = newContent.replace(/from ['"]@\/utils\/(.*?)['"];?/g, "from '../../../utils/$1';");
    } else if (depth === 2) {
      // api/*/*/route.ts
      newContent = newContent.replace(/from ['"]@\/lib\/(.*?)['"];?/g, "from '../../../../lib/$1';");
      newContent = newContent.replace(/from ['"]@\/models\/(.*?)['"];?/g, "from '../../../../models/$1';");
      newContent = newContent.replace(/from ['"]@\/components\/(.*?)['"];?/g, "from '../../../../components/$1';");
      newContent = newContent.replace(/from ['"]@\/utils\/(.*?)['"];?/g, "from '../../../../utils/$1';");
    } else if (depth >= 3) {
      // api/*/*/*/route.ts and deeper
      const levels = '../'.repeat(depth + 2);
      newContent = newContent.replace(/from ['"]@\/lib\/(.*?)['"];?/g, `from '${levels}lib/$1';`);
      newContent = newContent.replace(/from ['"]@\/models\/(.*?)['"];?/g, `from '${levels}models/$1';`);
      newContent = newContent.replace(/from ['"]@\/components\/(.*?)['"];?/g, `from '${levels}components/$1';`);
      newContent = newContent.replace(/from ['"]@\/utils\/(.*?)['"];?/g, `from '${levels}utils/$1';`);
    }
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Fixed imports in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  let totalFixed = 0;
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      totalFixed += processDirectory(fullPath);
    } else if (item.endsWith('.ts') || item.endsWith('.js')) {
      if (fixImportsInFile(fullPath)) {
        totalFixed++;
      }
    }
  }
  
  return totalFixed;
}

// Start processing from the API directory
const apiDir = path.join(__dirname, 'app', 'api');
console.log(`Starting import fixes in: ${apiDir}`);

const fixedCount = processDirectory(apiDir);
console.log(`\nFixed imports in ${fixedCount} files.`);
