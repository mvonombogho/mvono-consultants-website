export default {
  name: 'clients',
  title: 'Clients',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url'
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Brief Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'servicesProvided',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'featured',
      title: 'Featured Client',
      type: 'boolean',
      description: 'Should this client be highlighted in featured sections?',
      initialValue: false
    },
    {
      name: 'testimonial',
      title: 'Has Testimonial',
      type: 'boolean',
      description: 'Does this client have a testimonial?',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this client in listings (lower numbers appear first)'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'industry',
      media: 'logo'
    }
  }
}
