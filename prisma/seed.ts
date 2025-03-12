import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clean database for development/testing
  if (process.env.NODE_ENV !== 'production') {
    console.log('Cleaning database...')
    await prisma.invoice.deleteMany({})
    await prisma.project.deleteMany({})
    await prisma.client.deleteMany({})
    await prisma.user.deleteMany({})
  }
  
  // Create admin user
  console.log('Creating admin user...')
  const hashedPassword = await bcrypt.hash('password123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mvonoconsultants.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@mvonoconsultants.com',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log(`Created admin user: ${adminUser.name}`)
  
  // Create clients
  console.log('Creating sample clients...')
  const sampleClients = [
    {
      name: 'Lafarge',
      contactPerson: 'John Smith',
      email: 'john@lafarge.com',
      phone: '+254 712 345 678',
      industry: 'Manufacturing',
      status: 'active',
      address: 'Industrial Area\nNairobi, Kenya',
      kraPin: 'ABC123456D',
    },
    {
      name: 'KTDA',
      contactPerson: 'Mary Johnson',
      email: 'mary@ktda.co.ke',
      phone: '+254 723 456 789',
      industry: 'Agriculture',
      status: 'active',
      address: 'Tea Avenue\nKericho, Kenya',
      kraPin: 'DEF789012G',
    },
    {
      name: 'Dormans Coffee',
      contactPerson: 'David Mwangi',
      email: 'david@dormans.com',
      phone: '+254 734 567 890',
      industry: 'Food Processing',
      status: 'active',
      address: 'Coffee Lane\nThika, Kenya',
      kraPin: 'HIJ345678K',
    },
    {
      name: 'Radisson Blu',
      contactPerson: 'Sarah Chen',
      email: 'sarah@radissonblu.com',
      phone: '+254 745 678 901',
      industry: 'Hospitality',
      status: 'inactive',
      address: 'Upper Hill\nNairobi, Kenya',
      kraPin: 'LMN901234P',
    },
    {
      name: 'National Cement',
      contactPerson: 'Daniel Ochieng',
      email: 'daniel@nationalcement.co.ke',
      phone: '+254 756 789 012',
      industry: 'Manufacturing',
      status: 'active',
      address: 'Athi River\nMachakos, Kenya',
      kraPin: 'QRS567890T',
    },
  ]
  
  for (const clientData of sampleClients) {
    const client = await prisma.client.create({
      data: clientData,
    })
    console.log(`Created client: ${client.name}`)
  }
  
  // Create projects
  console.log('Creating sample projects...')
  const clients = await prisma.client.findMany()
  
  // Define project types matching company services
  const projectTypes = [
    'Environmental Impact Assessment',
    'Occupational Safety',
    'Fire Safety Audit',
    'Energy Audit',
    'Statutory Inspection',
    'Non-Destructive Testing',
  ]
  
  // Current date for reference
  const now = new Date()
  
  // Sample projects for each client
  for (const client of clients) {
    // Random number of projects (1-3)
    const numProjects = Math.floor(Math.random() * 3) + 1
    
    for (let i = 0; i < numProjects; i++) {
      const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)]
      
      // Random start date within last 6 months
      const startDate = new Date(now)
      startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 6))
      
      // Random end date between start date and 2 months later
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 2) + 1)
      
      // Random status based on dates
      let status
      if (endDate > now) {
        status = startDate <= now ? 'in-progress' : 'planned'
      } else {
        status = 'completed'
      }
      
      // Random project value between 50,000 and 250,000
      const value = Math.floor(Math.random() * 200000) + 50000
      
      // Random completion percentage based on status
      let completion
      if (status === 'completed') {
        completion = 100
      } else if (status === 'planned') {
        completion = 0
      } else {
        // For in-progress, calculate based on current date position between start and end
        const totalDuration = endDate.getTime() - startDate.getTime()
        const elapsedDuration = now.getTime() - startDate.getTime()
        completion = Math.min(Math.floor((elapsedDuration / totalDuration) * 100), 99)
      }
      
      const project = await prisma.project.create({
        data: {
          title: `${projectType} for ${client.name}`,
          description: `Comprehensive ${projectType.toLowerCase()} to ensure compliance and safety.`,
          startDate,
          endDate,
          status,
          clientId: client.id,
          value,
          completion,
        },
      })
      
      console.log(`Created project: ${project.title}`)
      
      // Create invoice for the project if it's in progress or completed
      if (status !== 'planned') {
        const invoiceDate = new Date(startDate)
        invoiceDate.setDate(invoiceDate.getDate() + 7) // Invoice created a week after project starts
        
        const dueDate = new Date(invoiceDate)
        dueDate.setDate(dueDate.getDate() + 30) // Due in 30 days
        
        // Invoice status based on due date
        const invoiceStatus = status === 'completed' ? 'paid' : (dueDate < now ? 'overdue' : 'pending')
        
        // Invoice number
        const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`
        
        const invoice = await prisma.invoice.create({
          data: {
            invoiceNumber,
            amount: value,
            status: invoiceStatus,
            issueDate: invoiceDate,
            dueDate,
            clientId: client.id,
            projectId: project.id,
          },
        })
        
        console.log(`Created invoice: ${invoice.invoiceNumber}`)
      }
    }
  }
  
  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
