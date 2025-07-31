// setup-fresh-sanity.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up a fresh Sanity project for Mvono Consultants...');

// Function to run commands and log output
function runCommand(command) {
  console.log(`\n> ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Check if Sanity CLI is installed
try {
  execSync('npx sanity --version', { encoding: 'utf8' });
} catch (error) {
  console.log('Installing Sanity CLI...');
  runCommand('npm install @sanity/cli --save-dev');
}

// Create a temporary folder for Sanity initialization
const tempFolder = path.join(__dirname, 'temp-sanity-setup');
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder);
}

// Initialize a new Sanity project
console.log('\nInitializing a new Sanity project...');
console.log('Follow the prompts to set up your project:');
console.log('1. Login with your Sanity account when prompted');
console.log('2. Create a new project with a name like "Mvono Consultants Website"');
console.log('3. Use the default dataset name "production"');
console.log('4. Choose "Clean project with no predefined schemas"');
console.log('5. Skip the sample studio customization');

// Move to temp folder for initialization
process.chdir(tempFolder);
runCommand('npx sanity init');

// Find the sanity.json file to extract project info
const sanityJsonPath = path.join(tempFolder, 'sanity.json');
if (!fs.existsSync(sanityJsonPath)) {
  console.error('Could not find sanity.json. Project creation may have failed.');
  process.exit(1);
}

const sanityJson = JSON.parse(fs.readFileSync(sanityJsonPath, 'utf8'));
const projectId = sanityJson.api.projectId;
const dataset = sanityJson.api.dataset;

console.log(`\nSanity project created successfully!`);
console.log(`Project ID: ${projectId}`);
console.log(`Dataset: ${dataset}`);

// Create a token
console.log('\nCreating an API token for your project...');
console.log('Follow the prompts:');
console.log('1. Name your token (e.g., "Mvono Website Token")');
console.log('2. Choose "Editor" permissions');
const tokenResult = runCommand('npx sanity manage');

// Update the project's .env file with new info
console.log('\nUpdating your .env file with the new project details...');
const envPath = path.join(__dirname, '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace Sanity config
  envContent = envContent.replace(/NEXT_PUBLIC_SANITY_PROJECT_ID=.*/g, `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}`);
  envContent = envContent.replace(/NEXT_PUBLIC_SANITY_DATASET=.*/g, `NEXT_PUBLIC_SANITY_DATASET=${dataset}`);
  
  // Keep other values intact
} else {
  envContent = `
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}
NEXT_PUBLIC_SANITY_DATASET=${dataset}
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-19
# Add your new token below:
# SANITY_API_TOKEN=your_new_token_here
`;
}

fs.writeFileSync(envPath, envContent);

// Also update sanity.cli.js
const sanityCliPath = path.join(__dirname, 'sanity.cli.js');
const sanityCliContent = `/**
* This configuration file lets you run \`$ sanity [command]\` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({ 
  api: { 
    projectId: '${projectId}', 
    dataset: '${dataset}' 
  } 
})
`;
fs.writeFileSync(sanityCliPath, sanityCliContent);

// Clean up temp folder
console.log('\nCleaning up temporary files...');
try {
  fs.rmSync(tempFolder, { recursive: true, force: true });
} catch (error) {
  console.log('Could not remove temp folder. You can delete it manually.');
}

console.log('\n===== SUCCESS =====');
console.log('Your new Sanity project has been set up!');
console.log(`1. Add your new API token to the .env file`);
console.log(`2. Run 'npm run dev' to start your Next.js app`);
console.log(`3. Access Sanity Studio at http://localhost:3000/studio`);
console.log(`4. Or use the hosted version at https://${projectId}.sanity.studio/`);
