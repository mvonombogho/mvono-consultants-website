export default {
  name: 'projects',
  title: 'Projects & Case Studies',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'clients' }]
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string'
    },
    {
      name: 'serviceCategory',
      title: 'Service Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Environmental Impact Assessment',
          'Occupational Safety',
          'Fire Safety Audit',
          'Energy Audit',
          'Statutory Inspection',
          'Non-Destructive Testing',
          'Fire Safety Training',
          'First Aider Training'
        ]
      }
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            },
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'summary',
      title: 'Project Summary',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(250).warning('Summaries work best when kept under 250 characters')
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'solution',
      title: 'Our Solution',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'results',
      title: 'The Results',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'keyStats',
      title: 'Key Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stat',
              title: 'Statistic',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'testimonial',
      title: 'Related Testimonial',
      type: 'reference',
      to: [{ type: 'testimonials' }]
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Should this project be highlighted in featured sections?',
      initialValue: false
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date'
    }
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client.name',
      media: 'featuredImage'
    },
    prepare({ title, client, media }) {
      return {
        title,
        subtitle: client ? `Client: ${client}` : '',
        media
      }
    }
  }
}
