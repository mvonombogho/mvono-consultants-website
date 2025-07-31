// Simplified API for testing
console.log('API module loading...');

// Mock functions for testing
export async function getAllPosts() {
  console.log('getAllPosts called');
  return [
    {
      _id: '1',
      title: 'Test Post',
      slug: { current: 'test-post' },
      publishedAt: '2024-01-01',
      summary: 'This is a test post',
      categories: ['Safety', 'Energy']
    }
  ];
}

export async function getAllCategories() {
  console.log('getAllCategories called');
  return [
    { _id: 'safety', title: 'Safety' },
    { _id: 'energy', title: 'Energy' }
  ];
}

export async function getPostBySlug(slug) {
  console.log('getPostBySlug called with:', slug);
  return {
    _id: '1',
    title: 'Test Post',
    slug: { current: slug },
    body: 'Test content',
    publishedAt: '2024-01-01',
    summary: 'This is a test post',
    categories: ['Safety', 'Energy']
  };
}

export async function getPostsByCategory(categorySlug) {
  console.log('getPostsByCategory called with:', categorySlug);
  return [
    {
      _id: '1',
      title: 'Test Post in Category',
      slug: { current: 'test-post' },
      publishedAt: '2024-01-01',
      summary: 'This is a test post in category',
      categories: ['Safety']
    }
  ];
}

console.log('API module loaded successfully');
