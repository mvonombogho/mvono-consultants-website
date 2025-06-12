import { client } from './sanity';
import groq from 'groq';

// Get all blog posts
export async function getAllPosts() {
  try {
    const posts = await client.fetch(
      groq`*[_type == "blog"] | order(publishedAt desc) {
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
    return posts;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

// Get a single blog post by slug
export async function getPostBySlug(slug) {
  try {
    const post = await client.fetch(
      groq`*[_type == "blog" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        body,
        publishedAt,
        summary,
        "coverImage": mainImage,
        "author": author->{name, photo},
        "categories": categories[]
      }`,
      { slug }
    );
    return post;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// Get all categories from blog posts
export async function getAllCategories() {
  try {
    const posts = await client.fetch(
      groq`*[_type == "blog" && defined(categories)] {
        "categories": categories[]
      }`
    );
    
    // Extract unique categories
    const allCategories = posts.flatMap(post => post.categories || []);
    const uniqueCategories = [...new Set(allCategories)];
    
    // Return in the expected format
    return uniqueCategories.map((category, index) => ({
      _id: category.toLowerCase().replace(/\s+/g, '-'),
      title: category
    }));
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

// Get posts by category
export async function getPostsByCategory(categorySlug) {
  try {
    // Convert slug back to category title
    const categoryTitle = categorySlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    const posts = await client.fetch(
      groq`*[_type == "blog" && $categoryTitle in categories[]] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        summary,
        "coverImage": mainImage,
        "author": author->{name, photo},
        "categories": categories[]
      }`,
      { categoryTitle }
    );
    return posts;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

// Get featured posts
export async function getFeaturedPosts() {
  try {
    const posts = await client.fetch(
      groq`*[_type == "blog" && featured == true] | order(publishedAt desc)[0...3] {
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
    return posts;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}
