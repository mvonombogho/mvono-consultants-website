export default {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'personName',
      title: 'Person Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'personTitle',
      title: 'Person Title/Position',
      type: 'string'
    },
    {
      name: 'photo',
      title: 'Person Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string'
    },
    {
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'serviceCategory',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          'Environmental Impact Assessment',
          'Occupational Safety',
          'Fire Safety Audit',
          'Energy Audit',
          'Statutory Inspection',
          'Non-Destructive Testing',
          'Fire Safety Training',
          'First Aider Training',
          'General'
        ]
      }
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Should this testimonial be highlighted in featured sections?',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this testimonial in listings (lower numbers appear first)'
    }
  ],
  preview: {
    select: {
      title: 'personName',
      subtitle: 'companyName',
      media: 'photo'
    }
  }
}
