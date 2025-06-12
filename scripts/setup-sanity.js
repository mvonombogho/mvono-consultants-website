// script to set up a proper sanity structure
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a sanity.json file in the root directory
const sanityConfig = {
  "root": true,
  "project": {
    "name": "mvono-consultants"
  },
  "api": {
    "projectId": process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    "dataset": "production"
  },
  "plugins": [
    "@sanity/base",
    "@sanity/components",
    "@sanity/default-layout",
    "@sanity/default-login",
    "@sanity/desk-tool"
  ],
  "parts": [
    {
      "name": "part:@sanity/base/schema",
      "path": "./sanity/schemas/index.js"
    }
  ]
};

fs.writeFileSync(
  path.join(__dirname, '..', 'sanity.json'),
  JSON.stringify(sanityConfig, null, 2)
);

console.log('Created sanity.json file in the root directory');
