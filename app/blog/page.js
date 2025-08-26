import { client } from '../../lib/sanity-client';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity-client';

export const revalidate = 60;

async function getBlogPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "blogPost" && published == true] | order(_createdAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        author->{
          name,
          image
        },
        categories[]->{
          title,
          slug
        },
        _createdAt
      }
    `);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

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

      {/* Blog Posts */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.mainImage && (
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={urlFor(post.mainImage).width(400).height(225).url()}
                          alt={post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <time dateTime={post.publishedAt || post._createdAt}>
                        {new Date(post.publishedAt || post._createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      {post.categories && post.categories.length > 0 && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-blue-600">{post.categories[0].title}</span>
                        </>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug.current}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    )}
                    <Link 
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
                <p className="text-gray-600 mb-8">Check back soon for expert insights and industry updates!</p>
                <Link 
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
