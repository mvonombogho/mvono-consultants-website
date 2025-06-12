import { getFeaturedPosts } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';

export default async function FeaturedBlogPosts() {
  const featuredPosts = await getFeaturedPosts();

  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Latest Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, best practices, and expert advice in safety, 
            energy management, and plant systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                {post.coverImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlFor(post.coverImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
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
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                  )}
                  <div className="mt-auto flex items-center">
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

        <div className="text-center mt-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            View All Articles
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
