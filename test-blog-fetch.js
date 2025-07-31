// Test script to check if blog posts are being fetched correctly
import { getAllPosts } from './lib/api.js';

async function testBlogFetch() {
  console.log('🔍 Testing blog post fetch...');
  
  try {
    const posts = await getAllPosts();
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
        console.log('---');
      });
    } else {
      console.log('❌ No blog posts found. Make sure:');
      console.log('1. You have published the blog post in Sanity Studio');
      console.log('2. The post has all required fields filled');
      console.log('3. Your Sanity connection is working');
    }
    
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check your Sanity configuration in lib/sanity.js');
    console.log('2. Verify your project ID and dataset are correct');
    console.log('3. Make sure the blog post is published (not draft)');
  }
}

testBlogFetch();
