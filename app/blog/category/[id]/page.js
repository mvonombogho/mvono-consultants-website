import { getPostsByCategory, getAllCategories } from '../../../../lib/api-fixed';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../../../lib/sanity';
import { format } from 'date-fns';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      id: category._id,
    }));
  } catch (error) {
    console.error('Error generating category params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const categories = await getAllCategories();
    const category = categories.find(cat => cat._id === params.id);
    
    if (!category) {
      return {
        title: 'Category Not Found - Mvono Consultants',
        description: 'The requested category could not be found.'
      };
    }

    return {
      title: `${category.title} Articles | Mvono Consultants Blog`,
      description: `Read expert articles about ${category.title.toLowerCase()} from Mvono Consultants' team of professionals.`,
    };
  } catch (error) {
    console.error('Error generating category metadata:', error);
    return {
      title: 'Category - Mvono Consultants Blog',
      description: 'Expert insights on safety, energy, and plant management.'
    };
  }
}

export default async function CategoryPage({ params }) {
  let posts = [];
  let category = null;
  
  try {
    const categories = await getAllCategories();
    category = categories.find(cat => cat._id === params.id);
    
    if (category) {
      posts = await getPostsByCategory(params.id);
    }
  } catch (error) {
    console.error('Error fetching category data:', error);
  }
  
  if (!category) {
    return (
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-blue-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-white font-medium">
                {category.title}
              </li>
            </ol>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category.title} Articles
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Expert insights and professional guidance on {category.title.toLowerCase()}.
            </p>
            <div className="mt-4 text-blue-200">
              {posts.length} article{posts.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug?.current}`}>
                  <article className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                    {post.coverImage && (
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={urlFor(post.coverImage).url()}
                          alt={post.title || 'Blog post'}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 lg:p-8 flex-1 flex flex-col">
                      {/* Categories */}
                      <div className="flex gap-2 mb-4">
                        {post.categories && post.categories.slice(0, 2).map((cat, index) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>
                      
                      {/* Date */}
                      <p className="text-sm text-gray-500 mb-3 font-medium">
                        {post.publishedAt && format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                      </p>
                      
                      {/* Title */}
                      <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900 leading-tight hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      
                      {/* Summary */}
                      {post.summary && (
                        <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                          {post.summary}
                        </p>
                      )}
                      
                      {/* Author */}
                      <div className="flex items-center pt-4 border-t border-gray-100">
                        {post.author?.photo && (
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3 ring-2 ring-gray-100">
                            <Image
                              src={urlFor(post.author.photo).url()}
                              alt={post.author.name || 'Author'}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {post.author?.name || 'Mvono Team'}
                          </span>
                          <p className="text-xs text-gray-500">Author</p>
                        </div>
                        
                        {/* Read More Arrow */}
                        <div className="ml-auto">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles in this category yet</h3>
                <p className="text-gray-600 mb-8">Check back soon for expert insights on {category.title.toLowerCase()}!</p>
                <Link 
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ← Browse All Articles
                </Link>
              </div>
            </div>
          )}

          {/* Back to all categories */}
          <div className="mt-12 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors border border-blue-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              View All Categories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
