export default {
  name: 'blog',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Blog Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMembers' }]
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Safety',
          'Energy',
          'Plant Management',
          'Environmental',
          'Training',
          'Compliance',
          'Industry News',
          'Case Studies',
          'Tips & Advice'
        ]
      }
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200).warning('Summaries should be concise')
    },
    {
      name: 'body',
      title: 'Blog Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true
              }
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              options: {
                isHighlighted: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Should this post be featured prominently?',
      initialValue: false
    },
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'services' }]
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Information',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160).warning('Meta descriptions should be under 160 characters')
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt'
    },
    prepare({ title, author, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Unpublished'
      return {
        title,
        subtitle: `By ${author || 'Unknown'} - ${formattedDate}`,
        media
      }
    }
  }
}
