import { getPostsByCategory, getAllCategories } from '../../../../lib/api-fixed';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../../../lib/sanity';
import { format } from 'date-fns';
import Footer from '../../../../components/shared/Footer';

export const revalidate = 60; // Revalidate this page every 60 seconds

export async function generateStaticParams() {
  const categories = await getAllCategories();
  
  return categories.map((category) => ({
    id: category._id,
  }));
}

export default async function CategoryPage({ params }) {
  const { id } = params;
  const posts = await getPostsByCategory(id);
  const categories = await getAllCategories();
  
  // Find the current category
  const currentCategory = categories.find(category => category._id === id);
  const categoryName = currentCategory?.title || 'Category';

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Safety & Energy Management Insights</h1>
      <h2 className="text-2xl text-gray-600 mb-10">{categoryName} Resources</h2>
      
      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link 
          href="/blog" 
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
        >
          All
        </Link>
        {categories.map((category) => (
          <Link 
            key={category._id} 
            href={`/blog/category/${category._id}`}
            className={`px-4 py-2 rounded-full text-sm transition ${
              category._id === id 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              {post.coverImage && (
                <div className="relative h-60 w-full">
                  <Image
                    src={urlFor(post.coverImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {post.categories && post.categories.map((category, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {post.publishedAt && format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                </p>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                )}
                <div className="mt-4 flex items-center">
                  {post.author?.image && (
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={urlFor(post.author.image).url()}
                        alt={post.author.name || 'Author'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-sm text-gray-700">{post.author?.name || 'Mvono Team'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No posts found in this category.</p>
          <Link 
            href="/blog" 
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            View all posts
          </Link>
        </div>
      )}
    </div>
    
    {/* Footer */}
    <Footer />
  );
}
