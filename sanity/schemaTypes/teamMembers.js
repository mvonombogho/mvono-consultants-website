export default {
  name: 'teamMembers',
  title: 'Team Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'position',
      title: 'Position/Title',
      type: 'string'
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this team member (lower numbers appear first)'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo'
    }
  }
}
