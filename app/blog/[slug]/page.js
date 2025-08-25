import { getPostBySlug, getAllPosts } from '../../../lib/api-fixed';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { urlFor } from '../../../lib/sanity';
import { format } from 'date-fns';
import { generateArticleSchema } from '../../../lib/blogSEO';
import { getBreadcrumbSchema } from '../../../utils/schemaGenerator';
import Footer from '../../../components/shared/Footer';

export const revalidate = 60; // Revalidate this page every 60 seconds

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Mvono Consultants',
      description: 'The requested blog post could not be found.'
    };
  }

  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.summary || post.title;
  
  return {
    title: `${seoTitle} | Mvono Consultants Blog`,
    description: seoDescription,
    keywords: post.seoKeywords || 'safety, energy management, environmental consulting, Kenya',
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author?.name || 'Mvono Consultants'],
      images: post.coverImage ? [
        {
          url: urlFor(post.coverImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: post.coverImage ? [urlFor(post.coverImage).width(1200).height(630).url()] : [],
    },
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

// Custom components for PortableText
const components = {
  types: {
    image: ({ value }) => (
      <div className="my-8">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Blog image'}
          width={800}
          height={400}
          className="rounded-lg shadow-lg"
        />
        {value.caption && (
          <p className="text-sm text-gray-600 text-center mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl lg:text-3xl font-bold mt-12 mb-6 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl lg:text-2xl font-bold mt-10 mb-5 text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg lg:text-xl font-bold mt-8 mb-4 text-gray-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed mb-6 text-gray-700">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-700 bg-blue-50 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-lg text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-lg text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
};

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  
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
        <Footer />
      </div>
    );
  }

  // Generate schema markup
  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug.current}` }
  ]);

  return (
    <>
      {/* Schema Markup */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <Script
        id="article-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      <main className="pt-16">
        {/* Header */}
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
            <PortableText 
              value={post.body} 
              components={components}
            />
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
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mvonoconsultants.com/blog/${post.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
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

        <Footer />
      </main>
    </>
  );
}
