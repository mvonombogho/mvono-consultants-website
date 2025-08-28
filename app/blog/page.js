import { getAllPosts, getAllCategories } from '../../lib/api-fixed';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity';
import { format } from 'date-fns';

export const revalidate = 60;

export default async function BlogPage({ searchParams }) {
  const search = searchParams?.search || '';
  
  let posts = [];
  let categories = [];
  
  try {
    posts = await getAllPosts();
    categories = await getAllCategories();
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }
  
  // Filter posts if search query is provided
  const filteredPosts = search
    ? posts.filter(post => 
        post.title?.toLowerCase().includes(search.toLowerCase()) || 
        (post.summary && post.summary.toLowerCase().includes(search.toLowerCase()))
      )
    : posts;

  return (
    <main className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Safety & Energy Management Insights
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stay informed with expert analysis, industry trends, and professional best practices from 
            Mvono Consultants' team of seasoned safety and energy management specialists.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <form method="GET" className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                defaultValue={search}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search articles..."
              />
            </form>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-12 flex justify-center">
              <div className="flex flex-wrap gap-3 justify-center">
                <Link 
                  href="/blog" 
                  className="px-6 py-3 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  All Posts
                </Link>
                {categories.map((category) => (
                  <Link 
                    key={category._id} 
                    href={`/blog/category/${category._id}`}
                    className="px-6 py-3 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {search && (
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">
                  {filteredPosts.length === 0 
                    ? `No results found for "${search}"` 
                    : `Search results for "${search}" (${filteredPosts.length} found)`}
                </h2>
                {filteredPosts.length === 0 && (
                  <p className="text-gray-600">Try a different search term or browse all articles below.</p>
                )}
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {filteredPosts.map((post) => (
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
                          {post.categories && post.categories.slice(0, 2).map((category, index) => (
                            <span key={index} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                              {category}
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
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {search ? 'No matching posts found' : 'No blog posts yet'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {search 
                    ? 'Try a different search term or browse all articles.'
                    : 'Check back soon for expert insights and industry updates!'
                  }
                </p>
                
                <div className="space-y-4">
                  <Link 
                    href="/studio"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Manage Content in Studio
                  </Link>
                  
                  <div>
                    <Link 
                      href="/"
                      className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      ← Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
