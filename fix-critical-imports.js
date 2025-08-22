// Quick manual fixes for critical import issues
const fs = require('fs');
const path = require('path');

const criticalFixes = [
  // Files with 3 directory levels (app/api/*/route.ts)
  {
    file: 'app/api/invoices/route.ts',
    from: "import { prisma } from '@/lib/prisma';",
    to: "import prisma from '../../../lib/prisma';"
  },
  {
    file: 'app/api/services/route.ts',
    from: "import { authOptions } from '@/lib/auth';",
    to: "import { authOptions } from '../../../lib/auth';"
  },
  {
    file: 'app/api/services/route.ts',
    from: "import prisma from '@/lib/prisma';",
    to: "import prisma from '../../../lib/prisma';"
  },
  {
    file: 'app/api/quotations/route.ts',
    from: "import { prisma } from '@/lib/prisma';",
    to: "import prisma from '../../../lib/prisma';"
  },
  {
    file: 'app/api/compliance-events/route.ts',
    from: "import { authOptions } from '@/lib/auth';",
    to: "import { authOptions } from '../../../lib/auth';"
  },
  {
    file: 'app/api/compliance-events/route.ts',
    from: "import prisma from '@/lib/prisma';",
    to: "import prisma from '../../../lib/prisma';"
  },
  
  // Files with 4 directory levels (app/api/*/*/route.ts)
  {
    file: 'app/api/mongodb/clients/route.ts',
    from: "import connectMongoDB from '@/lib/mongodb';",
    to: "import connectMongoDB from '../../../../lib/mongodb';"
  },
  {
    file: 'app/api/mongodb/clients/route.ts',
    from: "import ClientModel from '@/models/mongoose/Client';",
    to: "import ClientModel from '../../../../models/mongoose/Client';"
  },
  {
    file: 'app/api/invoices/[id]/route.ts',
    from: "import { prisma } from '@/lib/prisma';",
    to: "import prisma from '../../../../lib/prisma';"
  },
  {
    file: 'app/api/compliance-events/[id]/route.ts',
    from: "import { authOptions } from '@/lib/auth';",
    to: "import { authOptions } from '../../../../lib/auth';"
  },
  {
    file: 'app/api/compliance-events/[id]/route.ts',
    from: "import prisma from '@/lib/prisma';",
    to: "import prisma from '../../../../lib/prisma';"
  },
  {
    file: 'app/api/email/invoice/route.ts',
    from: "import { auth } from '@/lib/auth';",
    to: "import { auth } from '../../../../lib/auth';"
  },
  {
    file: 'app/api/email/invoice/route.ts',
    from: "import { prisma } from '@/lib/prisma';",
    to: "import prisma from '../../../../lib/prisma';"
  },
  {
    file: 'app/api/marketing/campaigns/route.ts',
    from: "import { authOptions } from '@/lib/auth';",
    to: "import { authOptions } from '../../../../lib/auth';"
  },
  {
    file: 'app/api/dashboard/activities/route.ts',
    from: "import { authOptions } from '@/lib/auth';",
    to: "import { authOptions } from '../../../../lib/auth';"
  },
  {
    file: 'app/api/dashboard/activities/route.ts',
    from: "import { db } from '@/lib/db';",
    to: "import prisma from '../../../../lib/prisma';"
  },
  {
    file: 'app/api/dashboard/stats/route.ts',
    from: "import { authOptions } from '@/lib/auth';",
    to: "import { authOptions } from '../../../../lib/auth';"
  },
  {
    file: 'app/api/dashboard/stats/route.ts',
    from: "import { db } from '@/lib/db';",
    to: "import prisma from '../../../../lib/prisma';"
  }
];

// Apply the fixes
console.log('Applying critical manual fixes...\n');

let fixedCount = 0;
for (const fix of criticalFixes) {
  const filePath = path.join(__dirname, fix.file);
  
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes(fix.from)) {
        content = content.replace(fix.from, fix.to);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${fix.file}`);
        fixedCount++;
      }
    } catch (error) {
      console.log(`✗ Error fixing ${fix.file}: ${error.message}`);
    }
  } else {
    console.log(`⚠ File not found: ${fix.file}`);
  }
}

// Additional fixes for db -> prisma replacements
const dbReplacements = [
  'app/api/dashboard/activities/route.ts',
  'app/api/dashboard/stats/route.ts'
];

console.log('\nReplacing db references with prisma...\n');

for (const file of dbReplacements) {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      
      // Replace all db. with prisma.
      if (content.includes('db.')) {
        content = content.replace(/\bdb\./g, 'prisma.');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Replaced db references in: ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.log(`✗ Error fixing ${file}: ${error.message}`);
    }
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Total fixes applied: ${fixedCount}`);
console.log('Critical import fixes complete!\n');
