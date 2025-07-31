# Mvono Consultants Blog Setup

This README provides instructions for setting up and using the Sanity-powered blog for the Mvono Consultants website.

## Prerequisites

- Node.js 16+ and npm installed
- A Sanity.io account (free tier is available)

## Installation

1. Install the required dependencies:

```bash
npm install
```

2. Set up Sanity:

```bash
# Install Sanity CLI globally if you haven't already
npm install -g @sanity/cli

# Initialize a new Sanity project
cd sanity
sanity init
```

Follow the prompts to create a new Sanity project. When asked for a schema, select "Blog (schema)".

3. Configure environment variables:

Copy the `.env.local.example` file to `.env.local` and fill in your Sanity project details:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

You can find your project ID in the Sanity management console. To create an API token, go to the API section in your Sanity project settings.

## Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Access the site at [http://localhost:3000](http://localhost:3000)
3. Access the Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

## Content Management

### Creating Blog Posts

1. Log in to Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)
2. Create an author profile for yourself or your team members
3. Create categories that align with your services (e.g., Safety Management, Energy Audits)
4. Create new blog posts with:
   - Title
   - Slug (auto-generated from title)
   - Featured image
   - Author
   - Categories
   - Publishing date
   - Excerpt (summary)
   - Main content (using the rich text editor)

### Content Structure

The blog content is structured with:

- **Posts**: The main blog articles
- **Authors**: Information about content creators
- **Categories**: Topic groupings for organizing content

### Rich Text Editing

Sanity Studio provides a powerful editor for your blog content with:

- Formatting options (headings, bold, italic, etc.)
- Image embedding
- Links
- Custom call-to-action blocks

## Customization

### Styling

The blog is styled using Tailwind CSS. You can customize the appearance by modifying:

- Components in the `components/` directory
- Page files in the `app/blog/` directory

### Adding Features

You can enhance the blog with additional features:

- **Comments**: Integrate a comment system like Disqus
- **Newsletter signup**: Add a subscription form
- **Related posts**: Show similar content based on categories
- **Social sharing**: Add more sharing options

## Deployment

When deploying to production:

1. Build the application:

```bash
npm run build
```

2. Configure your production environment variables
3. Deploy using your preferred hosting platform (Vercel, Netlify, etc.)

## Content Strategy

Refer to the `BLOG_CONTENT_IDEAS.md` file for detailed content suggestions tailored to Mvono Consultants' services and industry focus.

## Troubleshooting

If you encounter issues:

- **Sanity Connection Problems**: Verify your project ID and API token
- **Missing Images**: Check that CORS settings allow your domain
- **Build Errors**: Ensure all dependencies are installed

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
