import { getPostBySlug, getAllPosts } from '../../../lib/api-fixed';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../../lib/sanity';
import { format } from 'date-fns';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  let post = null;
  
  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching post:', error);
  }
  
  if (!post) {
    return (
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
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
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
          {post.title}
        </h1>

        {/* Summary */}
        {post.summary && (
          <div className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-blue-200 pl-6 bg-blue-50 py-4 rounded-r-lg">
            {post.summary}
          </div>
        )}

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          {/* Author */}
          <div className="flex items-center">
            {post.author?.photo && (
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 ring-2 ring-blue-100">
                <Image
                  src={urlFor(post.author.photo).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">
                {post.author?.name || 'Mvono Consultants'}
              </p>
              <p className="text-sm text-gray-600">Author</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {post.publishedAt && format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
            </span>
          </div>

          {/* Reading time estimate */}
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>5 min read</span>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full h-64 lg:h-96 mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.body ? (
            <div className="text-lg leading-relaxed text-gray-700">
              {/* Simple text content rendering - for rich content, you'd use PortableText */}
              <p>{post.body}</p>
            </div>
          ) : (
            <p className="text-gray-600 italic">Content coming soon...</p>
          )}
        </div>

        {/* Share section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://mvonoconsultants.com/blog/${post.slug.current}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mvonoconsultants.com/blog/${post.slug.current}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </article>

      {/* Back to blog */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <Link 
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
