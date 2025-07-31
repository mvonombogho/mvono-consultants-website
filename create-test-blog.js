import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: 'k6xvho7h',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-05-19',
  token: process.env.SANITY_API_TOKEN || 'your-token-here' // You'll need to add your token
})

async function createTestBlogContent() {
  try {
    console.log('🚀 Creating test blog content...')

    // First, create a team member (Donald M Mbogho)
    console.log('📝 Creating team member...')
    const teamMember = await client.create({
      _type: 'teamMembers',
      name: 'Engineer Donald M Mbogho',
      slug: {
        _type: 'slug',
        current: 'donald-m-mbogho'
      },
      position: 'Managing Director & Chief Engineer',
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Engineer Donald M Mbogho is the Managing Director and founder of Mvono Consultants, bringing over 29 years of extensive experience in plant management, statutory inspection of pressure vessels, lifting equipment, refrigeration plant, energy management, and safety advisory services. His expertise spans across multiple industries including manufacturing, oil and gas, and hospitality sectors.'
            }
          ]
        }
      ],
      expertise: [
        'Plant Management',
        'Statutory Inspection',
        'Pressure Vessels',
        'Lifting Equipment',
        'Refrigeration Plant',
        'Energy Management',
        'Safety Advisory',
        'Environmental Impact Assessment'
      ],
      certifications: [
        'Professional Engineer',
        'Certified Energy Manager',
        'Occupational Safety Specialist',
        'Environmental Impact Assessment Specialist'
      ],
      email: 'sales@mvonoconsultants.com',
      phone: '+254 720 270 694',
      order: 1
    })

    console.log('✅ Team member created:', teamMember._id)

    // Create a comprehensive test blog post
    console.log('📰 Creating test blog post...')
    const blogPost = await client.create({
      _type: 'blog',
      title: 'Essential Fire Safety Audit Guidelines for Kenyan Industries: Ensuring Compliance and Protection',
      slug: {
        _type: 'slug',
        current: 'fire-safety-audit-guidelines-kenyan-industries'
      },
      author: {
        _type: 'reference',
        _ref: teamMember._id
      },
      categories: ['Safety', 'Compliance', 'Tips & Advice'],
      publishedAt: new Date().toISOString(),
      summary: 'Comprehensive guide to fire safety audits in Kenya, covering legal requirements, best practices, and industry-specific considerations for manufacturing, hospitality, and commercial sectors.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Fire safety audits are not just regulatory requirements in Kenya—they are essential safeguards that protect lives, property, and business continuity. With the increasing focus on workplace safety and the stringent enforcement of safety regulations by the Directorate of Occupational Safety and Health Services (DOSH), understanding fire safety audit requirements has become crucial for all industries.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Legal Framework and Compliance Requirements'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Under the Occupational Safety and Health Act 2007, all workplaces in Kenya must maintain adequate fire safety measures. The Act mandates regular fire safety audits, particularly for:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: 'Manufacturing facilities with more than 20 employees'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: 'Hotels, restaurants, and hospitality establishments'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: 'Commercial buildings and shopping centers'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: 'Educational institutions and healthcare facilities'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Key Components of a Comprehensive Fire Safety Audit'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [
            {
              _type: 'span',
              text: '1. Fire Risk Assessment'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The foundation of any fire safety audit is a thorough risk assessment that identifies potential fire hazards, evaluates the likelihood of fire occurrence, and assesses the potential consequences. This includes examining electrical systems, heating equipment, storage of flammable materials, and human factors that could contribute to fire risks.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [
            {
              _type: 'span',
              text: '2. Emergency Evacuation Procedures'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Effective evacuation procedures are critical for life safety. Our audits evaluate exit routes, emergency lighting, signage adequacy, and evacuation time calculations. We also assess the effectiveness of assembly points and communication systems during emergencies.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [
            {
              _type: 'span',
              text: '3. Fire Detection and Alarm Systems'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Modern fire detection systems must be properly designed, installed, and maintained. Our audits include testing of smoke detectors, heat sensors, manual call points, and alarm sounders to ensure they meet Kenya Bureau of Standards requirements and provide adequate coverage throughout the facility.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Industry-Specific Considerations'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [
            {
              _type: 'span',
              text: 'Manufacturing Sector'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Manufacturing facilities face unique challenges including the presence of machinery, chemicals, and high-energy processes. Our specialized approach for manufacturers includes assessment of hot work permits, machinery protection, chemical storage protocols, and specialized suppression systems such as foam or gas suppression where applicable.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [
            {
              _type: 'span',
              text: 'Hospitality Industry'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Hotels and restaurants require special attention to kitchen fire suppression, guest evacuation procedures, and staff training. We evaluate kitchen hood systems, guest room safety features, and the adequacy of evacuation procedures for visitors unfamiliar with the building layout.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'The Mvono Consultants Approach'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'With over 29 years of experience in safety management, Mvono Consultants provides comprehensive fire safety audits that go beyond mere compliance. Our systematic approach includes:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'number',
          children: [
            {
              _type: 'span',
              text: '**Pre-audit Planning**: Detailed review of facility drawings, previous audit reports, and regulatory requirements'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'number',
          children: [
            {
              _type: 'span',
              text: '**On-site Assessment**: Comprehensive physical inspection using standardized checklists and advanced testing equipment'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'number',
          children: [
            {
              _type: 'span',
              text: '**Documentation Review**: Analysis of maintenance records, training documentation, and emergency procedures'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'number',
          children: [
            {
              _type: 'span',
              text: '**Detailed Reporting**: Comprehensive reports with prioritized recommendations and implementation timelines'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'number',
          children: [
            {
              _type: 'span',
              text: '**Follow-up Support**: Ongoing consultation to ensure effective implementation of recommendations'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Benefits of Professional Fire Safety Audits'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Investing in professional fire safety audits provides multiple benefits beyond regulatory compliance:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: '**Risk Reduction**: Proactive identification and mitigation of fire hazards'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: '**Insurance Benefits**: Potential premium reductions and easier claims processing'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: '**Business Continuity**: Reduced likelihood of fire-related business interruption'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: '**Employee Confidence**: Enhanced workplace safety culture and staff morale'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              text: '**Legal Protection**: Demonstration of due diligence in safety management'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Conclusion and Next Steps'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Fire safety audits are essential investments in protecting what matters most—your people, property, and business operations. As Kenya continues to strengthen its safety regulations and enforcement, proactive fire safety management becomes increasingly important for business success.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'If your organization needs a comprehensive fire safety audit or wants to improve its fire safety management systems, Mvono Consultants is ready to help. Our team of experienced safety professionals provides tailored solutions that meet both regulatory requirements and best practice standards.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Contact us today at sales@mvonoconsultants.com or +254 720 270 694 to schedule your fire safety audit and take the first step toward enhanced workplace safety and regulatory compliance.'
            }
          ]
        }
      ],
      featured: true,
      seo: {
        metaTitle: 'Fire Safety Audit Guidelines for Kenyan Industries | Mvono Consultants',
        metaDescription: 'Comprehensive fire safety audit services in Kenya. Expert guidance on compliance, risk assessment, and safety management for all industries. Contact Mvono Consultants today.',
        keywords: [
          'fire safety audit Kenya',
          'DOSH compliance',
          'fire risk assessment',
          'workplace safety Kenya',
          'fire safety consulting',
          'occupational safety',
          'safety audit services',
          'fire safety training',
          'manufacturing safety',
          'hospitality fire safety'
        ]
      }
    })

    console.log('✅ Test blog post created:', blogPost._id)
    console.log('\n🎉 Test blog content created successfully!')
    console.log('\n📋 Summary:')
    console.log(`- Team Member: ${teamMember.name} (${teamMember._id})`)
    console.log(`- Blog Post: ${blogPost.title} (${blogPost._id})`)
    console.log('\n🔗 Access your content at: http://localhost:3000/studio')
    console.log('\n💡 Next steps:')
    console.log('1. Start your development server: npm run dev')
    console.log('2. Navigate to http://localhost:3000/studio')
    console.log('3. Review and edit the created content')
    console.log('4. Add images to enhance the blog post')
    console.log('5. Create additional blog posts and team members')

  } catch (error) {
    console.error('❌ Error creating test content:', error)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Make sure you have a valid SANITY_API_TOKEN in your environment')
    console.log('2. Ensure your Sanity project is properly configured')
    console.log('3. Check that your schemas are properly defined')
  }
}

// Run the script
createTestBlogContent()
