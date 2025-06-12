import services from './services'
import teamMembers from './teamMembers'
import clients from './clients'
import testimonials from './testimonials'
import projects from './projects'
import blog from './blog'

export const schema = {
  types: [
    // Document types
    services,
    teamMembers,
    clients,
    testimonials,
    projects,
    blog,
    
    // The basic test type we created earlier
    {
      name: 'test',
      title: 'Test',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'timestamp',
          title: 'Timestamp',
          type: 'datetime',
        },
      ],
    },
  ],
}
