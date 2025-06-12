// sanity-test-revised.js
const { createClient } = require('@sanity/client');

// Basic client without token
const publicClient = createClient({
  projectId: 'k6xvho7h',
  dataset: 'production',
  apiVersion: '2025-05-19',
  useCdn: false,
});

async function testBaseConnection() {
  console.log('Testing basic Sanity connection (without token)...');
  
  try {
    // This query should work even without authentication
    const result = await publicClient.fetch(`*[_id == "_.listeners.dev"]`);
    console.log('Basic connection successful!');
    return true;
  } catch (err) {
    console.error('Basic connection error:');
    console.error(err.message);
    console.error('Status code:', err.statusCode);
    console.error('Error details:', err.responseBody || 'No additional details');
    return false;
  }
}

async function testWithToken() {
  console.log('\nTesting with token authentication...');
  
  // Get token from command line argument
  const token = process.argv[2] || 'skSKI57jxpC7LoVpO9OG0bdJVZhx8RqtzwTaIuFxEO45CP8GL1zC38qSvhglbBi0869cJBXOhIoT0AYEtMR0HCy7j7Z6mOvVh4eKamjacav6jOaoZX2DTKWg5XJYoHyHfgIEYMFpywyAGjvPpCk3slPWPgnc652hqSUkmsydN1iHL1mdLEwJ';
  
  if (!token) {
    console.log('No token provided. Skipping authenticated tests.');
    return;
  }
  
  const tokenClient = createClient({
    projectId: 'k6xvho7h',
    dataset: 'production',
    apiVersion: '2025-05-19',
    token: token,
    useCdn: false,
  });
  
  try {
    const result = await tokenClient.fetch('*[_type == "sanity.imageAsset"][0...1]');
    console.log('Token authentication successful!');
    
    // Try to create a simple document
    console.log('\nTesting write access...');
    const doc = {
      _type: 'test',
      _id: 'sanity-test-doc-' + Date.now(),
      title: 'Test Document',
      description: 'Created to test connectivity',
      timestamp: new Date().toISOString()
    };
    
    const createResult = await tokenClient.createOrReplace(doc);
    console.log('Write access successful!');
    console.log('Created document:', createResult);
    
  } catch (err) {
    console.error('Token authentication error:');
    console.error(err.message);
    console.error('Status code:', err.statusCode);
    console.error('Error details:', err.responseBody || 'No additional details');
  }
}

// Main function
async function runTests() {
  const baseConnected = await testBaseConnection();
  
  if (baseConnected) {
    await testWithToken();
  }
  
  console.log('\n==== NEXT STEPS ====');
  console.log('1. Test direct browser access: https://k6xvho7h.api.sanity.io/v2025-05-19/projects');
  console.log('2. Verify project exists at: https://www.sanity.io/manage');
  console.log('3. Try accessing hosted studio: https://k6xvho7h.sanity.studio/');
  console.log('4. If needed, create a new project with: npx sanity init');
}

runTests();
