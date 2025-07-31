// Test script to check categories
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'k6xvho7h',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-05-19'
});

async function testCategories() {
  console.log('🔍 Testing categories...');
  
  try {
    // Get blog posts with categories
    const posts = await client.fetch(
      `*[_type == "blog" && defined(categories)] {
        _id,
        title,
        "categories": categories[]
      }`
    );
    
    console.log(`✅ Found ${posts.length} blog posts with categories`);
    
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Categories: ${post.categories?.join(', ') || 'No categories'}`);
      console.log('---');
    });
    
    // Extract unique categories
    const allCategories = posts.flatMap(post => post.categories || []);
    const uniqueCategories = [...new Set(allCategories)];
    
    console.log('\n📋 Unique categories found:');
    uniqueCategories.forEach((category, index) => {
      console.log(`${index + 1}. ${category}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testCategories();
