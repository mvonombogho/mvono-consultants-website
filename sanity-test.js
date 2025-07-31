// sanity-test.js
const { createClient } = require('@sanity/client');

// Basic client configuration
const client = createClient({
  projectId: 'k6oxvo7b',
  dataset: 'production',
  apiVersion: '2025-05-19',
  token: 'skSKI57jxpC7LoVpO9OG0bdJVZhx8RqtzwTaIuFxEO45CP8GL1zC38qSvhglbBi0869cJBXOhIoT0AYEtMR0HCy7j7Z6mOvVh4eKamjacav6jOaoZX2DTKWg5XJYoHyHfgIEYMFpywyAGjvPpCk3slPWPgnc652hqSUkmsydN1iHL1mdLEwJ',
  useCdn: false,
});

async function testConnection() {
  console.log('Testing Sanity connection...');
  
  try {
    // Try a simple query
    const result = await client.fetch('*[_type == "sanity.imageAsset"][0...1]');
    console.log('Connection successful!');
    console.log('Result:', result);
    
    // Try to create a simple document
    console.log('\nTesting write access...');
    const doc = {
      _type: 'test',
      _id: 'sanity-test-doc-' + Date.now(),
      title: 'Test Document',
      description: 'Created to test connectivity',
      timestamp: new Date().toISOString()
    };
    
    const createResult = await client.createOrReplace(doc);
    console.log('Write access successful!');
    console.log('Created document:', createResult);
    
  } catch (err) {
    console.error('Sanity connection error:');
    console.error(err);
  }
}

testConnection();
