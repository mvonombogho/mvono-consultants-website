# Mvono Consultants Website with Sanity Blog

This project includes a Sanity-powered blog system integrated with the Mvono Consultants website.

## Getting Started

To run the project locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create a `.env.local` file** (if not already created):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=k6oxvo7b
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-15
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the website** at http://localhost:3000
   
5. **Access Sanity Studio** at http://localhost:3000/studio

## Troubleshooting

If you encounter issues with Sanity Studio:

1. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **Check your environment variables** in `.env.local`

3. **Verify Sanity project connection** by logging into https://www.sanity.io/ and confirming the project ID

## Project Structure

- `/app` - Next.js application routes
- `/components` - React components
- `/lib` - Utility functions and API
- `/public` - Static assets
- `/sanity` - Sanity schema definitions
- `/app/studio` - Embedded Sanity Studio

## Content Management

For blog content creation:

1. Access the Sanity Studio at http://localhost:3000/studio
2. Create authors and categories before creating blog posts
3. Upload images and create content using the rich text editor
