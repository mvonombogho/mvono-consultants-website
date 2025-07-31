import { getPostBySlug, getAllPosts } from '../../../lib/api-fixed';
import Image from 'next/image';
import { urlFor } from '../../../lib/sanity';
import { format } from 'date-fns';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import Script from 'next/script';
import portableTextComponents from '../../../components/portable-text';
import BlogSidebar from '../../../components/blog-sidebar';
import { generateBlogPostSchema, generateBlogMetaTags } from '../../../lib/blogSEO';
import { getBreadcrumbSchema } from '../../../utils/schemaGenerator';
import Footer from '../../../components/shared/Footer';

export const revalidate = 60; // Revalidate this page every 60 seconds

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | Safety & Energy Management Insights | Mvono Consultants',
    };
  }

  // Generate enhanced metadata using our SEO utility
  const metaTags = generateBlogMetaTags(post);
  
  return {
    ...metaTags,
    openGraph: {
      ...metaTags.openGraph,
      images: post.coverImage ? [{
        url: urlFor(post.coverImage).url(),
        width: 1200,
        height: 630,
        alt: post.title
      }] : [{
        url: '/images/og/blog-og.svg',
        width: 1200, 
        height: 630,
        alt: 'Mvono Consultants Safety & Energy Insights'
      }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Article Not Found</h1>
        <p className="text-xl mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/blog" 
          className="bg-blue-600 text-white px-6 py-3 rounded-md inline-block hover:bg-blue-700 transition"
        >
          Browse Our Resources
        </Link>
      </div>
    );
  }

  // Generate schema markup
  const blogPostSchema = generateBlogPostSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug.current}` }
  ]);

  return (
    <>
      {/* Schema Markup */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema)
        }}
      />
      <Script
        id="blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      <div className="container mx-auto px-4 pb-16">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        Back to Resources
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main content */}
        <div className="lg:w-2/3">
          <article>
            <header className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex items-center mb-8">
                {post.author?.image && (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name || 'Author'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium">{post.author?.name || 'Mvono Team'}</p>
                  <p className="text-gray-500">
                    {post.publishedAt && format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              {post.coverImage && (
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-10">
                  <Image
                    src={urlFor(post.coverImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>
            
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://mvonoconsultants.com/blog/${post.slug.current}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mvonoconsultants.com/blog/${post.slug.current}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z"></path>
                  </svg>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://mvonoconsultants.com/blog/${post.slug.current}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-900 hover:text-blue-700"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-gray-200 bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Consult With Our Experts</h3>
              <p className="mb-8 text-center text-lg text-gray-600 max-w-2xl mx-auto">
                Looking for specialized guidance on {post.categories ? post.categories.join(", ") : "safety and energy management"}? Our team of industry experts is ready to help your organization implement best practices.
              </p>
              <div className="text-center">
                <Link 
                  href="/contact" 
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg inline-block hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  Request A Consultation
                </Link>
              </div>
            </div>
          </article>
        </div>
        
        <div className="lg:w-1/3 mt-12 lg:mt-0">
          <BlogSidebar />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
