// Test script to check if blog posts are being fetched correctly (CommonJS version)
const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: 'k6xvho7h',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-05-19'
});

async function testBlogFetch() {
  console.log('🔍 Testing blog post fetch...');
  
  try {
    const posts = await client.fetch(
      `*[_type == "blog"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        summary,
        "coverImage": mainImage,
        "author": author->{name, photo},
        "categories": categories[]
      }`
    );
    
    console.log(`✅ Found ${posts.length} blog posts`);
    
    if (posts.length > 0) {
      console.log('\n📝 Blog posts found:');
      posts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   Slug: ${post.slug?.current}`);
        console.log(`   Author: ${post.author?.name || 'No author'}`);
        console.log(`   Published: ${post.publishedAt || 'Not published'}`);
        console.log(`   Categories: ${post.categories?.join(', ') || 'No categories'}`);
        console.log(`   Summary: ${post.summary ? post.summary.substring(0, 100) + '...' : 'No summary'}`);
        console.log(`   Featured: ${post.featured ? 'Yes' : 'No'}`);
        console.log('---');
      });
    } else {
      console.log('❌ No blog posts found. Make sure:');
      console.log('1. You have published the blog post in Sanity Studio');
      console.log('2. The post has all required fields filled');
      console.log('3. Your Sanity connection is working');
      console.log('4. Check that _type is "blog" not "post"');
    }
    
    // Also test for drafts
    console.log('\n🔍 Checking for draft posts...');
    const drafts = await client.fetch(
      `*[_type == "blog" && !defined(publishedAt)] {
        _id,
        title,
        slug
      }`
    );
    
    if (drafts.length > 0) {
      console.log(`📝 Found ${drafts.length} draft posts:`);
      drafts.forEach((draft, index) => {
        console.log(`${index + 1}. ${draft.title} (DRAFT)`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check your Sanity configuration');
    console.log('2. Verify your project ID and dataset are correct');
    console.log('3. Make sure the blog post is published (not draft)');
    console.log('4. Check that all required fields are filled');
  }
}

testBlogFetch();
