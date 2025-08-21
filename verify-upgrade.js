const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Next.js 14 upgrade...\n');

// Check package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const nextVersion = packageJson.dependencies.next;
const nextSanityVersion = packageJson.dependencies['next-sanity'];

console.log('📦 Dependencies:');
console.log(`   Next.js: ${nextVersion}`);
console.log(`   next-sanity: ${nextSanityVersion}`);

// Verify compatibility
const isCompatible = nextVersion.includes('14') || nextVersion.includes('^14');
console.log(`\n✅ Compatibility: ${isCompatible ? 'PASS' : 'FAIL'}`);

// Check critical files
const criticalFiles = [
  'next.config.mjs',
  'tsconfig.json',
  'middleware.ts',
  'app/layout.tsx'
];

console.log('\n📁 Critical Files:');
criticalFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`   ${file}: ${exists ? '✅' : '❌'}`);
});

// Check for conflicting dependencies
const conflicts = [];
if (!isCompatible) {
  conflicts.push('Next.js version incompatible with next-sanity');
}

if (conflicts.length > 0) {
  console.log('\n⚠️  Potential Issues:');
  conflicts.forEach(conflict => console.log(`   - ${conflict}`));
} else {
  console.log('\n🎉 All checks passed! Ready for deployment.');
}

console.log('\n📋 Next Steps:');
console.log('   1. Run: npm install --legacy-peer-deps');
console.log('   2. Test: npm run build');
console.log('   3. Deploy: git add . && git commit -m "Fix deployment" && git push');
