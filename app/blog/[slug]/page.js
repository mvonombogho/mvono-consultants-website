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
