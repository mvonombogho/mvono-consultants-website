import { NextRequest, NextResponse } from 'next/server'
import { createClient, getClients } from '@/lib/clients'
import { getServerSession } from 'next-auth'

// GET /api/clients
export async function GET(request: NextRequest) {
  try {
    // Check authentication (optional, as middleware should handle this)
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || undefined
    const industry = searchParams.get('industry') || undefined
    const status = searchParams.get('status') || undefined
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // Get clients with filters
    const result = await getClients({
      search,
      industry,
      status,
      page,
      limit
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

// POST /api/clients
export async function POST(request: NextRequest) {
  try {
    // Check authentication (optional, as middleware should handle this)
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Parse request body
    const body = await request.json()
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    
    // Create client
    const client = await createClient(body)
    
    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
