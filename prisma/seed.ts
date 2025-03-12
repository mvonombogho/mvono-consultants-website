import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding database...')
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mvonoconsultants.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@mvonoconsultants.com',
      password: hashedPassword,
      role: 'admin',
    }
  })
  
  console.log(`Created admin user with id: ${admin.id}`)
  
  // Create sample clients
  const clients = [
    {
      name: 'Lafarge',
      contactPerson: 'John Smith',
      email: 'john@lafarge.com',
      phone: '+254 712 345 678',
      industry: 'Manufacturing',
      status: 'active',
      address: 'Industrial Area, Nairobi, Kenya'
    },
    {
      name: 'KTDA',
      contactPerson: 'Mary Johnson',
      email: 'mary@ktda.co.ke',
      phone: '+254 723 456 789',
      industry: 'Agriculture',
      status: 'active',
      address: 'Kericho, Kenya'
    },
    {
      name: 'Dormans Coffee',
      contactPerson: 'David Mwangi',
      email: 'david@dormans.com',
      phone: '+254 734 567 890',
      industry: 'Food Processing',
      status: 'active',
      address: 'Ruiru, Kenya'
    },
    {
      name: 'Radisson Blu',
      contactPerson: 'Sarah Chen',
      email: 'sarah@radissonblu.com',
      phone: '+254 745 678 901',
      industry: 'Hospitality',
      status: 'inactive',
      address: 'Upper Hill, Nairobi, Kenya'
    },
    {
      name: 'National Cement',
      contactPerson: 'Daniel Ochieng',
      email: 'daniel@nationalcement.co.ke',
      phone: '+254 756 789 012',
      industry: 'Manufacturing',
      status: 'active',
      address: 'Athi River, Kenya'
    },
  ]
  
  for (const client of clients) {
    const createdClient = await prisma.client.upsert({
      where: { name: client.name },
      update: client,
      create: client
    })
    
    console.log(`Created client with id: ${createdClient.id}`)
  }
  
  // Create sample projects
  const allClients = await prisma.client.findMany()
  
  const projects = [
    {
      title: 'Fire Safety Audit',
      description: 'Comprehensive fire safety audit for manufacturing plant',
      startDate: new Date('2025-02-10'),
      endDate: new Date('2025-03-15'),
      status: 'in-progress',
      clientId: allClients[0].id, // Lafarge
    },
    {
      title: 'Occupational Safety Risk Assessment',
      description: 'Workplace safety assessment and risk mitigation planning',
      startDate: new Date('2025-01-20'),
      endDate: new Date('2025-02-28'),
      status: 'completed',
      clientId: allClients[1].id, // KTDA
    },
    {
      title: 'Environmental Impact Assessment',
      description: 'EIA for new processing facility',
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-04-15'),
      status: 'planned',
      clientId: allClients[2].id, // Dormans Coffee
    },
    {
      title: 'Energy Audit',
      description: 'Comprehensive energy usage audit and efficiency recommendations',
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-03-20'),
      status: 'in-progress',
      clientId: allClients[3].id, // Radisson Blu
    },
  ]
  
  for (const project of projects) {
    const createdProject = await prisma.project.upsert({
      where: { 
        title_clientId: {
          title: project.title,
          clientId: project.clientId
        }
      },
      update: project,
      create: project
    })
    
    console.log(`Created project with id: ${createdProject.id}`)
  }
  
  // Create sample invoices
  const invoices = [
    {
      invoiceNumber: 'INV-2025-001',
      amount: 120000,
      status: 'paid',
      issueDate: new Date('2025-03-10'),
      dueDate: new Date('2025-04-10'),
      clientId: allClients[0].id, // Lafarge
      projectId: (await prisma.project.findFirst({ where: { clientId: allClients[0].id } }))?.id
    },
    {
      invoiceNumber: 'INV-2025-002',
      amount: 85000,
      status: 'paid',
      issueDate: new Date('2025-03-05'),
      dueDate: new Date('2025-04-05'),
      clientId: allClients[1].id, // KTDA
      projectId: (await prisma.project.findFirst({ where: { clientId: allClients[1].id } }))?.id
    },
    {
      invoiceNumber: 'INV-2025-003',
      amount: 65000,
      status: 'pending',
      issueDate: new Date('2025-02-28'),
      dueDate: new Date('2025-03-28'),
      clientId: allClients[2].id, // Dormans Coffee
      projectId: (await prisma.project.findFirst({ where: { clientId: allClients[2].id } }))?.id
    },
    {
      invoiceNumber: 'INV-2025-004',
      amount: 110000,
      status: 'overdue',
      issueDate: new Date('2025-02-15'),
      dueDate: new Date('2025-03-15'),
      clientId: allClients[3].id, // Radisson Blu
      projectId: (await prisma.project.findFirst({ where: { clientId: allClients[3].id } }))?.id
    },
    {
      invoiceNumber: 'INV-2025-005',
      amount: 220000,
      status: 'paid',
      issueDate: new Date('2025-02-12'),
      dueDate: new Date('2025-03-12'),
      clientId: allClients[4].id, // National Cement
    },
  ]
  
  for (const invoice of invoices) {
    const createdInvoice = await prisma.invoice.upsert({
      where: { invoiceNumber: invoice.invoiceNumber },
      update: invoice,
      create: invoice
    })
    
    console.log(`Created invoice with id: ${createdInvoice.id}`)
  }
  
  console.log('Seeding completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
