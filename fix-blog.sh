#!/bin/bash
echo "================================="
echo "CREATING FUNCTIONAL BLOG PAGES"
echo "================================="

echo
echo "Step 1: Creating main blog page with Sanity integration..."

cat > app/blog/page.js << 'EOF'
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
EOF

echo
echo "Step 2: Creating individual blog post page..."

cat > app/blog/[slug]/page.js << 'EOF'
import { client } from '../../../lib/sanity-client';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../../lib/sanity-client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getBlogPost(slug) {
  try {
    const post = await client.fetch(`
      *[_type == "blogPost" && slug.current == $slug && published == true][0] {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        body,
        author->{
          name,
          image,
          bio
        },
        categories[]->{
          title,
          slug
        },
        _createdAt
      }
    `, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="text-center mb-8">
            {post.categories && post.categories.length > 0 && (
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {post.categories[0].title}
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-gray-600">
              <time dateTime={post.publishedAt || post._createdAt}>
                {new Date(post.publishedAt || post._createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.author && (
                <>
                  <span className="mx-3">•</span>
                  <span>By {post.author.name}</span>
                </>
              )}
            </div>
          </div>
          
          {post.mainImage && (
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
              <Image
                src={urlFor(post.mainImage).width(800).height(450).url()}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* Content */}
        {post.body && (
          <div className="prose prose-lg max-w-none mb-12">
            <PortableText 
              value={post.body}
              components={{
                block: {
                  normal: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                  h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>,
                },
                marks: {
                  link: ({children, value}) => (
                    <a href={value.href} className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener">
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </div>
        )}

        {/* Author */}
        {post.author && (
          <div className="border-t pt-8 mt-12">
            <div className="flex items-start space-x-4">
              {post.author.image && (
                <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(post.author.image).width(64).height(64).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                {post.author.bio && (
                  <p className="text-gray-600 text-sm mt-1">{post.author.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Back to blog */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
EOF

echo
echo "Step 3: Checking Sanity client configuration..."

if [ ! -f "lib/sanity-client.js" ]; then
    echo "Creating Sanity client..."
    cat > lib/sanity-client.js << 'EOF'
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
EOF
fi

echo
echo "Step 4: Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo
    echo "✅ Blog functionality created successfully!"
    echo
    echo "Deploying..."
    git add .
    git commit -m "Fix: Implement functional blog with Sanity CMS integration"
    git push origin main
    echo
    echo "🚀 Blog pages deployed!"
else
    echo "❌ Build failed - check errors above"
fi

echo
echo "================================="
echo "BLOG FIX COMPLETE"
echo "================================="
