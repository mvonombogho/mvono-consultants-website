import prisma from './prisma'

// Types for client data
export interface ClientData {
  name: string
  contactPerson?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  kraPin?: string | null
  industry?: string | null
}

export interface ClientWithId extends ClientData {
  id: string
}

// Get all clients with optional filtering
export async function getClients(filters: {
  search?: string
  industry?: string
  status?: string
  page?: number
  limit?: number
} = {}) {
  const { search, industry, status, page = 1, limit = 10 } = filters
  
  // Calculate pagination
  const skip = (page - 1) * limit
  
  // Build where conditions
  let where: any = {}
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { contactPerson: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }
  
  if (industry) {
    where.industry = industry
  }
  
  // Count total records for pagination
  const total = await prisma.client.count({ where })
  
  // Get paginated clients
  const clients = await prisma.client.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { projects: true, invoices: true }
      }
    }
  })
  
  return {
    clients,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}

// Get a single client by ID
export async function getClientById(id: string) {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      _count: {
        select: { projects: true, invoices: true }
      }
    }
  })
  
  return client
}

// Create a new client
export async function createClient(data: ClientData) {
  const client = await prisma.client.create({
    data
  })
  
  return client
}

// Update a client
export async function updateClient(id: string, data: ClientData) {
  const client = await prisma.client.update({
    where: { id },
    data
  })
  
  return client
}

// Delete a client
export async function deleteClient(id: string) {
  const client = await prisma.client.delete({
    where: { id }
  })
  
  return client
}

// Get client statistics
export async function getClientStats() {
  const totalClients = await prisma.client.count()
  
  const clientsByIndustry = await prisma.client.groupBy({
    by: ['industry'],
    _count: true,
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    where: {
      industry: {
        not: null
      }
    }
  })
  
  // Get clients added in the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const newClients = await prisma.client.count({
    where: {
      createdAt: {
        gte: thirtyDaysAgo
      }
    }
  })
  
  return {
    totalClients,
    clientsByIndustry,
    newClients,
    // Calculate growth rate
    growthRate: totalClients > 0 ? (newClients / totalClients) * 100 : 0
  }
}
