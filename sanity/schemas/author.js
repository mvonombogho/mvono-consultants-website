// Author schema
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};
