// Comprehensive script to fix all @/ import issues in the project
const fs = require('fs');
const path = require('path');

// Map of @/ imports to their relative path replacements based on directory depth
const importMappings = {
  // Level 3: app/api/*/route.ts
  3: {
    '@/lib/': '../../../lib/',
    '@/models/': '../../../models/',
    '@/components/': '../../../components/',
    '@/utils/': '../../../utils/',
    '@/types/': '../../../types/'
  },
  // Level 4: app/api/*/*/route.ts  
  4: {
    '@/lib/': '../../../../lib/',
    '@/models/': '../../../../models/',
    '@/components/': '../../../../components/',
    '@/utils/': '../../../../utils/',
    '@/types/': '../../../../types/'
  },
  // Level 5: app/api/*/*/*/route.ts
  5: {
    '@/lib/': '../../../../../lib/',
    '@/models/': '../../../../../models/',
    '@/components/': '../../../../../components/',
    '@/utils/': '../../../../../utils/',
    '@/types/': '../../../../../types/'
  },
  // Level 6: app/api/*/*/*/*/route.ts
  6: {
    '@/lib/': '../../../../../../lib/',
    '@/models/': '../../../../../../models/',
    '@/components/': '../../../../../../components/',
    '@/utils/': '../../../../../../utils/',
    '@/types/': '../../../../../../types/'
  }
};

function getDirectoryDepth(filePath) {
  // Find the position of 'app/api/' and calculate depth from there
  const appApiIndex = filePath.indexOf('app\\api\\');
  if (appApiIndex === -1) return 0;
  
  const afterApi = filePath.substring(appApiIndex + 8); // 8 = length of 'app\\api\\'
  const segments = afterApi.split('\\').filter(segment => 
    segment && segment !== 'route.ts' && segment !== 'route.js'
  );
  return segments.length + 2; // +2 for app and api directories
}

function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('@/')) {
      return { fixed: false, reason: 'No @/ imports found' };
    }
    
    const depth = getDirectoryDepth(filePath);
    const mappings = importMappings[depth];
    
    if (!mappings) {
      return { fixed: false, reason: `No mappings for depth ${depth}` };
    }
    
    let newContent = content;
    let changesMade = false;
    
    // Apply each mapping
    for (const [fromPattern, toPattern] of Object.entries(mappings)) {
      const regex = new RegExp(`from ['"]${fromPattern.replace('/', '\\/')}([^'"]*?)['"];?`, 'g');
      const newPattern = `from '${toPattern}$1';`;
      
      if (regex.test(newContent)) {
        newContent = newContent.replace(regex, newPattern);
        changesMade = true;
      }
    }
    
    // Fix specific import patterns
    if (newContent.includes('import { prisma }')) {
      newContent = newContent.replace(/import \{ prisma \}/g, 'import prisma');
      changesMade = true;
    }
    
    if (newContent.includes('import { db }')) {
      newContent = newContent.replace(/import \{ db \}/g, 'import prisma');
      newContent = newContent.replace(/\bdb\./g, 'prisma.');
      changesMade = true;
    }
    
    if (changesMade) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return { fixed: true, depth, changes: 'Fixed imports' };
    }
    
    return { fixed: false, reason: 'No changes needed' };
  } catch (error) {
    return { fixed: false, reason: `Error: ${error.message}` };
  }
}

function processDirectory(dirPath) {
  const results = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        results.push(...processDirectory(fullPath));
      } else if (item.endsWith('.ts') || item.endsWith('.js')) {
        const result = fixImportsInFile(fullPath);
        results.push({
          file: fullPath,
          ...result
        });
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
  
  return results;
}

// List of specific files that need manual fixes
const specificFixes = [
  {
    file: 'app/api/invoices/route.ts',
    fixes: [
      { from: "import { prisma } from '@/lib/prisma';", to: "import prisma from '../../../lib/prisma';" }
    ]
  },
  {
    file: 'app/api/services/route.ts', 
    fixes: [
      { from: "import { authOptions } from '@/lib/auth';", to: "import { authOptions } from '../../../lib/auth';" },
      { from: "import prisma from '@/lib/prisma';", to: "import prisma from '../../../lib/prisma';" }
    ]
  },
  {
    file: 'app/api/quotations/route.ts',
    fixes: [
      { from: "import { prisma } from '@/lib/prisma';", to: "import prisma from '../../../lib/prisma';" }
    ]
  },
  {
    file: 'app/api/compliance-events/route.ts',
    fixes: [
      { from: "import { authOptions } from '@/lib/auth';", to: "import { authOptions } from '../../../lib/auth';" },
      { from: "import prisma from '@/lib/prisma';", to: "import prisma from '../../../lib/prisma';" }
    ]
  },
  {
    file: 'app/api/mongodb/clients/route.ts',
    fixes: [
      { from: "import connectMongoDB from '@/lib/mongodb';", to: "import connectMongoDB from '../../../../lib/mongodb';" },
      { from: "import ClientModel from '@/models/mongoose/Client';", to: "import ClientModel from '../../../../models/mongoose/Client';" }
    ]
  },
  {
    file: 'app/api/invoices/[id]/route.ts',
    fixes: [
      { from: "import { prisma } from '@/lib/prisma';", to: "import prisma from '../../../../lib/prisma';" }
    ]
  }
];

// Execute the fixes
console.log('Starting comprehensive import fixes...\n');

// First, process all directories
const baseDir = path.join(__dirname, 'app', 'api');
console.log(`Processing directory: ${baseDir}`);
const results = processDirectory(baseDir);

// Apply specific fixes
console.log('\nApplying specific fixes...');
for (const fix of specificFixes) {
  const filePath = path.join(__dirname, fix.file);
  
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      
      for (const { from, to } of fix.fixes) {
        if (content.includes(from)) {
          content = content.replace(from, to);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${fix.file}`);
      }
    } catch (error) {
      console.log(`✗ Error fixing ${fix.file}: ${error.message}`);
    }
  } else {
    console.log(`⚠ File not found: ${fix.file}`);
  }
}

// Report results
console.log('\n=== SUMMARY ===');
const fixed = results.filter(r => r.fixed);
const errors = results.filter(r => !r.fixed && r.reason.startsWith('Error'));

console.log(`Total files processed: ${results.length}`);
console.log(`Successfully fixed: ${fixed.length}`);
console.log(`Errors: ${errors.length}`);

if (fixed.length > 0) {
  console.log('\nFixed files:');
  fixed.forEach(f => {
    console.log(`  ✓ ${f.file.split('\\').slice(-3).join('\\')}`);
  });
}

if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(e => {
    console.log(`  ✗ ${e.file.split('\\').slice(-3).join('\\')}: ${e.reason}`);
  });
}

console.log('\nDone!');
