export default {
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
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
      name: 'icon',
      title: 'Service Icon',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200).warning('Short descriptions work best')
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }]
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
      name: 'serviceProcess',
      title: 'Service Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text'
            }
          ]
        }
      ]
    },
    {
      name: 'relatedIndustries',
      title: 'Related Industries',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this service in listings'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon'
    }
  }
}
