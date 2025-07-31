import { getAllPosts, getAllCategories } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';

export default async function BlogSidebar() {
  const [recentPosts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  // Get only the 3 most recent posts
  const latestPosts = recentPosts.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Recent Posts</h3>
        <div className="space-y-4">
          {latestPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <div className="flex items-start space-x-3 group">
                {post.coverImage && (
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={urlFor(post.coverImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-medium group-hover:text-blue-600 transition line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {post.publishedAt && format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link 
              key={category._id} 
              href={`/blog/category/${category._id}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Get in Touch</h3>
        <p className="text-gray-600 mb-4">
          Interested in our services? Contact our team for a consultation.
        </p>
        <Link 
          href="/contact" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
