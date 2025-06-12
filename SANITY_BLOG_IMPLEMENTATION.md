# Sanity Blog Implementation Guide for Mvono Consultants Website

This guide will walk you through the process of adding a Sanity-powered blog to your Mvono Consultants website. Sanity provides a headless CMS that will allow easy content management for your blog posts.

## 1. Install Required Dependencies

```bash
npm install @sanity/client @sanity/image-url next-sanity groq
```

## 2. Set Up Sanity Studio

### Create a Sanity Project

1. Install the Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```

2. Initialize a new Sanity project in a `sanity` folder:
   ```bash
   mkdir sanity
   cd sanity
   sanity init
   ```
   - Follow the prompts to create a new project
   - Select "Blog (schema)" as your project template when asked

3. Configure the Sanity project settings:
   - Configure CORS settings in your Sanity project to allow your Next.js application to fetch data
   - Go to [manage.sanity.io](https://manage.sanity.io/), select your project
   - Navigate to API > CORS origins
   - Add your development URL (http://localhost:3000) and production URL

## 3. Integrate Sanity with Your Next.js Application

### Create Sanity Configuration Files

Create a new file `lib/sanity.js`:

```javascript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN for production
  token: process.env.SANITY_API_TOKEN, // Only needed if you want to update content
});

// Helper function for generating image URLs with the Sanity Image pipeline
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
```

### Update Environment Variables

Add the following to your `.env` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

## 4. Create Blog Components and Pages

### Create Blog API Functions

Create a new file `lib/api.js`:

```javascript
import { client } from './sanity';
import groq from 'groq';

// Get all blog posts
export async function getAllPosts() {
  const posts = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "coverImage": mainImage,
      "author": author->{name, image},
      "categories": categories[]->title
    }`
  );
  return posts;
}

// Get a single blog post by slug
export async function getPostBySlug(slug) {
  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      publishedAt,
      "coverImage": mainImage,
      "author": author->{name, image},
      "categories": categories[]->title
    }`,
    { slug }
  );
  return post;
}

// Get all categories
export async function getAllCategories() {
  const categories = await client.fetch(
    groq`*[_type == "category"] {
      _id,
      title
    }`
  );
  return categories;
}
```

### Create Blog List Page

Create a new file `app/blog/page.js`:

```javascript
import { getAllPosts } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              {post.coverImage && (
                <div className="relative h-60 w-full">
                  <Image
                    src={urlFor(post.coverImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                </p>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center">
                  {post.author?.image && (
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={urlFor(post.author.image).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-sm text-gray-700">{post.author?.name}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### Create Blog Post Detail Page

Create a new file `app/blog/[slug]/page.js`:

```javascript
import { getPostBySlug, getAllPosts } from '@/lib/api';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';
import { PortableText } from '@portabletext/react';

export const revalidate = 60; // Revalidate this page every 60 seconds

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center mb-6">
            {post.author?.image && (
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium">{post.author?.name}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>
          {post.coverImage && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                src={urlFor(post.coverImage).url()}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </header>
        
        <div className="prose max-w-none">
          <PortableText value={post.body} />
        </div>
      </article>
    </div>
  );
}
```

### Create PortableText Components

Create a new file `components/portable-text.js`:

```javascript
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';

const components = {
  types: {
    image: ({ value }) => (
      <div className="relative w-full h-96 my-8">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Blog image'}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    ),
    callToAction: ({ value, isInline }) => 
      isInline ? (
        <Link href={value.url} className="text-blue-500 hover:underline">
          {value.text}
        </Link>
      ) : (
        <div className="my-8">
          <Link
            href={value.url}
            className="bg-blue-600 text-white px-6 py-3 rounded-md inline-block hover:bg-blue-700 transition"
          >
            {value.text}
          </Link>
        </div>
      ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-blue-500 hover:underline">
          {children}
        </Link>
      );
    },
    highlight: ({ children }) => (
      <span className="bg-yellow-200 px-1">{children}</span>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-4">{children}</h4>,
    normal: ({ children }) => <p className="my-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-2">{children}</li>,
    number: ({ children }) => <li className="my-2">{children}</li>,
  },
};

export default components;
```

### Add Blog Link to Navigation

Update your navigation component to include a link to the blog:

```jsx
<Link href="/blog" className="...">
  Blog
</Link>
```

## 5. Set Up Sanity Studio Integration

### Add Sanity Studio to Next.js App

Create a new route in your Next.js app to host the Sanity Studio:

1. Create a file `app/studio/[[...index]]/page.jsx`:

```jsx
'use client'

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

2. Create a sanity.config.js file at the root of your project:

```javascript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import schemas from './sanity/schemas';

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Mvono Consultants Blog',
  apiVersion: '2023-05-03',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
});
```

3. Install additional Sanity studio dependencies:

```bash
npm install sanity @sanity/vision
```

## 6. Install Additional Dependencies

You'll need a few more packages for features like date formatting and portable text rendering:

```bash
npm install date-fns @portabletext/react
```

## 7. Test and Deploy

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/blog to see your blog list
3. Visit http://localhost:3000/studio to access the Sanity Studio

## 8. Content Creation Workflow

1. Log in to Sanity Studio at http://localhost:3000/studio
2. Create categories for your blog posts
3. Create author profiles
4. Start creating blog posts with rich content

## Best Practices

1. **Content Organization**: Create blog posts that align with your company's services and expertise
2. **Regular Updates**: Publish blog content regularly to improve SEO and keep visitors engaged
3. **Categories**: Organize posts into meaningful categories related to your business
4. **Quality Images**: Use high-quality images that represent your content effectively
5. **Call to Actions**: Include CTAs in your blog posts to direct readers to your services

## Blog Content Ideas for Mvono Consultants

Based on your company profile, consider creating blog posts in these areas:

1. **Occupational Safety Guides**
2. **Environmental Impact Assessment Insights**
3. **Energy Management Best Practices**
4. **Fire Safety Tips and Regulations**
5. **Statutory Compliance Updates**
6. **Industry-Specific Safety Protocols**
7. **Non-Destructive Testing Explanations**
8. **Case Studies of Successful Safety Implementations**
9. **Training Insights for First Aid and Safety**
10. **Regulatory Updates in Kenya and East Africa**
